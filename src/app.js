// const express = require ("express");
// const connectDB = require("./config/database");
// const app = express();
// const User = require("./models/user")
// const  validateSignUpData = require("./utils/validation");
// const bcrypt = require('bcrypt');
// app.use(express.json());
// app.post("/signup", async (req , res) =>{
//     //creating a new instance of user model
//     const user = new User(req.body);
//     try{
//         await user.save();
//         res.send("user added sucessfully");
//     }catch (err){
//         res.status(400).send("error saving the user:" + err.message);
//     }
    
// });

// app.get("/user", async (req, res) =>{
//     const userEmail = req.body.emailId;
//     try{
//         const users = await User.find({emailId: userEmail});
//         if(users.length === 0){
//             res.status(400).send("users not found");
//         }else{
//             res.send(users);
//         }
       
//     }catch (err){
//         res.status(400).send("something went wrong");
//     }
// })

// //feed api
// app.get("/feed", async (req , res) =>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch (err){
//         res.status(400).send("something went wrong");
//     }
// })

// app.delete("/user", async (req ,res) =>{
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete({_id: userId});
//         res.send("user deleted sucessfully");

//     }
//     catch (err){
//         res.status(400).send("something went wrong");
//     }
// })

// //update data of the user
// app.patch("/user", async (req ,res) => {
//     const userId = req.body.userId;
//     const data = req.body;
//     try{
//         const ALLOWED_UPDATES = ["photoUrl","about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) => 
//             ALLOWED_UPDATES.includes(k)
//         );
//         if(!isUpdateAllowed){
//             throw new Error("update not allowed")
//         }
//         if (data.skills && data.skills.length > 10) {
//             throw new Error("Skills cannot be more than 10");
//         }
//         const user = await User.findByIdAndUpdate(userId, data,{
//             returnDocument: "after",
//             runValidators: true,
//         });
//         console.log(user);
//         res.send("user updates sucesssfully");
//     }catch(err){
//         res.status(400).send("updte failed" + err.message);
//     }
// });

// app.post("/login", async (req, res)=>{
//     try{
//         const {emailId, password} = req.body;
//         const user = await User.findOne({emailId: emailId});
//         if(!user){
//             throw new Error ("Invalid credentials");
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(isPasswordValid){
//             res.send("login successfull !!..");
//         }else{
//             throw new Error ("Invalid credentials");
//         }
//     }catch (err){
//         res.status(400).send("error :" + err.message);
//     }
// });

// connectDB()
// .then(() => {
//     console.log("Databse connection established...");
//     app.listen(7777, ()=>{
//         console.log("running on 7777 port");
//     })
// })
// .catch((err) =>{
//     console.error("datbase cannot be connected !...");
// });






const express = require("express");
const connectDB = require("./config/database");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const cookie = require("cookie-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth}  = require("./middewares/auth")
const app = express();
app.use(express.json());
app.use(cookieParser())

// Signup
app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send({ error: "Error saving the user: " + err.message });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid credentials");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid credentials");

        // created a jwt token
        const token = await jwt.sign({ _id: user._id }, "DEV@Tiner$790", {expiresIn: "1d",
        });
        // console.log(token);

        
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.send("Login successful!");
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

app.get("/profile", userAuth, async (req, res) =>{
    try{
      const user = req.user;
      res.send(user);
    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
    
});

//connection request

app.post("/sendConnectionRequest", userAuth, async(req ,res) =>{
    const user = req.user;

    //sending a connection  request
    console.log("sending a connection req");

    res.send(user.firstName +  " sent the connected request")
})

// Get user by email
// app.get("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     try {
//         const users = await User.find({ emailId: userEmail });
//         if (users.length === 0) {
//             return res.status(404).send({ error: "User not found" });
//         }
//         res.send(users);
//     } catch (err) {
//         res.status(400).send({ error: "Something went wrong" });
//     }
// });

// Feed (get all users)
// app.get("/feed", async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         res.status(400).send({ error: "Something went wrong" });
//     }
// });

// Delete user
// app.delete("/user", async (req, res) => {
//     const userId = req.body.userId;
//     try {
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) return res.status(404).send({ error: "User not found" });
//         res.send("User deleted successfully");
//     } catch (err) {
//         res.status(400).send({ error: "Something went wrong" });
//     }
// });

// Update user
// app.patch("/user", async (req, res) => {
//     const userId = req.body.userId;
//     const data = req.body;

//     try {
//         const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//         const isUpdateAllowed = Object.keys(data).every((k) =>
//             ALLOWED_UPDATES.includes(k)
//         );

//         if (!isUpdateAllowed) {
//             throw new Error("Update not allowed");
//         }

//         if (data.skills && data.skills.length > 10) {
//             throw new Error("Skills cannot be more than 10");
//         }

//         const user = await User.findByIdAndUpdate(userId, data, {
//             new: true,
//             runValidators: true,
//         });

//         if (!user) return res.status(404).send({ error: "User not found" });

//         res.send("User updated successfully");
//     } catch (err) {
//         res.status(400).send({ error: "Update failed: " + err.message });
//     }
// });



// Connect DB and start server
connectDB()
    .then(() => {
        console.log("Database connection established...");
        app.listen(7777, () => {
            console.log("Server running on port 7777");
        });
    })
    .catch((err) => {
        console.error("Database connection failed!", err);
    });
