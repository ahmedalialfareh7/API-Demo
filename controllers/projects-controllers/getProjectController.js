const asyncHandler = require("express-async-handler");
const { projects } = require("../../models/Project");
const { cs_1_am_subjects,validateSubjectInfo } = require("../../models/Subject");


const getAllProjects = asyncHandler(async (req, res) => {
    const projectsList = await projects.find();
    res.json(projectsList);
});

const getAllProjectsBySubjectId = asyncHandler(async (req, res) => {
  const subjectId = req.query.subjectId;
  const projectsList = await projects.find({ subjects: subjectId });
  res.json(projectsList);
});

const getProjectsByClassID = asyncHandler(async (req, res) => {
    const classID = req.query.classID;
    const subjects = await cs_1_am_subjects.find({ class: classID }).select("_id");
    const projectsList = await projects.find({ subjects: { $in: subjects } });
    res.json(projectsList);
});

const getProjectsByTeacherID = asyncHandler(async (req, res) => {
    const teacherID = req.query.teacherID;
    const subjects = await cs_1_am_subjects.find({ teacher: teacherID }).select("_id");
    const projectsList = await projects.find({ subjects: { $in: subjects } });
    res.json(projectsList);
});
  

module.exports = {
    getAllProjects,
    getAllProjectsBySubjectId,
    getProjectsByClassID,
    getProjectsByTeacherID
};
