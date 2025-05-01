const express = require ("express")
const app = express();

app.get("/user", (req,res) =>{
    res.send("get the user data");
})
app.post("/user", (req,res) =>{
    res.send("post the users data")
})
app.delete("/user", (req, res ) =>{
    res.send("deleted the user")
})
app.put("/user", (req, res) =>{
    res.send("put(update whole) the user data")
})

app.use("/test/test3", (req, res) =>{
    res.send("welcome to test3 pagee");
})
app.use("/test/2", (req, res) =>{
    res.send("welcome to test2 pagee");
})

app.use("/test", (req, res) =>{
    res.send("welcome to test pagee");
})
app.use("/", (req, res) =>{
    res.send("namste dashboard");
});

app.listen(7777, ()=>{
    console.log("running on 7777 port");
})
