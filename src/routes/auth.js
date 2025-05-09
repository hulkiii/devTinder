const  express = require ("express");
const authRouter = express.Router();

const{validateSignUpData} = require("../utils/validation");
const User = require("../models/user");

const bcrypt = require ("bcrypt");

// Signup
authRouter.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send({ error: "Error saving the user: " + err.message });
    }
});

// Login
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).send({ error: "Email and password are required" });
        }

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid credentials");

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) throw new Error("Invalid credentials");

        // created a jwt token
        const token = await user.getJWT();
        // console.log(token);

        
        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });

        res.send("Login successful!");
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


module.exports = authRouter;