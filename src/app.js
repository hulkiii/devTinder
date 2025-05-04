const express = require ("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user")

app.post("/signup", async (req , res) =>{
    //creating a new instance of user model
    const user = new User({
       firstName:"Sachin",
       lastName:"Tendular",
       emailId: "sachin@gmai.com",
       password: "sachin@123"

    });
    await user.save();
    res.send("user added sucessfully!");
})

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


