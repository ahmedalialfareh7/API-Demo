const express = require("express");
const homeWorksRouter = express.Router();

// Authentication middlewares
const {verifyStudentToken } = require("../middlewares/studentsAuthorization");
const {verifyStdAdminToken} = require("../middlewares/stdAdminsAuthorization");
const {verifyTeacherToken } = require("../middlewares/teachersAuthorization");

const { insertHomeWork, insertHomeWorks , updateHomeWork , deleteHomeWork } = require("../controllers/homeworks-controllers/insertHomeWorkController");
const { getAllHomeworks,
        getAllHomeworksBySubjectId,
        getHomeworksByClassID,
        getHomeworksByTeacherID } = require("../controllers/homeworks-controllers/getHomeWorksConrollers");

homeWorksRouter.post("/insertHomeWork"       , insertHomeWork);
homeWorksRouter.post("/inserAdmintHomeWork"  ,verifyStdAdminToken, insertHomeWork);
homeWorksRouter.post("/insertTeacherHomeWork",verifyTeacherToken , insertHomeWork);

homeWorksRouter.put("/updateHomeWork"        , updateHomeWork);
homeWorksRouter.put("/updateAdminHomeWork"   ,verifyStdAdminToken, updateHomeWork);
homeWorksRouter.put("/updateTeacherHomeWork" ,verifyTeacherToken , updateHomeWork);

homeWorksRouter.delete("/deleteHomeWork"        , deleteHomeWork);
homeWorksRouter.delete("/deleteAdminHomeWork"   ,verifyStdAdminToken, deleteHomeWork);
homeWorksRouter.delete("/deleteTeacherHomeWork" ,verifyTeacherToken , deleteHomeWork);

homeWorksRouter.get("/getHomeworksByClassID"      ,verifyStudentToken ,getHomeworksByClassID );
homeWorksRouter.get("/getAdminHomeworksByClassID" ,verifyStdAdminToken,getHomeworksByClassID );
homeWorksRouter.get("/getHomeworksByTeacherID"  ,verifyTeacherToken ,getHomeworksByTeacherID );

homeWorksRouter.get("/getAllHomeworks" ,getAllHomeworks );
homeWorksRouter.get("/getAllHomeworksBySubjectId" ,getAllHomeworksBySubjectId );
homeWorksRouter.post("/insertHomeWorks", insertHomeWorks);

homeWorksRouter.get("/getHwsByClassIDwithoutToken"      ,verifyStudentToken ,getHomeworksByClassID );



module.exports = {
  homeWorksRouter,
};
