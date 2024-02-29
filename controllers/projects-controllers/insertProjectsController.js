const asyncHandler = require("express-async-handler");
const { projects } = require("../../models/Project");
 
const insertProject = asyncHandler(async (req, res) => {

  const projectObj = req.body;

  const projectModel = new projects(projectObj);

  const result = await projectModel.save();

    //res.status(201).json(result);
    res.json("success");
});

const insertProjects = asyncHandler(async (req, res) => {

  const projectObjs = req.body;

  const projectModels = projectObjs.map((projectObj) => new projects(projectObj));

  const results = await projects.insertMany(projectModels);
  
    //res.status(201).json(result);
    res.json("success");
});

const updateProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;
  const update = req.body;

  const result = await projects.findByIdAndUpdate(projectId, update, {
    new: true,
  });

    //res.status(201).json(result);
    res.json("success");
});

const deleteProject = asyncHandler(async (req, res) => {
  const projectId = req.query.id;

  const result = await projects.findByIdAndDelete(projectId);

    //res.status(201).json(result);
    res.json("success");
});

const getAllProjectsBySubjectId = asyncHandler(async (req, res) => {
  const subjectId = req.query.subjectId;
  const result = await projects.find({ subjects: subjectId });
  res.json(result);
});

module.exports = {
  insertProject,
  insertProjects,
  updateProject,
  deleteProject,
  getAllProjectsBySubjectId
};
