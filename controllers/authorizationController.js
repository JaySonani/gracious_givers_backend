const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AdminUser = require("../models/AdminUser");
exports.register = async (request, response) => {
  const { user_id, password, ngo_name, target_group, email, description } = request.body;

  //encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    user_id,
    password: hashedPassword,
    email,
    ngo_name,
    target_group,
    description,
    status: "Pending Admin Approval",
  });

  try {
    await newUser.save();
    const successResponse = {
      message: "User registered successfully",
      success: true,
    };
    response.status(201).json(successResponse);
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    };
    response.status(500).json(errorResponse);
  }
};

exports.loginNgo = async (request, response) => {
  const { password, email } = request.body;
  try {
    //get the user by email
    const user = await User.findOne({ email });
    if (!user) {
      const errorResponse = {
        message: "User not found",
        success: false,
      };
      return response.status(404).json(errorResponse);
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const errorResponse = {
        message: "Invalid password",
        success: false,
      };
      return response.status(401).json(errorResponse);
    }

    return response.status(200).json({
      message: "User logged in successfully",
      success: true,
      isNgo: true,
      user,
    });

    console.log(user);
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    };
    response.status(500).json(errorResponse);
  }
};

exports.loginAdmin = async (request, response) => {
  const { password, username, security_a1, security_a2 } = request.body;
  try {
    //get the user by username
    const user = await AdminUser.findOne({ username });
    console.log(user);
    if (!user) {
      const errorResponse = {
        message: "User not found",
        success: false,
      };
      return response.status(404).json(errorResponse);
    }
    //compare password
    //const isMatch = password == user.password;
    if (!(password == user.password)) {
      const errorResponse = {
        message: "Invalid password",
        success: false,
      };
      return response.status(401).json(errorResponse);
    }
    //compare security answers
    if (security_a1 !== user.security_a1 && security_a2 !== user.security_a2) {
      console.log(security_a1);
      console.log(user.security_a1);
      console.log(security_a2);
      console.log(user.security_a2);
      const errorResponse = {
        message: "Invalid security answers",
        success: false,
      };
      return response.status(401).json(errorResponse);
    }

    return response.status(200).json({
      message: "User logged in successfully",
      success: true,
      isAdmin: true, //isAdmin is a flag to indicate if the user is an admin
      user, //delete password from the response
    });
  } catch (err) {
    const errorResponse = {
      message: err,
      success: false,
    };
    response.status(500).json(errorResponse);
  }
};
