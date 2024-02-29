const mongoose = require("mongoose");
const Joi = require("joi");


const studentSchema = new mongoose.Schema(

    {
        studentID:          {type: String , trim: true , required :true ,},
        studenName:         {type: String , trim: true , minlength:3 , maxlength : 30 ,required :true ,},
        password:           {type: String , trim: true ,required: false , minlength: 4  },
        email :             {type: String , trim: true ,required: false , unique:false ,default:"ss@gg.com" },
        class :             {type: mongoose.Schema.Types.ObjectId ,required :true, ref:"classes" },
        attendance :        [{type: mongoose.Schema.Types.ObjectId ,required :false, ref:"Attendance" }],
        //department :        {type: String , trim: true ,required: false , maxlength:7},
        //studyingSystem :    {type: String , trim: true ,required: false , maxlength:7},
        //yearAndLevel :      {type: String , trim: true ,required: false , maxlength:7},
        //group :             {type: String , trim: true , maxlength:7},
        isAdmin:            {type: Boolean , default:false},
        isActive:           {type: Boolean , default:false},
        //token :             {type: String , trim: true},
        stateDescription :  {type: String , trim: true ,default:"Signout" }

    },
    {
        timestamp:true
    }

);

const students = mongoose.model( "students" , studentSchema);


function validateRegisterStudentInfo( obj ){

    const schema = Joi.object(
        
        {
            studentID:          Joi.string().trim().required(),
            studenName:         Joi.string().trim().min(3).max(30).required(),
            password:           Joi.string().trim().min(4).required(),
            email:              Joi.string().trim().required(),
            class:              Joi.string().required(),
            attendance:         Joi.string().optional(),
            department:         Joi.string().trim().required().max(7),
            studyingSystem:     Joi.string().trim().required().max(7),
            yearAndLevel:       Joi.string().trim().required().max(7),
            group:              Joi.string().trim().max(7),
            isAdmin:            Joi.boolean(),
            isActive:           Joi.boolean(),
            token:              Joi.string().trim(),
            stateDescription:   Joi.string().trim(),
        }
        
    );

    return schema.validate(obj);
}

function validateLoginStudentinfo( obj ){

    const schema = Joi.object(
        
        {
            studentID:          Joi.string().trim().required(),
            studenName:         Joi.string().trim().min(3).max(30).required(),
            password:           Joi.string().trim().min(4).required(),
            email:              Joi.string().trim().required(),
            class:              Joi.string().required(),
            department:         Joi.string().trim().required().max(7),
            studyingSystem:     Joi.string().trim().required().max(7),
            yearAndLevel:       Joi.string().trim().required().max(7),
            group:              Joi.string().trim().max(7),
        }
        
    );

    return schema.validate(obj);
}

module.exports = {
    students,validateRegisterStudentInfo,validateLoginStudentinfo
}
