const express = require ("express")
const app = express();
const {adminAuth} = require("./middewares/auth");
app.use("/user", adminAuth);
app.get("/user", (req,res) =>{
    res.send("get the user data");
})
app.post("/admin", (req, res) =>{
    res.send("post data here");
})

app.listen(7777, ()=>{
    console.log("running on 7777 port");
})
