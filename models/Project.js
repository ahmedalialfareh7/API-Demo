const mongoose = require("mongoose");
const Joi = require("joi");


const projectSchema = new mongoose.Schema(

    {
        title:              {type: String , trim: true , minlength:2 , maxlength : 30},
        description:        {type: String , trim: true, required :false, default: "description"},
        endDate:            {type: String , trim: true, required :false, default: "endDate"},   //////////////////  type date /////////////////
        subjects :          {type : mongoose.Schema.Types.ObjectId ,required :true, ref:"cs_1_am_subjects" },
        teacher :           {type: mongoose.Schema.Types.ObjectId ,required :false, ref:"teachers" },
        degree  :           {type: String , trim: true, required :false, default: "degree"},
        conditions   :      {type: String , trim: true, required :false, default: "conditions"},
        requirements :      {type: String , trim: true, required :false, default: "requirements"},
        fileName :          {type: String , trim: true, required :false, default: "fileName"},
        filePath :          {type: String , trim: true, required :false, default: "filePath"},
        state    :          {type: String , trim: true, required :false, default: "state"},

    },
    {
        timestamps: true
    }

);

const projects = mongoose.model( "projects" , projectSchema);


function validateProjectInfo( obj ){

    const schema = Joi.object(
        
        {
        title:Joi.string().trim().min(2).max(30),
        description:Joi.string().trim(),
        endDate:Joi.string().trim(),         /////////////   type date //////////////////////////
        subjects:Joi.string().required(),
        imgpath:Joi.string().trim(),
        pdfpath:Joi.string().trim(),
        }
        
    );

    return schema.validate(obj);
}

function validateUpdateProjectInfo( obj ){

    const schema = Joi.object(
        
        {
        title:Joi.string().trim().min(2).max(30),
        description:Joi.string().trim(),
        endDate:Joi.string().trim(),         /////////////   type date //////////////////////////
        subjects:Joi.string(),
        imgpath:Joi.string().trim(),
        pdfpath:Joi.string().trim(),
        }
        
    );

    return schema.validate(obj);
}

module.exports = {
    projects,validateProjectInfo,validateUpdateProjectInfo
}
