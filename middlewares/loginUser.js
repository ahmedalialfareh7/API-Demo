const { students, validateLoginStudentinfo } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const e = require("express");


const loginUser = asyncHandler(async (req, res) => {

  
  // const { error } = validateLoginStudentinfo(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  //////// check the email if exist
  let user = await students.findOne({ email: req.query.email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email address." }); 
  }
  
  if (user.stateDescription === "Blocked") {
    return res.status(400).json({ error: "this Account is Blocked, please contact with admin to check the state." }); 
  } 
  
  if (user.stateDescription === "SignedIn") {
      return res.status(400).json({ error: "this Account already SignedIn , please logout from other secssion in your account." }); 
  }

  //////// check the password if valid
  // const isPasswordMatch = await bcrypt.compare(
  //   req.query.password,
  //   user.password
  // );
  // if (!isPasswordMatch) {
  //   return res.status(400).json({ message: "This password is not valid...!" });
  // }


  //////// check the password without encryption
  if(user.password != req.query.password){
    return res.status(401).json({ error: "Invalid password." });
  }

  // set to SignedIn
  if (user.stateDescription !== "SignedIn") {
    user.stateDescription = "SignedIn";
    await user.save();
  }

  // Provide Token
  const expirationDate = new Date('2023-12-01T00:00:00Z').getTime() / 1000; 
  const token = jwt.sign(
    {
      id: user._id,
      class: user.class
    },
    "Students-SecretKey",
    { expiresIn: expirationDate }
  );

  const { attendance, ...other } = user._doc;

  res.status(201).json({ ...other, token });
});

// Logout function for admin (using user _id)
const LogoutUser = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const user = await students.findById(userId);

  if (user) {

    if (user.stateDescription === "Blocked") {
      return res.status(400).json({ message: "this Account is Blocked, please contact with admin to check the state." }); 
    }

    user.stateDescription = "Signout";
    await user.save();
    res.status(200).json({ message: "User loged-out successful." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});


module.exports = {
  loginUser,
  LogoutUser
}; 

/*
const {students,validateLoginStudentinfo} = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");



const loginUser = asyncHandler(async (req,res)=>{

    const {error} = validateLoginStudentinfo(req.body);
    if(error){    
        return res.status(400).json( { message:error.details[0].message} );
    }

    //////// check the email if exist
    let user = await students.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json( { message:"this email is not valid...!"} );
    }

    //////// check the password if valid
    const isPasswordMatch = await bcrypt.compare(req.body.password , user.password);
    if(!isPasswordMatch){
        return res.status(400).json( { message:"this password is not valid...!"} );
    }


    const token = jwt.sign(
        { id:user._id , yearAndLevel:user.yearAndLevel , stateDescription:user.stateDescription },
        "secretKey"
    );

    const {password , ...other } = user._doc;
    
    res.status(201).json({...other , token});
    
})
module.exports = {
    loginUser
}
*/