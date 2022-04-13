const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//import user context
const User = require("../models/userModel")

// jsonwebtoken functions use algorithm that needs a secret key to encode and decode token.
const secret = 'test'; 

exports.signin = async (req, res) => {
    try {
        // get user input
        const {usernameOrEmail, password} = req.body;

        // validate user input
        if(!(usernameOrEmail && password)) {
            res.status(400).send("All inputs are required");
        }

        // check if user already exist
        if (!await User.findOne({usernameOrEmail})) {
            return res.status(404).send({message: "User Not found."});
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, User.password);

        // check if password is valid
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        
        // create token
        const token = jwt.sign({id: User._id}, secret, { expiresIn: "1h" });
            
        // encrypt user password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.password, salt);

        // save user token
        User.token = token;

        res.status(200).send({
            id: user._id,
            usernameOrEmail: User.usernameOrEmail,
            accessToken: token
          });

        }
    catch (err) {
        console.log(err)
    }
};
