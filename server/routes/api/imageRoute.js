const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/uploadMiddleware");
const { auth } = require("../../middlewares/authMiddleware")
const { image } = require("../../controllers/imageController");

router.post('/upload', upload.single("file"), auth, image.selectImage);
router.get('/:filename', image.getImage);
router.delete('/delete/:filename', auth, image.deleteImage);

module.exports = router
