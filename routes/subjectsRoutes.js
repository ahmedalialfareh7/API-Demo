const express = require("express");
const SubjectsRouter = express.Router();

// Authentication middlewares
const {verifyStudentToken} = require("../middlewares/studentsAuthorization");
const {verifyStdAdminToken} = require("../middlewares/stdAdminsAuthorization");
const {verifyTeacherToken} = require("../middlewares/teachersAuthorization");

const {insertSubject,insertSubjects, updateSubject , deleteSubject} = require("../controllers/subjects-controllers/insertSubjectsController");
const {getAllSubjects,getSubjectsByClassID , getSubjectsByTeacherID} = require("../controllers/subjects-controllers/getSubjectsController");


SubjectsRouter.post("/insertSubject" ,insertSubject );
SubjectsRouter.post("/insertSubjects" ,insertSubjects );
SubjectsRouter.put("/updateSubject" ,updateSubject );
SubjectsRouter.delete("/deleteSubject" ,deleteSubject );


SubjectsRouter.get("/getAllSubjects" ,getAllSubjects );

// Get Subject By class ID  //  FOR STUDENT ///
SubjectsRouter.get("/getSubjectsByClassID" ,
                    verifyStudentToken ,getSubjectsByClassID );

// Get Subject By class ID  //  FOR STUDENT Admins ///
SubjectsRouter.get("/getAdminSubjectsByClassID/:classID" ,
                    verifyStdAdminToken ,getSubjectsByClassID );

// Get Subject By Teacher ID  //  FOR Teachers ///
SubjectsRouter.get("/getTeacherSubjectsByTeacherID/:teacherID" ,
                    verifyTeacherToken,getSubjectsByTeacherID );

module.exports = {
    SubjectsRouter
}