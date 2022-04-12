const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModal = require('../models/userModel')

const secret = 'test'; 

const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existedUser = await UserModal.findOne({email});
        if (!existedUser) return res.status(404).json({message: "User doesn't exist"});
        const isPasswordCorrect = await bcrypt.compare(password, existedUser.password);
        if (!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});
        const token = jwt.sign({email: existedUser.email, id: existedUser._id}, secret, { expiresIn: "1h" });
        res.status(200).json({result: existedUser, token});
    }
    catch (err) {
        res.status(500).json({message: "Something went wrong!"});
        res.redirect('/login')
    }
};

module.exports = {
    signin
}