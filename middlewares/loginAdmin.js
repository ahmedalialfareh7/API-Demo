const {studentAdmins,validateRegisterStdAdminInfo,validateLoginStdAdminInfo} = require("../models/adminUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

/**
 * USE this function  ( admin ) when i give hem the user name(his name) and password
 * 
 * 
 */

const loginAdmin = asyncHandler(async (req,res) => {
    // const {error} = validateLoginStdAdminInfo(req.body);
    // if(error){    
    //     return res.status(400).json({ message:error.details[0].message });
    // }

    let admin = await studentAdmins.findOne({email: req.query.email});
    if(!admin){
        return res.status(400).json({ message:"Invalid admin email..!" });
    }

    const isPasswordMatch = await bcrypt.compare(req.query.password, admin.password);
    if(!isPasswordMatch){
        return res.status(400).json({ message:"Invalid admin password...!" });
    }

      // Provide Token
      const expirationDate = new Date('2023-12-01T00:00:00Z').getTime() / 1000; 
      const token = jwt.sign(
          {
          id: admin._id,
          class: admin.class
          },
          "StdAdmins-SecretKey",
          { expiresIn: expirationDate }
      );

    const {password , ...other } = admin._doc;
    
    res.status(201).json({...other , token});
});

module.exports = {
    loginAdmin
};

