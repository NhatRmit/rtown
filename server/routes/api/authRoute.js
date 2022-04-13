const express = require('express');
// const router = express.Router();

// const {signin} = require('../../controllers/userController')
const controller = require("../../controllers/authController");

module.exports = function(app) {
    app.use(function(req,res,next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/login", controller.signin);
};

// router.post("/signin", signin);
// router.get('/signin', async (req, res) => res.status(200).send('get user'));

// module.exports = router;

