const mongoose = require("mongoose");
const Joi = require("joi");


const QuizeSchema = new mongoose.Schema(

    {
        question:       {type: String, required: true, trim: true},
        answers:        [{type: String, trim: true, required: true}],
        auther:         {type: String, trim: true , required: true, minlength:2 , maxlength : 30 },
        rightAnswer:    {type: String, default:"3",required: true, trim: true},
        description:    {type: String, default:"description",required: true, trim: true},
        title:          {type: String, default:"title",required: true, trim: true},
        subject:  {type : mongoose.Schema.Types.ObjectId ,required :true, ref:"cs_1_am_subjects" },

    },
    {
        timestamp:true
    }

);

const quizes = mongoose.model( "quizes" , QuizeSchema);


function validateQuizeInfo( obj ){

    const schema = Joi.object(
        
        {
        quistion:Joi.string().trim(),
        imgpath:Joi.string().trim(),
        description:Joi.string().trim().min(2),
        answer1:Joi.string().trim(),
        answer2:Joi.string().trim(),
        answer3:Joi.string().trim(),
        answer4:Joi.string().trim(),
        answer1Img:Joi.string().trim(),
        answer2Img:Joi.string().trim(),
        answer3Img:Joi.string().trim(),
        answer4Img:Joi.string().trim(),
        trueAnswer:Joi.string().trim(),
        auther:Joi.string().trim().min(2).max(30),
        cs_1_am_subjects:Joi.string().required(),
        }
        
    );

    return schema.validate(obj);
}

function validateUpdateQuizeInfo( obj ){

    const schema = Joi.object(
        
        {
        quistion:Joi.string().trim(),
        imgpath:Joi.string().trim(),
        description:Joi.string().trim().min(2),
        answer1:Joi.string().trim(),
        answer2:Joi.string().trim(),
        answer3:Joi.string().trim(),
        answer4:Joi.string().trim(),
        answer1Img:Joi.string().trim(),
        answer2Img:Joi.string().trim(),
        answer3Img:Joi.string().trim(),
        answer4Img:Joi.string().trim(),
        trueAnswer:Joi.string().trim(),
        auther:Joi.string().trim().min(2).max(30),
        cs_1_am_subjects:Joi.string(),
        }
        
    );

    return schema.validate(obj);
}
module.exports = {
    quizes,validateQuizeInfo,validateUpdateQuizeInfo
}
