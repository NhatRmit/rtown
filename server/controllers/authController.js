const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const { loginValidation } = require('../../validation');
const asyncHandler = require('express-async-handler')


exports.login = async (req, res) => {
    try {
        // validate the login inputs
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        // check if the user exists
        const existedUser = await User.findOne({ usernameOrEmail: req.body.usernameOrEmail });
        if (!existedUser) return res.status(400).send({ message: "RMIT ID or email address is incorrect!" });

        // check if password is valid
        if (req.body.password === existedUser.password) {
            return res.send({
                token: generateToken(existedUser._id),
                user: existedUser._id,
                admin: existedUser.admin
            })
        }

        else {
            return res.status(400).send({ accessToken: null, message: "Password is incorrect!" });
        }

    } catch (err) {
        console.log(err);
    }
}

exports.getAuth = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

