const asyncHandler = require("express-async-handler");
const { classes } = require("../../models/Class");


const getAllClasses = asyncHandler( async (req , res) => {

    const classeslist = await classes.find()
    .select('_id className stateDescription');
    //.populate( ["subjects" , "students"] ); 
    res.status(200).json(classeslist);

});

module.exports = {
    getAllClasses
}