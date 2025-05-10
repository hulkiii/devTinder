const express = require("express");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation")
const{userAuth}  = require("../middewares/auth");


profileRouter.get("/profile", userAuth, async (req, res) =>{
    try{
      const user = req.user;
      res.send(user);
    }catch(err){
        res.status(400).send("Error:" + err.message);
    }
    
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error ("invalid edit request")

        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        console.log(loggedInUser);
        res.send(`${loggedInUser}, user profile edit sucessfully`);
    }catch (err){
        res.status(400).send("error:" + err.message);
    }
})


module.exports = profileRouter;
