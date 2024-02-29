const mongoose = require("mongoose");
const Joi = require("joi");


const slideSchema = new mongoose.Schema(
// todo -> add state
    {
        slideName:          { type: String , trim: true , minlength:2 , maxlength : 30 ,required :true ,},
        logoImg:            {type: String ,trim: true, default: "logoImg" }, //////// png or jpg //////////////////
        size :              {type: String , trim: true,default: "size" },
        pdfPath :           {type: String , trim: true ,default:"pdf link"},
        pagesNumber:        {type: String , trim: true ,default: "pagesNumber"},
        subjects :          {type : mongoose.Schema.Types.ObjectId ,required :true, ref:"cs_1_am_subjects" }, ////////////  Subject or cs_1_am_subjects /////
        description :       {type: String , trim: true ,default: "description"},

    },
    {
        timestamps: true
    }

);

const slides = mongoose.model( "slides" , slideSchema);


function validateSlideInfo( obj ){

    const schema = Joi.object(
        
        {
        slideName:Joi.string().trim().min(2).max(30).required(),
        logoImg:Joi.string().trim(),
        size:Joi.string().trim(),
        pagesNumber:Joi.string().trim(),
        pdfPath:Joi.string().trim(),
        subjects:Joi.string().required(),
        description:Joi.string().required(),
        }
        
    );

    return schema.validate(obj);
}

function validateUpdateSlideInfo( obj ){

    const schema = Joi.object(
        
        {
        slideName:Joi.string().trim().min(2).max(30),
        logoImg:Joi.string().trim(),
        size:Joi.string().trim(),
        pagesNumber:Joi.string().trim(),
        pdfPath:Joi.string().trim(),
        subjects:Joi.string(),
        description:Joi.string(),
        }
        
    );

    return schema.validate(obj);
}

module.exports = {
    slides,validateSlideInfo,validateUpdateSlideInfo
}
