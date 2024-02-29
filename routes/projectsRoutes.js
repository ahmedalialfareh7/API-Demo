const express = require("express");
const projectsRouter = express.Router();

// Authentication middlewares
const {verifyStudentToken } = require("../middlewares/studentsAuthorization");
const {verifyStdAdminToken} = require("../middlewares/stdAdminsAuthorization");
const {verifyTeacherToken } = require("../middlewares/teachersAuthorization");

const { insertProject, insertProjects  ,updateProject , deleteProject} = require("../controllers/projects-controllers/insertProjectsController");
const { getAllProjects,
        getAllProjectsBySubjectId,
        getProjectsByClassID,
        getProjectsByTeacherID} = require("../controllers/projects-controllers/getProjectController");

projectsRouter.post("/insertProject"  , insertProject);
projectsRouter.post("/insertAdminProject", verifyStdAdminToken , insertProject);
projectsRouter.post("/insertTeacherProject", verifyTeacherToken  , insertProject);

projectsRouter.put("/updateProject" , updateProject);
projectsRouter.put("/updateAdminProject",verifyStdAdminToken, updateProject);
projectsRouter.put("/updateTeacherProject",verifyTeacherToken , updateProject);

projectsRouter.delete("/deleteProject", deleteProject);
projectsRouter.delete("/deleteAdminProject",verifyStdAdminToken, deleteProject);
projectsRouter.delete("/deleteTeacherProject",verifyTeacherToken , deleteProject);

projectsRouter.get("/getProjectsByClassID"       ,verifyStudentToken  ,getProjectsByClassID );
projectsRouter.get("/getAdminProjectsByClassID"  ,verifyStdAdminToken  ,getProjectsByClassID );
projectsRouter.get("/getProjectsByTeacherID"   ,verifyTeacherToken   ,getProjectsByTeacherID );

projectsRouter.get("/getAllProjects" ,getAllProjects );
projectsRouter.get("/getAllProjectsBySubjectId"   ,getAllProjectsBySubjectId );
projectsRouter.post("/insertProjects", insertProjects);

projectsRouter.get("/getProjectsByClassIDWithoutToken" ,getProjectsByClassID );
module.exports = {
  projectsRouter,
};
