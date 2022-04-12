const express = require('express');
const router = express.Router();

import { signin } from "../controllers/userController.js";

router.post("/signin", signin);
router.get('/', async (req, res) => res.status(200).send('get user'))

module.exports = router

export default router;