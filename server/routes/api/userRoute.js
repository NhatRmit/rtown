const express = require('express');
const router = express.Router();

// import { signin } from "../../controllers/userController";
const {signin} = require('../../controllers/userController')

router.post("/signin", signin);
router.get('/', async (req, res) => res.status(200).send('get user'));

module.exports = router;