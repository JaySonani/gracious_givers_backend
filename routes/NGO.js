//import express
const express = require("express");
const ngo = express.Router();
const ngoController = require('../controllers/NGO');

//get all pending ngo details
ngo.get("/pending", ngoController.getPendingNGOs);

//get all active ngo details
ngo.get("/active", ngoController.getActiveNGOs);

// Get ngo details by id
ngo.get("/:id", ngoController.getNgo);

module.exports = ngo;
