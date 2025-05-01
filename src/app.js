const express = require ("express")
const app = express();

app.use("/", (req, res) =>{
    res.send("namste dashboard");
});

app.use("/test", (req, res) =>{
    res.send("welcome to test pagee");
})

app.listen(7777, ()=>{
    console.log("running on 7777 port");
})
