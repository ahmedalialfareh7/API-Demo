const mongoose = require("mongoose");
const Joi = require("joi");


const subjectSchema = new mongoose.Schema(

    {
        ///////////////////////////
        //    video field
        ///////////////////////////
        subjectName:        {type: String , trim: true , minlength:2 , maxlength : 30 ,required :true ,},
        isPractice:         {type: Boolean , default:false},
        
        class :             {type: mongoose.Schema.Types.ObjectId ,required :true, ref:"classes" } ,
        teacher :           {type: mongoose.Schema.Types.ObjectId ,required :false, ref:"teachers" },
        
        //homeworks :         [ {type : mongoose.Schema.Types.ObjectId , ref:"cs_1_am_homeWorks" }]    ,
        //slides :            [ {type : mongoose.Schema.Types.ObjectId , ref:"cs_1_am_slides" }   ]    ,
        //projects :          [ {type : mongoose.Schema.Types.ObjectId , ref:"cs_1_am_projects" } ]    ,
        //quizes :            [ {type : mongoose.Schema.Types.ObjectId , ref:"cs_1_am_quizes" }   ]    ,
        //attendance :        [ {type : mongoose.Schema.Types.ObjectId , ref:"Attendance" }],

        description :       {type: String , trim: true , default: "description"},
        logoImg:            {type: String ,trim: true, default: "default-avatar.png" }, //////// png or jpg /////////


    },
    {
        timestamps: true
    }

);

const cs_1_am_subjects = mongoose.model( "cs_1_am_subjects" , subjectSchema);


function validateSubjectInfo( obj ){

    const schema = Joi.object(
        
        {
        ///////////////////////////////////
        //    video field
        ///////////////////////////////////
        subjectName:    Joi.string().trim().min(2).max(30).required(),
        isPractice:     Joi.bool(),

        class:          Joi.string().optional(),
        teacher:        Joi.string().optional(),
        homeworks:      Joi.array().items(Joi.string()).optional(),
        slides:         Joi.array().items(Joi.string()).optional(),
        projects:       Joi.array().items(Joi.string()).optional(),
        quizes:         Joi.array().items(Joi.string()).optional(),

        yearAndLevel:   Joi.string().trim().required().max(7),
        description:    Joi.string().trim(),
        logoImg:        Joi.string().trim(),   /////////////////  is it correct  //////////////
        doctor:         Joi.string().trim().min(2).max(30),

        //referenceBook:Joi.string(),
        // summaries:   Joi.string(),
        // preExams:    Joi.string(),
        }
        
    );

    return schema.validate(obj);
}





/// دالة التحقق اثناء تعديل ملف - نفس العمل لدالة التحقق السابقه ولكن بدون الحقل(ريكواير)لانه ليس ضروري اثنا التعديل

function validateUpdateSubjectInfo( obj ){

    const schema = Joi.object(
        
        {
        ///////////////////////////////////
        //    video field
        ///////////////////////////////////
        subjectName:    Joi.string().trim().min(2).max(30),
        isPractice:     Joi.bool(),

        class:          Joi.string().optional(),
        teacher:        Joi.string().optional(),
        homeworks:      Joi.array().items(Joi.string()).optional(),
        slides:         Joi.array().items(Joi.string()).optional(),
        projects:       Joi.array().items(Joi.string()).optional(),
        quizes:         Joi.array().items(Joi.string()).optional(),

        yearAndLevel:   Joi.string().trim().max(7),
        description:    Joi.string().trim(),
        logoImg:        Joi.string().trim(),   /////////////////  is it correct  //////////////
        doctor:         Joi.string().trim().min(2).max(30),
        }
        
    );

    return schema.validate(obj);
}

module.exports = {
    cs_1_am_subjects,validateSubjectInfo,validateUpdateSubjectInfo
}
