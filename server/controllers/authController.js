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

        //RECHECK WHY COMPARE() RETURN FALSE
        // check if password is valid
        const passwordIsValid = await bcrypt.compare(req.body.password, existedUser.password);
        if(!passwordIsValid) return res.status(400).send({accessToken: null, message: "Password is incorrect!"});

        // create and assign a token
        const token = jwt.sign({id: existedUser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        // res.header('auth-token', token).send(token);
        res.status(200).send({
            id: existedUser._id,
            usernameOrEmail: existedUser.usernameOrEmail,
            accessToken: token
        });

    }catch (err){
        console.log(err);
    }
}  