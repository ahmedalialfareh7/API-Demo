const { teachers } = require("../../models/teacher");
const asyncHandler = require("express-async-handler");

const getAllTeachers = asyncHandler( async (req , res) => {

    const teacherslist = await teachers.find()
    .select('_id teacherName password email phone isActive stateDescription');
    //.populate( "subjects" ); 
    res.status(200).json(teacherslist);

});

module.exports = {
    getAllTeachers
}