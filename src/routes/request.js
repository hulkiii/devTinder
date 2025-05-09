const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middewares/auth");


//connection request

requestRouter.post("/sendConnectionRequest", userAuth, async(req ,res) =>{
    const user = req.user;

    //sending a connection  request
    console.log("sending a connection req");

    res.send(user.firstName +  " sent the connected request")
});

module.exports = requestRouter;
