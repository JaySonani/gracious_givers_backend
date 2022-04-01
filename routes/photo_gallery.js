const express = require("express");
const router = express.Router();

//Notification controller
const StoryController = require('../controllers/notification');

//Get Notification
router.get("/getFundraiserStory", StoryController.home);

module.exports = router;
