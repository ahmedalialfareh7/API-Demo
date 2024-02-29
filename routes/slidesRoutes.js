const express = require("express");
const SlidesRouter = express.Router();

// Authentication middlewares
const {verifyStudentToken} = require("../middlewares/studentsAuthorization");
const {verifyStdAdminToken} = require("../middlewares/stdAdminsAuthorization");
const {verifyTeacherToken} = require("../middlewares/teachersAuthorization");

const {insertSlide , insertSlides , updateSlide , deleteSlide} = require("../controllers/slides-controllers/insertSlidesController");
const {getAllSlides, getAllSlidesBySubjectId, getSlidesByTeacherID,getSlidesByClassID} = require("../controllers/slides-controllers/getSlidesController");

SlidesRouter.post("/insertSlides" ,insertSlides );
// Insert slides
SlidesRouter.post("/insertSlide" ,insertSlide );
SlidesRouter.post("/insertAdminSlide"  ,
                        verifyStdAdminToken,insertSlide );// insertAdminSlide for admin
SlidesRouter.post("/insertTeacherSlide",
                        verifyTeacherToken ,insertSlide );// insertTeacherSlide for teacher
// Update slides
SlidesRouter.post("/updateSlide" ,updateSlide );
SlidesRouter.post("/updateAdminSlide"  ,
                        verifyStdAdminToken,updateSlide );   // updateAdminSlide for admin
SlidesRouter.post("/updateTeacherSlide",verifyTeacherToken ,updateSlide ); // updateTeacherSlide for teacher
// Delete slides
SlidesRouter.post("/deleteSlide" ,deleteSlide );
SlidesRouter.post("/deleteAdminSlide"   ,
                        verifyStdAdminToken,deleteSlide );   // deleteAdminSlide for admin
SlidesRouter.post("/deleteTeacherSlide" ,
                        verifyTeacherToken,deleteSlide ); // deleteTeacherSlide for teacher

SlidesRouter.get("/getAllSlides/" ,getAllSlides );
SlidesRouter.get("/getAllSlidesBySubjectId/:subjectId" ,getAllSlidesBySubjectId );

// get Slides By ClassID for students
SlidesRouter.get("/getSlidesByClassID"     ,
                    verifyStudentToken,getSlidesByClassID );
                    
SlidesRouter.get("/getAdminSlidesByClassID/:classID",
                    verifyStdAdminToken ,getSlidesByClassID );// for admin
SlidesRouter.get("/getSlidesByTeacherID/:teacherID" ,
                    verifyTeacherToken ,getSlidesByTeacherID );//for teacher

module.exports = {
    SlidesRouter
}