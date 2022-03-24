// Importing modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Configuring server
const app = express()
const port = process.env.PORT || 5000
const url = "mongodb+srv://root:root@webcluster.nkpwa.mongodb.net/GraciousGivers?retryWrites=true&w=majority"
app.use(express.json())

app.use(cors())

// Import all routes here
const donationRoute = require("./routes/donation");

// Default URL of backend
app.get("/", (request, response) => {
    response.send("Hello from Gracious Givers Backend!");
});

// Define all routes here
app.use("/donation", donationRoute);

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
    console.log('Backend server started...');
}).catch((error) => console.log(error));
