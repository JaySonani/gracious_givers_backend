// Importing Express
const express = require('express')

// Configuring server
const app = express()
const port = process.env.PORT || 5000

// Import all routes here
// const route1 = require("./routes/route1");
// const route2 = require("./routes/route2");

// Default URL of backend
app.get("/", (request, response) => {
    response.send("Hello from Gracious Givers Backend!");
});

// Define all routes here
// app.use("/route1", route1);
// app.use("/route2", route2);

app.use("/", (request, response) => {
    return response.status(404).json({
        message: "Cannot find any resource",
        success: "false",
    });
});

app.listen(port, () => {
    console.log("Gracious Givers backend server started...")
});
