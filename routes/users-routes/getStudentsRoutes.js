//نعمل امبورت للاكسبرس وناخذ منه الراوتر لكي يتعرف في ملف المين على الروابط التي سنعرفها للدوال 
const express = require("express");
const usersRouter = express.Router();

// نعمل امبورت للكنرولر لكي ناخذ منه الدوال المناسبه لكل رابط
const {getAllStudents,getAllStudentsByDepartment,getAllStudentsByLevel,getAllStudentsBySystem,getAllStudentsByClass} 
    = require("../../controllers/users-controllers/getStudents");

const {deleteAllStudents,deleteStudent,deleteStudentsByClass,} 
    = require("../../controllers/users-controllers/deleteStudentsController");

const {insertStudents,updateStudent} 
    = require("../../controllers/users-controllers/insertStudentsController");

usersRouter.get("/getAllStudents" ,getAllStudents );
usersRouter.get("/getAllStudentsByDept/:department" ,getAllStudentsByDepartment );
usersRouter.get("/getAllStudentsByLevel/:yearAndLevel" ,getAllStudentsByLevel );
usersRouter.get("/getAllStudentsBySystem/:studyingSystem" ,getAllStudentsBySystem );
usersRouter.get("/getAllStudentsByClass/:class" ,getAllStudentsByClass );

usersRouter.delete("/deleteAllStudents" ,deleteAllStudents );
usersRouter.delete("/deleteStudent" ,deleteStudent );
usersRouter.delete("/deleteStudentsByClass" ,deleteStudentsByClass );

usersRouter.put("/updateStudent" ,updateStudent );


module.exports = {
    usersRouter
}