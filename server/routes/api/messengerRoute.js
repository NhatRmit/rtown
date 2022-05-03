const express = require('express')
const router = express.Router()

const { getFriends, messageUploadDB, messageGet, deliveredMessage } = require('../../controllers/messengerController');
const { auth } = require('../../middlewares/authMiddleware');

router.get('/get-friends', auth, getFriends);
router.post('/send-message', auth, messageUploadDB);
router.get('/get-message/:id', auth, messageGet);
router.post('/delivered-message', auth, deliveredMessage);


module.exports = router;
