const asyncHandler = require("express-async-handler");
const { students} = require("../../models/User");
 
// Get All Students
const getAllStudents = asyncHandler( async (req , res) => {
        
    const studentsList = await students.find()
    .select('_id studentID studenName password email class isAdmin isActive stateDescription')
    .populate( {
        path: 'class',
        select: 'className -_id' 
        }
    ); 
    
    const modifiedStudentsList = studentsList.map(student => {
        const modifiedStudent = student.toObject();
        if (student.class && student.class.className) {
          modifiedStudent.class = student.class.className;
        }
        return modifiedStudent;
      });

    res.status(201).json(modifiedStudentsList);

});

// By Department
const getAllStudentsByDepartment = asyncHandler(async (req, res) => {
    
    const department = req.params.department;
    
    const studentsList = await students.find({ department:department });
   
    res.status(201).json(studentsList);
});
 
// By Level
const getAllStudentsByLevel = asyncHandler(async (req, res) => {
    
    const studentsList = await students.find({ yearAndLevel:req.params.yearAndLevel });
   
    res.status(201).json(studentsList);
});

// By System
const getAllStudentsBySystem = asyncHandler(async (req, res) => {
    
    const studentsList = await students.find({ studyingSystem:req.params.studyingSystem });
   
    res.status(201).json(studentsList);
});

// By Class
const getAllStudentsByClass = asyncHandler(async (req, res) => {
    
    const studentsList = await students.find({ class:req.params.classID });
   
    res.status(201).json(studentsList);
});

module.exports = {
    getAllStudents,
    getAllStudentsByDepartment,
    getAllStudentsByLevel,
    getAllStudentsBySystem,
    getAllStudentsByClass
}