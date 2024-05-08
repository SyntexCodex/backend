const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const Notification = require('./models/notification');


app.get("/",cors(),(req,res)=>{

})


app.post("/",async(req,res)=>{
    const{email,password}=req.body

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
        }

    }
    catch(e){
        res.json("fail")
    }

})



app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

    const data={
        email:email,
        password:password
    }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch(e){
        res.json("fail")
    }

})
app.post('/api/notifications', async (req, res) => {
    try {
      const { message } = req.body;
      const notification = new Notification({ message });
      await notification.save();
      res.status(201).send(notification);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

  app.get('/api/notifications', async (req, res) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });

app.listen(8000,()=>{
    console.log("port connected");
})
