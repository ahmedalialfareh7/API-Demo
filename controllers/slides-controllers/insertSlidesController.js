const asyncHandler = require("express-async-handler");
const { slides } = require("../../models/Slide");

const insertSlide = asyncHandler(async (req, res) => {

  const slideObj = req.body;

  const slideModel = new slides(slideObj);

  const result = await slideModel.save();

  res.status(201).json(result);
});

const insertSlides = asyncHandler(async (req, res) => {

  const slideObjs = req.body;

  const slideModels = slideObjs.map((slideObj) => new slides(slideObj));

  const results = await slides.insertMany(slideModels);
  
  res.status(201).json(results);
});

const updateSlide = asyncHandler(async (req, res) => {
  const slideId = req.params.id;
  const update = req.body;

  const result = await slides.findByIdAndUpdate(slideId, update, {
    new: true,
  });

  res.json(result);
});

const deleteSlide = asyncHandler(async (req, res) => {
  const slideId = req.params.id;

  const result = await slides.findByIdAndDelete(slideId);

  res.json(result);
});


module.exports = {
  insertSlide,
  insertSlides,
  updateSlide,
  deleteSlide,
};
