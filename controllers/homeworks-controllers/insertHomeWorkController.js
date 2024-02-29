const asyncHandler = require("express-async-handler");
const { homeWorks } = require("../../models/HomeWork");

const insertHomeWork = asyncHandler(async (req, res) => {

  const homeWorkObj = req.body;

  const homeWorkModel = new homeWorks(homeWorkObj);

  const result = await homeWorkModel.save();

  //res.status(201).json(result);
  res.json("success");
});

const insertHomeWorks = asyncHandler(async (req, res) => {

  const homeWorkObjs = req.body;

  const homeWorkModels = homeWorkObjs.map((homeWorkObj) => new homeWorks(homeWorkObj));

  const results = await homeWorks.insertMany(homeWorkModels);
  
  //res.status(201).json(result);
  res.json("success");
});


const updateHomeWork = asyncHandler(async (req, res) => {
  const homeworkId = req.query.id;
  const update = req.body;

  const result = await homeWorks.findByIdAndUpdate(homeworkId, update, {
    new: true,
  });

  //res.status(201).json(result);
  res.json("success");
});

const deleteHomeWork = asyncHandler(async (req, res) => {
  const homeworkId = req.query.id;

  const result = await homeWorks.findByIdAndDelete(homeworkId);

  //res.status(201).json(result);
  res.json("success");
});

const getAllHomeWorksBySubjectId = asyncHandler(async (req, res) => {
  const subjectId = req.query.subjectId;
  const result = await homeWorks.find({ subjects: subjectId });
  res.json(result);
});

module.exports = {
  insertHomeWork,
  insertHomeWorks,
  updateHomeWork,
  deleteHomeWork,
  getAllHomeWorksBySubjectId
};
