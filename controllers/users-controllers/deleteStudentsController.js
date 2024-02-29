const asyncHandler = require("express-async-handler");
const { students} = require("../../models/User");

// Delete all students
const deleteAllStudents = asyncHandler(async (req, res) => {
    const result = await students.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    //res.status(200).json({ message: `Successfully deleted ${result.deletedCount} students` });
    res.status(200).json("success");
})

// Delete one student
const deleteStudent = asyncHandler(async (req, res) => {
    const result = await students.deleteOne({ _id: req.query.studentID });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    //res.status(200).json({ message: "Student deleted successfully" });
    res.status(200).json("success");
});
  
const deleteStudentsByClass = asyncHandler(async (req, res) => {
    const result = await students.deleteMany({ class: req.query.classID });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No students found for this class" });
    }
    //res.status(200).json({ message: `Successfully deleted ${result.deletedCount} students` });
    res.status(200).json("success");
});
  
module.exports = {
    deleteAllStudents,
    deleteStudent,
    deleteStudentsByClass,
}