const asyncHandler = require("express-async-handler");
const { deliveredHWs } = require("../../models/DeliveredHW");
const { homeWorks } = require("../../models/HomeWork");


const insertDeliveredHW = asyncHandler(async (req, res) => {
    const deliveredHWObj = req.body;
    const deliveredHWModel = new deliveredHWs(deliveredHWObj);
    const result = await deliveredHWModel.save();
    res.json("success");
  });
  
  const insertDeliveredHWs = asyncHandler(async (req, res) => {
    const deliveredHWObjs = req.body;
    const deliveredHWModels = deliveredHWObjs.map((deliveredHWObj) => new deliveredHWs(deliveredHWObj));
    const results = await deliveredHWs.insertMany(deliveredHWModels);
    res.json("success");
  });
  
  const updateDeliveredHW = asyncHandler(async (req, res) => {
    const deliveredHWId = req.query.id;
    const update = req.body;
    const result = await deliveredHWs.findByIdAndUpdate(deliveredHWId, update, {
      new: true,
    });
    res.json("success");
  });
  
  const deleteDeliveredHW = asyncHandler(async (req, res) => {
    const deliveredHWId = req.query.id;
    const result = await deliveredHWs.findByIdAndDelete(deliveredHWId);
    res.json("success");
  });

  const getAllDeliveredHWsByStudentId = asyncHandler(async (req, res) => {
    const studentId = req.query.studentId;
    const result = await deliveredHWs.find({ student: studentId });
    res.json(result);
  });

  
  const getAllDeliveredHWsByClassId = asyncHandler(async (req, res) => {
    const classID = req.query.classId;
    const result = await deliveredHWs.find({ class: classID });
    res.json(result);
  });
  
  const getAllDeliveredHWsByTeacherId = asyncHandler(async (req, res) => {
    const teacherId = req.query.teacherId;
    const result = await deliveredHWs.find({ teacher: teacherId });
    res.json(result);
  });
  
  const getAllDeliveredHWsByHomeworkId = asyncHandler(async (req, res) => {
    const homeworkId = req.query.homeworkId;
    const result = await deliveredHWs.find({ homework: homeworkId });
    res.json(result);
  });
  
  const getAllDeliveredHWs = asyncHandler(async (req, res) => {
    const deliveredHWsList = await deliveredHWs.find();
    res.json(deliveredHWsList);
  });
  
  module.exports = {
    insertDeliveredHW,
    insertDeliveredHWs,
    updateDeliveredHW,
    deleteDeliveredHW,
    getAllDeliveredHWsByStudentId,
    getAllDeliveredHWsByClassId,
    getAllDeliveredHWsByTeacherId,
    getAllDeliveredHWsByHomeworkId,
    getAllDeliveredHWs,
  };