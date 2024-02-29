const { teachers } = require("../../models/teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const registerTeacher = asyncHandler(async (req, res) => {
  

  let user = await teachers.findOne({ phone: req.body.phone });
  if (user) {
    return res.status(400).json({ message: "This Teacher user already exists!" });
  }

  // const salt = await bcrypt.genSalt(10);
  // req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new teachers(req.body);

  await user.save();

  // const token = jwt.sign(
  //   {
  //     id: user._id,
  //     phone: user.phone,
  //     stateDescription: user.stateDescription,
  //   },
  //   "secretKey"
  // );

  // const { password, ...other } = user._doc;

  // res.status(201).json({ ...other, token });
  res.json("success");
});

const insertTeachers = asyncHandler(async (req, res) => {
  const teacherObjs = req.body;
  const teacherModels = teacherObjs.map((teacherObj) => new teachers(teacherObj));
  const results = await teachers.insertMany(teacherModels);
  //res.status(201).json(results);
  res.json("success");
});


const updateTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.query.id;
  const update = req.body;

  const result = await teachers.findByIdAndUpdate(teacherId, update, {
    new: true,
  });

  res.json("success");
  //res.json(result);
});

const deleteTeacher = asyncHandler(async (req, res) => {
  const teacherId = req.query.id;

  const result = await teachers.findByIdAndDelete(teacherId);

  res.json("success");
});

module.exports = {
    registerTeacher,insertTeachers,updateTeacher,deleteTeacher
};