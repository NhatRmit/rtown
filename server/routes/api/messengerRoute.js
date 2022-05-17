const express = require('express')
const router = express.Router()

const { auth } = require('../../middlewares/authMiddleware');
const { message } = require('../../controllers/messengerController');


router.post('/send-message', auth, message.messageUploadDB);
router.post('/delivered-message', auth, message.deliveredMessage);
router.post('/seen-message', auth, message.messageSeen);
router.get('/get-friends', auth, message.getFriends);
router.get('/get-message/:id', auth, message.messageGet);

module.exports = router;