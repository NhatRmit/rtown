const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const {loginValidation} = require('../../validation');


exports.login = async (req, res) => {
    try{
        // validate the login inputs
        const {error} = loginValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        
        // check if the user exists
        const existedUser = await User.findOne({usernameOrEmail: req.body.usernameOrEmail});
        if(!existedUser) return res.status(400).send({message: "RMIT ID or email address is incorrect!"});

        // check if password is valid
        if(req.body.password === existedUser.password){
            return res.send("Logged in") // direct to newsfeed page
        }

        else{
            return res.status(400).send({accessToken: null, message: "Password is incorrect!"});
        }

        // create and assign a token
        const token = jwt.sign({id: existedUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(200).send({
            id: existedUser._id,
            usernameOrEmail: existedUser.usernameOrEmail,
            accessToken: token
        });

    }catch (err){
        console.log(err);
    }
}  