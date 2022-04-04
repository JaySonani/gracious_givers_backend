// Author: Jay Bhagvanbhai Sonani (B00891984)

// Importing modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuring server
const app = express()
const port = process.env.PORT || 5000
const url = "mongodb+srv://root:root@webcluster.nkpwa.mongodb.net/GraciousGivers?retryWrites=true&w=majority"
app.use(express.json({limit: '25mb'}))

app.use(cors())

// Import all routes here
const donationRoute = require("./routes/donation");
const fundraiserRoute = require("./routes/fundraiser");
const authorizationRoute = require("./routes/authorizationRoute");
const ngoRoute = require("./routes/ngo");

// Default URL of backend
app.get("/", (request, response) => {
    response.send("Hello from Gracious Givers Backend!");
});

// Define all routes here
app.use("/donation", donationRoute);
app.use("/fundraiser", fundraiserRoute);
app.use("/auth", authorizationRoute);
app.use("/ngo", ngoRoute);

const { static } = require("express");
app.use("/images/", static("./uploads/fundraiser/image"));

// Default response for any route that is not defined
app.use("*", (request, response) => {
    return response.status(404).json({
        message: "Cannot find any resource",
        success: false,
    });
});

// MongoDb connection
mongoose.connect(url).then((result) => {
    console.log('Connected to MongoDB database!');
    app.listen(port);
    console.log(`Backend server started...and running on ${port}`);
})
    .catch((error) => console.log(error));
