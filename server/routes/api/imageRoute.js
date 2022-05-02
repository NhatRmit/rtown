const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/upload");
const {getImage, selectImage, deleteImage, getFilename, getImgURL} = require("../../controllers/imageController");

router.post('/upload', upload.single("file"), selectImage);
router.get('/:filename', getImage);
router.delete('/delete/:filename', deleteImage);
router.get('/getOne/:filename', getFilename);
router.get('/getURL/:filename', getImgURL)
module.exports = router
