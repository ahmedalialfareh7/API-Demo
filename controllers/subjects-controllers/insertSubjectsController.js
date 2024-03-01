const asyncHandler = require("express-async-handler");
const { cs_1_am_subjects,validateSubjectInfo } = require("../../models/Subject");
const { classes } = require("../../models/Class");
const fs = require("fs");
const path = require('path');

const insertSubject = asyncHandler( async (req , res) => {

    //////   new object from the model    
    const subjectModel = new cs_1_am_subjects( req.body );

    const result = await subjectModel.save();

    //createFolder(result.class.toString(),result._id.toString());

    res.status(201).json("success");

});

// /*
// عملها تنشئ مجلد باسم الايدي للمادة وفي هذا المجلد تنشئ عدة مجلدات للسلايدات وووو
// */
// function createFolder(folderName) {
//     //هنا المسار الرئيسي لمجلد المادة 
//     const folderPath = __dirname + '/../../../Resources/Subjects/' + folderName;
  
//     if (!fs.existsSync(folderPath)) {
//       fs.mkdirSync(folderPath, { recursive: true });
//       console.log(`Folder '${folderPath}' created successfully!`);
  
//       //هنا نضع اسماء المجلدات التي نريد انشائها بداخل مجلد المادة
//       const subDirectories = ['Slides', 'Images', 'Attendances']; // Add the names of the subdirectories you want to create
  
//       subDirectories.forEach((subDir) => {
//         const subDirPath = path.join(folderPath, subDir);
//         fs.mkdirSync(subDirPath);
//         console.log(`Subdirectory '${subDirPath}' created successfully!`);
//       });
//     }
// }

/*
عملها تنشئ مجلد باسم الايدي للمادة وفي هذا المجلد تنشئ عدة مجلدات للسلايدات وووو
*/
function createFolder(classID,folderName) {
    //هنا المسار الرئيسي لمجلد المادة 
    const folderPath = __dirname + '/../../../Resources/ClassesFolder/' + classID + '/Subjects/' + folderName;
  
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder '${folderPath}' created successfully!`);
  
      //هنا نضع اسماء المجلدات التي نريد انشائها بداخل مجلد المادة
      const subDirectories = ['Slides', 'Images', 'Attendances']; // Add the names of the subdirectories you want to create
  
      subDirectories.forEach((subDir) => {
        const subDirPath = path.join(folderPath, subDir);
        fs.mkdirSync(subDirPath);
        console.log(`Subdirectory '${subDirPath}' created successfully!`);
      });
    }
}

 
const insertSubjects = asyncHandler(async (req, res) => {

    const subjectObjs = req.body;

    const subjectModels = subjectObjs.map((subjectObj) => new cs_1_am_subjects(subjectObj));

    const results = await cs_1_am_subjects.insertMany(subjectModels);

    res.status(201).json("success");
    //res.status(201).json(results);
});
  
const updateSubject = asyncHandler(async (req, res) => {
    const subjectId = req.query.id;
    const update = req.body;
  
    const result = await cs_1_am_subjects.findByIdAndUpdate(subjectId, update, {
      new: true,
    });
  
    res.status(201).json("success");
});
  
const deleteSubject = asyncHandler(async (req, res) => {
    const subjectId = req.query.id;
  
    const result = await cs_1_am_subjects.findByIdAndDelete(subjectId);
  
    res.status(201).json("success");
  });

module.exports = {
    insertSubject , insertSubjects,updateSubject,deleteSubject
}
