const express = require('express');
const router = express.Router();
const upload = require("../../middlewares/upload");
const { auth } = require("../../middlewares/authMiddleware")
const { getImage, selectImage, deleteImage, getFilename, selectProfileImage, selectCommunityImage, selectPostImage, selectCommentImage, } = require("../../controllers/imageController");

router.post('/upload', upload.single("file"), selectImage);
router.post('/uploadProfile', upload.single("file"), auth, selectProfileImage);
router.post('/uploadCommunity/', upload.single("file"), auth, selectCommunityImage);
// router.post('/uploadCommunity/:communityId', upload.single("file"), auth, selectCommunityImage);
router.post('/uploadPost', upload.single("file"), auth, selectPostImage);
router.post('/uploadComment/:post_id', upload.single("file"), auth, selectCommentImage);
router.get('/:filename', getImage);
router.delete('/delete/:filename', deleteImage);
router.get('/getOne/:filename', getFilename);

module.exports = router
