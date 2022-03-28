//import express
const express = require("express");
const authorizationRoute = express.Router();

const {
  register,
  loginNgo,
  loginAdmin,
} = require("../controllers/authorizationController");

authorizationRoute.get("/", (request, response) => {
  response.send("Hello from Gracious Givers Backend!");
});

authorizationRoute.post("/register", register);
authorizationRoute.post("/login/ngo", loginNgo);
authorizationRoute.post("/login/admin", loginAdmin);

module.exports = authorizationRoute;
