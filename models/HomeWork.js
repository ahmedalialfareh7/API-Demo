const mongoose = require("mongoose");
const Joi = require("joi");


const homeWorkeSchema = new mongoose.Schema(
    {
        title:              { type: String , trim: true , minlength:2 , maxlength : 30 ,},
        description:        {type: String , trim: true},
        subject :           {type : mongoose.Schema.Types.ObjectId ,required :true, ref:"cs_1_am_subjects" },
        //teacher :           {type: mongoose.Schema.Types.ObjectId ,required :false, ref:"teachers" },
        teacher :           {type: String , trim: true, required :false, default: "teacher" },
        lectureNumber :     {type: String , trim: true, required :false, default: "lectureNumber"},
        degree :            {type: String , trim: true, required :false, default: "degree"},
        endDate :           {type: String , trim: true, required :false, default: "endDate"},
        fileName :          {type: String , trim: true, required :false, default: "fileName"},
        mimeType :          {type: String , trim: true, required :false, default: "mimeType"},
        fileLink :          {type: String , trim: true, required :false, default: "fileLink"},
        fileSize :          {type: String , trim: true, required :false, default: "fileSize"},
        fileInfo :          {type: String , trim: true, required :false, default: "fileInfo"},
        resourceLink :      {type: String , trim: true, required :false, default: "resourceLink"},
        state    :          {type: String , trim: true, required :false, default: "state"},
    },{timestamps: true}
);
const homeWorks = mongoose.model( "homeWorks" , homeWorkeSchema);


function validateHomeWorkInfo( obj ){

    const schema = Joi.object(
        
        {
        title:Joi.string().trim().min(2).max(30),
        description:Joi.string().trim(),
        subjects:Joi.string().required(),
        lectureNumber:Joi.string().trim(),
        imgpath:Joi.string().trim(),
        pdfpath:Joi.string().trim(),
        }
        
    );

    return schema.validate(obj);
}

function validateUpdateHomeWorkInfo( obj ){

    const schema = Joi.object(
        
        {
        title:Joi.string().trim().min(2).max(30),
        description:Joi.string().trim(),
        cs_1_am_subjects:Joi.string(),
        lectureNumber:Joi.string().trim(),
        imgpath:Joi.string().trim(),
        pdfpath:Joi.string().trim(),
        }
        
    );

    return schema.validate(obj);
}

module.exports = {
    homeWorks,
    validateHomeWorkInfo,
    validateUpdateHomeWorkInfo
}
