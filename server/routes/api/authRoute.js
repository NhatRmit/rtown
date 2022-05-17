const router = require('express').Router();
const { auth } = require('../../middlewares/authMiddleware')

const { login, getAuth } = require('../../controllers/authController')
router.post("/login", login);
router.get('/', auth, getAuth)

module.exports = router;
