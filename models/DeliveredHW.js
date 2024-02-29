const mongoose = require("mongoose");
const Joi = require("joi");


const deliveredHWSchema = new mongoose.Schema(
    {
        class :             {type: mongoose.Schema.Types.ObjectId ,required :true, ref:"classes" } ,
        student :           {type: mongoose.Schema.Types.ObjectId ,required :false, ref:"students" },
        homework :          {type : mongoose.Schema.Types.ObjectId ,required :false, ref:"homeWorks" } ,
        
        studentName:        {type: String , trim: true , required :false, default: "studentName"},
        studentNID :        {type: String , trim: true , required :false, default: "studentNID"},
        description:        {type: String , trim: true , required :false},
        
        fileName :          {type: String , trim: true, required :false, default: "fileName"},
        mimeType :          {type: String , trim: true, required :false, default: "mimeType"},
        fileLink :          {type: String , trim: true, required :false, default: "fileLink"},
        fileSize :          {type: String , trim: true, required :false, default: "fileSize"},
        fileInfo :          {type: String , trim: true, required :false, default: "fileInfo"},
        resourceLink :      {type: String , trim: true, required :false, default: "resourceLink"},

        teacherResponse :   {type: String , trim: true, required :false, default: "teacherResponse"},
        teacherMessage :    {type: String , trim: true, required :false, default: "teacherMessage"},
        
        state    :          {type: String , trim: true, required :false, default: "state"},
    },{timestamps: true}
);
const deliveredHWs = mongoose.model( "DeliveredHWs" , deliveredHWSchema);



module.exports = {
    deliveredHWs
}