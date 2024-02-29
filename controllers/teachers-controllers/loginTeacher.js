const { teachers } = require("../../models/teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const loginTeacher = asyncHandler(async (req, res) => {

  
    //////// check the phone if exist
    let user = await teachers.findOne({ phone: req.body.phone });
    if (!user) {
      return res.status(400).json({ message: "This phone number is not valid...!" });
    }
  
    //////// check the password if valid
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "This password is not valid...!" });
    }
  
    // Provide Token
    const expirationDate = new Date('2023-12-01T00:00:00Z').getTime() / 1000; 
    const token = jwt.sign(
       {
          id: user._id,
          phone: user.phone
        },
          "Teachers-SecretKey",
        { expiresIn: expirationDate }
    );
  
    const { password, ...other } = user._doc;
  
    res.status(201).json({ ...other, token });
  });
  
  module.exports = {
    loginTeacher
  };