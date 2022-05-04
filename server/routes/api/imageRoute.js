const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/upload");
const { auth } = require("../../middlewares/authMiddleware")
const { getImage, selectImage, deleteImage, getFilename, selectProfileImage, selectCommunityImage, selectPostImage, } = require("../../controllers/imageController");

router.post('/upload', upload.single("file"), selectImage);
router.post('/uploadProfile', upload.single("file"), auth, selectProfileImage);
router.post('/uploadCommunity/:communityId', upload.single("file"), auth, selectCommunityImage);
router.post('/uploadPost/:postId', upload.single("file"), auth, selectPostImage);
router.get('/:filename', getImage);
router.delete('/delete/:filename', deleteImage);
router.get('/getOne/:filename', getFilename);


module.exports = router
