const { students, validateRegisterStudentInfo } = require("../../models/User");
const asyncHandler = require("express-async-handler");


const insertStudents = asyncHandler(async (req, res) => {
    const studentObjs = req.body;
    const studentModels = studentObjs.map((studentObj) => new students(studentObj));
    const results = await students.insertMany(studentModels);
    //res.status(201).json(results);
    res.status(201).json("success");
});
  
const updateStudent = asyncHandler(async (req, res) => {
    const studentId = req.query.id;
    const update = req.body;
  
    const result = await students.findByIdAndUpdate(studentId, update, {
      new: true,
    });
  
    res.status(201).json("success");
});
   
  
module.exports = {
    insertStudents,updateStudent,
};