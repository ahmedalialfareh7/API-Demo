const asyncHandler = require("express-async-handler");
const { homeWorks } = require("../../models/HomeWork");
const { cs_1_am_subjects } = require("../../models/Subject");


const getAllHomeworks = asyncHandler(async (req, res) => {
    const homeworksList = await homeWorks.find();
    res.json(homeworksList);
});

const getAllHomeworksBySubjectId = asyncHandler(async (req, res) => {
  const subjectId = req.query.subjectId;
  const homeworksList = await homeWorks.find({ subject: subjectId });
  res.json(homeworksList);
});

const getHomeworksByClassID = asyncHandler(async (req, res) => {
    const classID = req.query.classID;
    const subjects = await cs_1_am_subjects.find({ class: classID }).select("_id");
    const homeworksList = await homeWorks.find({ subject: { $in: subjects } });
    res.json(homeworksList);
});
  
const getHomeworksByTeacherID = asyncHandler(async (req, res) => {
    const teacherID = req.query.teacherID;
    const subjects = await cs_1_am_subjects.find({ teacher: teacherID }).select("_id");
    const homeworksList = await homeWorks.find({ subject: { $in: subjects } });
    res.json(homeworksList);
});
  
module.exports = {
    getAllHomeworks,
    getAllHomeworksBySubjectId,
    getHomeworksByClassID,
    getHomeworksByTeacherID
  };
