const express = require("express");
const stdAdminsRouter = express.Router();

const {getAllStdAdmins,getAllStdAdminsByClassesiDs,getAllStdAdminsByClassiD } = require("../../controllers/studentsAdmins-controllers/getstudentsAdminsController");



stdAdminsRouter.get("/getAllStdAdmins", getAllStdAdmins);
stdAdminsRouter.get("/getAllStdAdminsByClassesiDs/:classID", getAllStdAdminsByClassesiDs);
stdAdminsRouter.get("/getAllStdAdminsByClassiD", getAllStdAdminsByClassiD);