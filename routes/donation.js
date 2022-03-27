const express = require("express");
const router = express.Router();

//Importing donation controller
const donationController = require('../controllers/donation');

//add donation
router.post("/addDonation", donationController.addDonation);

//get all donation
router.get("/alldonations", donationController.allDonations);

module.exports = router;

