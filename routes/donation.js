const express = require("express");
const router = express.Router();

//Importing donation controller
const donationController = require('../controllers/donation');

//add donation
router.post("/addDonation", donationController.addDonation)

module.exports = router;

