const { students, validateRegisterStudentInfo } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  // const { error } = validateRegisterStudentInfo(req.body);
  // if (error) {
  //   return res.status(400).json({ message: error.details[0].message });
  // }

  let user = await students.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "This user already exists!" });
  }

  // const salt = await bcrypt.genSalt(10);
  // req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new students(req.body);

  await user.save();

  // // Provide Token
  // const expirationDate = new Date('2023-12-01T00:00:00Z').getTime() / 1000; 
  // const token = jwt.sign(
  //   {
  //     id: user._id,
  //     class: user.class
  //   },
  //   "Students-SecretKey",
  //   { expiresIn: expirationDate }
  // );

  //const { password, ...other } = user._doc;

  //res.status(201).json({ ...other, token });
  res.status(201).json("success");

});

// Block user by _id
const blockUser = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const user = await students.findById(userId);

  if (user) {
    user.stateDescription = "Blocked";
    await user.save();
    res.status(200).json({ message: "User blocked successfully." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

// Unblock user by _id
const unblockUser = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const stateDescription = req.query.stateDescription;
  const user = await students.findById(userId);

  if (user) {
    user.stateDescription = stateDescription; // Set it back to the default state
    await user.save();
    res.status(200).json({ message: "User unblocked successfully." });
  } else {
    res.status(404).json({ message: "User not found." });
  }
});

const insertStudents = asyncHandler(async (req, res) => {
  const studentObjs = req.body;
  const studentModels = studentObjs.map((studentObj) => new students(studentObj));
  const results = await students.insertMany(studentModels);
  //res.status(201).json(results);
  res.status(201).json("success");
});


const updateStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;
  const update = req.body;

  const result = await students.findByIdAndUpdate(studentId, update, {
    new: true,
  });

  //res.json(result);
  res.status(201).json("success");
});


const deleteStudent = asyncHandler(async (req, res) => {
  const studentId = req.params.id;

  const result = await students.findByIdAndDelete(studentId);

  //res.json(result);
  res.status(201).json("success");
});

module.exports = {
  registerUser,insertStudents,updateStudent,deleteStudent,blockUser,unblockUser
};


/*
const {students,validateRegisterStudentInfo} = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");



const registerUser = asyncHandler(async (req,res)=>{

    const {error} = validateRegisterStudentInfo(req.body);
    if(error){    
        return res.status(400).json( { message:error.details[0].message} );
    }
 
    let user = await students.findOne({email:req.body.email});
    if(user){
        return res.status(400).json( { message:"this user already exist!"} );
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password , salt);

    user = new students({
        userName:         req.body.userName,
        password:         req.body.password,
        email:            req.body.email,
        yearAndLevel:     req.body.yearAndLevel,
        inGroup:          req.body.inGroup,
        stateDescription: req.body.stateDescription,
    });

    const result = user.save();

    const token = jwt.sign(
        { id:user._id , yearAndLevel:user.yearAndLevel , stateDescription:user.stateDescription },
        "secretKey"
    );

    const {password , ...other } = user._doc;
    
    res.status(201).json({...other , token});
    
}) 

module.exports = {
    registerUser
}
*/
