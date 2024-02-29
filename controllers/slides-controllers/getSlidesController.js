const asyncHandler = require("express-async-handler");
const { slides } = require("../../models/Slide");
const { cs_1_am_subjects,validateSubjectInfo } = require("../../models/Subject");

const getAllSlides = asyncHandler(async (req, res) => {
    const slidesList = await slides.find();
    res.json(slidesList);
});

const getAllSlidesBySubjectId = asyncHandler(async (req, res) => {
    const subjectId = req.params.subjectId;
    const slidesList = await slides.find({ subjects: subjectId });
    res.json(slidesList);
});


const getSlidesByClassID = asyncHandler(async (req, res) => {

    const classID = req.query.classID;
    const subjects = await cs_1_am_subjects.find({ class: classID }).select("_id");
    const slidesList = await slides.find({ subjects: { $in: subjects } });

    res.json(slidesList);
  });

const getSlidesByTeacherID = asyncHandler(async (req, res) => {

    const teacherID = req.params.teacherID;
    const subjects = await cs_1_am_subjects.find({ teacher: teacherID }).select("_id");
    const slidesList = await slides.find({ subjects: { $in: subjects } });
  
    res.json(slidesList);
});


  
module.exports = {
    getAllSlides,
    getAllSlidesBySubjectId,
    getSlidesByClassID,
    getSlidesByTeacherID
};