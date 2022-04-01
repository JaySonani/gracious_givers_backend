const express = require("express");
const router = express.Router();

//Notification controller
const StoryController = require('../controllers/photo_gallery');

//Get Notification
router.get("/getFundraiserStory", StoryController.home);

module.exports = router;
