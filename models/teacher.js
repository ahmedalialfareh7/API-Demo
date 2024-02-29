const mongoose = require("mongoose");
const Joi = require("joi");

const teacherSchema = new mongoose.Schema(

    {
        teacherName:        {type: String , trim: true , minlength:3 , maxlength : 30 ,required :true ,},
        password:           {type: String , trim: true ,required: true , minlength: 4  },
        email :             {type: String , trim: true ,required: false },
        phone :             {type: String , trim: true ,required: true },
        subjects :          [ {type : mongoose.Schema.Types.ObjectId ,required :false, ref:"cs_1_am_subjects" } ],
        isActive:           {type: Boolean , default:false},
        stateDescription :  {type: String , trim: true}
    },{ timestamp:true  }

);

const teachers = mongoose.model( "teachers" , teacherSchema);

module.exports = {
    teachers
}