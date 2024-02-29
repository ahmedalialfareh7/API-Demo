const asyncHandler = require("express-async-handler");
const { cs_1_am_subjects,validateSubjectInfo } = require("../../models/Subject");
const { classes } = require("../../models/Class");

// const getAllSubjects = asyncHandler(async (req, res) => {

//     const subjects = await cs_1_am_subjects.find()
//     .select('_id subjectName isPractice teacher class description logoImg')
//     .populate([
//       {
//         path: 'class',
//         select: 'className -_id' 
//       },
//       {
//         path: 'teacher',
//         select: 'teacherName -_id'
//       }
//     ]
//     );

//     // هنا نقوم بتعديل النتيجه لكي نجعل اسم الاستاذ مقابل لخاصية الاستاذ مباشره وليس في اقواس منفصله
//     const modifiedSubjects = subjects.map(subject => {
//       const modifiedSubject = subject.toObject();
//       if (subject.class) {
//         modifiedSubject.className = subject.class.className;
//         modifiedSubject.class = undefined;
//       }
//       if (subject.teacher) {
//         modifiedSubject.teacherName = subject.teacher.teacherName;
//         modifiedSubject.teacher = undefined;
//       }
//       return modifiedSubject;
//     });

//   res.json(modifiedSubjects);
  
// });

const getAllSubjects = asyncHandler(async (req, res) => {

  const subjects = await cs_1_am_subjects.find()
  .select('_id subjectName isPractice teacher class description logoImg')
  .populate([
    {
      path: 'class',
      select: '_id' 
    },
    {
      path: 'teacher',
      select: 'teacherName -_id'
    }
  ]
  );

  // هنا نقوم بتعديل النتيجه لكي نجعل اسم الاستاذ مقابل لخاصية الاستاذ مباشره وليس في اقواس منفصله
  const modifiedSubjects = subjects.map(subject => {
    const modifiedSubject = subject.toObject();
    if (subject.class) {
      modifiedSubject.className = subject.class._id;
      modifiedSubject.class = undefined;
    }
    if (subject.teacher) {
      modifiedSubject.teacherName = subject.teacher.teacherName;
      modifiedSubject.teacher = undefined;
    }
    return modifiedSubject;
  });

res.json(modifiedSubjects);

});

/**
 * Get subjects by class ID
 * @param {Object} res - Express response object
 * @description This function fetches all subjects for a given class ID. It filters the cs_1_am_subjects collection to only 
 * 
 * @Returned subject documents contain only the specified fields using .select():
 *   _id: The subject object ID
 *   subjectName: The name of the subject
 *   isPractice: Whether this is a practice subject
 *   teacher: The teacher document ref
 *   description: Subject description 
 *   logoImg: Subject logo image 
 *
 * The teacher field is populated to get the teacherName.
 * 
 * The filtered and projected subjects are sent back in the JSON response.
 */
  
const getSubjectsByClassID = async (req, res) => {

  const { classID } = req.query;
  console.log("classID: ", classID);
  const subjects = await cs_1_am_subjects.find({class: classID})
    .select('_id subjectName isPractice teacher description logoImg')
    .populate({
      path: 'teacher',
      select: 'teacherName -_id'
  });


    // هنا نقوم بتعديل النتيجه لكي نجعل اسم الاستاذ مقابل لخاصية الاستاذ مباشره وليس في اقواس منفصله
  const modifiedSubjects = subjects.map(subject => {
    return {
      ...subject.toObject(),
      teacher: subject.teacher.teacherName
    };
  });  

  res.json(modifiedSubjects);
  
};
  

const getSubjectsByTeacherID = asyncHandler(async (req, res) => {

  const subjects = await cs_1_am_subjects.find({teacher: req.params.teacherId})
        .select('_id subjectName isPractice class description logoImg') 
        .populate({
            path: 'class',
            select: 'className _id'
        });
  
  res.json(subjects);
  
});

module.exports = {
  getAllSubjects,
  getSubjectsByClassID ,
  getSubjectsByTeacherID
};

