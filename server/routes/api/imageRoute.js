const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/upload");
const {getImage, selectImage, deleteImage} = require("../../controllers/imageController");

router.post('/upload', upload.single("file"), selectImage);
router.get('/:filename', getImage);
router.delete('/delete/:filename', deleteImage);
