const router = require('express').Router();

const { getFriends, upMessDB, getMessage, seenMessage, deliverMessage } = require('../../controllers/messengerController');
const { auth } = require('../../middlewares/authMiddleware');

router.get('/friends', auth, getFriends);
router.post('/send', auth, upMessDB);
router.get('/message/:id', auth, getMessage);

router.post('/seen', auth, seenMessage);
router.post('/deliver', auth, deliverMessage);
