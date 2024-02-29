const asyncHandler = require("express-async-handler");
const { classes } = require("../../models/Class");
const fs = require("fs");
const path = require('path');

const insertClass = asyncHandler( async (req , res) => {

    const classObj = req.body ;
    //////   new object from the model    
    const classModel = new classes( classObj );

    const result = await classModel.save();
    
    createFolder(result._id.toString());

    res.status(201).json(result);

});

/*
عملها تنشئ مجلد باسم الايدي للكلاس وفي هذا المجلد سيتم لاحقا انشاء عدة مجلدات لكل مادة عندما ننشئ ماده جديده
*/
function createFolder(folderName) {
    //هنا المسار الرئيسي لمجلد للكلاس 
    const folderPath = __dirname + '/../../Resources/ClassesFolder/' + folderName +'/schedule';
  
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder '${folderPath}' created successfully!`);
    }
}

/**
 * -classObjs.map(...) iterates over each element in the classObjs array.
 * -(classObj) => new classes(classObj) is an arrow function that takes each classObj as an argument and
 *     creates a new instance of the classes model using that object.
 * -The resulting array of new instances is assigned to the variable classModels.
 */
const insertClasses = asyncHandler(async (req, res) => {
    const classObjs = req.body;
    const classModels = classObjs.map((classObj) => new classes(classObj));
    const results = await classes.insertMany(classModels);
    res.status(201).json(results);
});


/////////////////////////////////    update    //////////////////////////////

const updateClass = asyncHandler(async (req, res) => {
    const classId = req.query.id;
    const update = req.body;
  
    const result = await classes.findByIdAndUpdate(classId, update, {
      new: true,
    });
  
    //res.json(result);
    res.json("success");
});

const deleteClass = asyncHandler(async (req, res) => {
    const classId = req.query.id;
  
    const result = await classes.findByIdAndDelete(classId);
  
    //res.json(result);
    res.json("success");
});
  
const deleteAllClasses = asyncHandler(async (req, res) => {
    const result = await classes.deleteMany();
  
    //res.json(result);
    res.status(201).json("success");
});

module.exports = {
    insertClass , insertClasses , updateClass,deleteClass,deleteAllClasses
}


