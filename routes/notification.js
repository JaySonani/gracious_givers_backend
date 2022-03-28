const express = require("express");
const router = express.Router();

//Notification controller
const notificationController = require('../controllers/notification');

//Get Notification
router.get("/getAdminNotification", notificationController.getNotification);

module.exports = router;
