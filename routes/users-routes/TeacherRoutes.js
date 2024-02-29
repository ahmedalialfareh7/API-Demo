const express = require("express");
const TeacherRouter = express.Router();

const {registerTeacher , insertTeachers,updateTeacher,deleteTeacher} = require("../../controllers/teachers-controllers/registerTeacher");
const {loginTeacher} = require("../../controllers/teachers-controllers/loginTeacher");
const {getAllTeachers} = require("../../controllers/teachers-controllers/getTeachers");


TeacherRouter.post("/insertTeachers" , insertTeachers ); // insert list of Teachers


TeacherRouter.post("/registerTeacher" , registerTeacher );
TeacherRouter.post("/loginTeacher" , loginTeacher );

TeacherRouter.put("/updateTeacher" , updateTeacher );
TeacherRouter.delete("/deleteTeacher" , deleteTeacher );

TeacherRouter.get("/getAllTeachers" , getAllTeachers );






module.exports = {
    TeacherRouter
}
