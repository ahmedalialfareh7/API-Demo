const mongoose = require("mongoose");
const Joi = require("joi");

const classSchema = new mongoose.Schema(

    {
        //classID:            {type: String , trim: true , required :true ,},
        className:          {type: String , trim: true , minlength:3 , maxlength : 30 ,required :true ,},
        subjects :          [ {type : mongoose.Schema.Types.ObjectId, ref:"cs_1_am_subjects" } ],   //for teachers
        students :          [ {type : mongoose.Schema.Types.ObjectId, ref:"students" } ],           //for teachers and admins
        adminStudents :     [ {type : mongoose.Schema.Types.ObjectId, ref:"studentAdmins" } ],      //for teachers
        schedules :         [ {type : mongoose.Schema.Types.ObjectId, ref:"Schedule" } ],           //for all
        news :              [ {type : mongoose.Schema.Types.ObjectId, ref:"News" } ],
        //department :        {type: String , trim: true ,required: true , maxlength:7},
        //studyingSystem :    {type: String , trim: true ,required: true , maxlength:7},
        //yearAndLevel :      {type: String , trim: true ,required: true , maxlength:7},
        stateDescription :  {type: String , trim: true,default: "description"}

    },{ timestamp:true  }
);

const classes = mongoose.model( "classes" , classSchema);

module.exports = {
    classes
}