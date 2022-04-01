const express = require("express");
const router = express.Router();

//Photo gallery controller
const StoryController = require('../controllers/photo_gallery');

//Photo gallery routes
router.get("/getFundraiserStory", StoryController.home);
router.post("/addFundraiserStory", upload.single('NGOStory'), controller.uploads);
router.get("/updateFundraiserStory", controller.editImages);
router.post("/deleteFundraiserStory", controller.deleteImages);

module.exports = router;
