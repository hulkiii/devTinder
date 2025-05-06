const express = require ("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")
app.use(express.json());
app.post("/signup", async (req , res) =>{
    //creating a new instance of user model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added sucessfully");
    }catch (err){
        res.status(400).send("error saving the user:" + err.message);
    }
    
});

app.get("/user", async (req, res) =>{
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({emailId: userEmail});
        if(users.length === 0){
            res.status(400).send("users not found");
        }else{
            res.send(users);
        }
       
    }catch (err){
        res.status(400).send("something went wrong");
    }
})

//feed api
app.get("/feed", async (req , res) =>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch (err){
        res.status(400).send("something went wrong");
    }
})

app.delete("/user", async (req ,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete({_id: userId});
        res.send("user deleted sucessfully");

    }
    catch (err){
        res.status(400).send("something went wrong");
    }
})

//update data of the user
app.patch("/user", async (req ,res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        const user= await User.findByIdAndUpdate({_id: userId}, data,{
            returnDocument: "before",
        });
        console.log(user);
        res.send("user updates sucesssfully");
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

connectDB()
.then(() => {
    console.log("Databse connection established...");
    app.listen(7777, ()=>{
        console.log("running on 7777 port");
    })
})
.catch((err) =>{
    console.error("datbase cannot be connected !...");
});


