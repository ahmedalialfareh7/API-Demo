const express = require("express");
const deliveredHWsRouter = express.Router();

// Authentication middlewares
const { verifyStudentToken } = require("../middlewares/studentsAuthorization");
const { verifyStdAdminToken } = require("../middlewares/stdAdminsAuthorization");
const { verifyTeacherToken } = require("../middlewares/teachersAuthorization");

const {
  insertDeliveredHW,
  insertDeliveredHWs,
  updateDeliveredHW,
  deleteDeliveredHW,
  getAllDeliveredHWsByClassId,
  getAllDeliveredHWsByStudentId,
  getAllDeliveredHWsByTeacherId,
  getAllDeliveredHWsByHomeworkId,
  getAllDeliveredHWs,
} = require("../controllers/deliveredHWs-controllers/getDeliveredHWControllers");

deliveredHWsRouter.post("/insertDeliveredHW", insertDeliveredHW);
deliveredHWsRouter.post("/insertAdminDeliveredHW", verifyStdAdminToken, insertDeliveredHW);
deliveredHWsRouter.post("/insertTeacherDeliveredHW", verifyTeacherToken, insertDeliveredHW);

deliveredHWsRouter.post("/insertDeliveredHWs", insertDeliveredHWs);
deliveredHWsRouter.post("/insertAdminDeliveredHWs", verifyStdAdminToken, insertDeliveredHWs);
deliveredHWsRouter.post("/insertTeacherDeliveredHWs", verifyTeacherToken, insertDeliveredHWs);

deliveredHWsRouter.put("/updateDeliveredHW", updateDeliveredHW);
deliveredHWsRouter.put("/updateAdminDeliveredHW", verifyStdAdminToken, updateDeliveredHW);
deliveredHWsRouter.put("/updateTeacherDeliveredHW", verifyTeacherToken, updateDeliveredHW);

deliveredHWsRouter.delete("/deleteDeliveredHW", deleteDeliveredHW);
deliveredHWsRouter.delete("/deleteAdminDeliveredHW", verifyStdAdminToken, deleteDeliveredHW);
deliveredHWsRouter.delete("/deleteTeacherDeliveredHW", verifyTeacherToken, deleteDeliveredHW);

deliveredHWsRouter.get("/getAllDeliveredHWsByClassId", verifyStudentToken, getAllDeliveredHWsByClassId);
deliveredHWsRouter.get("/getAllDeliveredHWsByStudentId", verifyStudentToken, getAllDeliveredHWsByStudentId);
deliveredHWsRouter.get("/getAllDeliveredHWsByTeacherId", verifyTeacherToken, getAllDeliveredHWsByTeacherId);
deliveredHWsRouter.get("/getAllDeliveredHWsByHomeworkId", getAllDeliveredHWsByHomeworkId);
deliveredHWsRouter.get("/getAllDeliveredHWs", getAllDeliveredHWs);

module.exports = {
  deliveredHWsRouter,
};
