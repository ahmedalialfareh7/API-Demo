const express = require("express");
const asyncHandler = require("express-async-handler");
const uploadRouter = express.Router();
const multer = require("multer");
const path = require("path");
const { slides } = require("../models/Slide");
//const { attendance } = require("../models/Attendance");
//const { scheduleFile } = require("../models/ScheduleFile");

/*
اولا نعرف اوبجكت من نوع ستورج يطلب المسار واسم الملف فنمررهم على شكل دوال
ثانيا نعطي المالتر هذا الاوبجكت ويصبح لدينا اوبجكت من مالتر يحمل المسار والاسم
ثالثا - هذا الاوبجكت من مالتر يعتبر مدل وير بحيث نضعه بعد المسار وهو سيتكلف بعملية استقبال الملف وحفظه في المسار
رابعا في جسم الراوت نرجع رد للمرسل بحالة العمليه  

*/

////////////////   for single file upload //////////////////
// http://localhost:8080/upload  + Body = form data , kye=file, value = file.extension 

const storage = multer.diskStorage({

    destination:function(req , file , cp){
        const filePath = "../../Resources/schedules"; //+ req.params.filePath; ///////////// check if correct
        cp( null , path.join(__dirname , filePath) );
    },

    filename:function(req , file , cp){
        const fileName = req.params.fileName;                ///////////// check if correct         
        cp( null ,new Date().toISOString().replace(/:/g,"-") + file.originalname );
    }

});

const upload = multer({storage});


/// عند رفع الملف نرسل الاسم والمسار مع الطلب في اوبجكت بارامز ويجب ان يكون المسار متوافق مع المجلدات في المشروع

uploadRouter.post("/" , upload.single("file") , (req , res)=>{
    
    // const productName = req.body.product_name;
    // const productDes = req.body.product_des;
    // const productPrice = req.body.product_price;
    // const productSection = req.body.product_section;
    // const productOfferPrice = req.body.product_offer_price;
    // const productOfferPercentage = req.body.product_offer_percentage;
    // console.log("Product Name: ", req.body.product_name);
    // console.log("Product Description: ", req.body.product_des);
    // console.log("Product Price: ", req.body.product_price);
    // console.log("Product Section: ", req.body.product_section);
    // console.log("Product Offer Price: ", req.body.product_offer_price);
    // console.log("Product Offer Percentage: ", req.body.product_offer_percentage);
    // هنا نستقبل نتيجة عملية الحفظ مباشره 
    
    res.status(200).json({
        msg:"file uploaded",
        filepath:req.file.path
    });

})






//////////////// for many files upload  //////////////////////////////////
// http://localhost:8080/upload/uploadManyfiles     + Body = form data , kye=files, value = file.extension 

const storage2 = multer.diskStorage({

    destination:function(req , file , cp){
        const filePath = "../../Resources/schedules"; //+ req.params.filePath; ///////////// check if correct
        cp( null , path.join(__dirname , filePath) );
    },

    filename:function(req , file , cp){
        const fileName = req.params.fileName;                ///////////// check if correct         
        cp( null , file.originalname );
    }

});

const uploadMany = multer({storage : storage2});

// uploadRouter.post("/uploadManyfiles" , uploadMany.array("files") , (req , res)=>{
    
    
//     res.status(200).json({
//         msg:"files uploaded",
//         filepaths: req.files.map(file => file.path)
//     });

// })

uploadRouter.post("/uploadManyfiles" , uploadMany.array("files") , asyncHandler(async (req , res)=>{
    
    // Update imgVersion in all documents
    await scheduleFile.updateMany({}, { $inc: { imgVersion: 1 } });
    
    res.status(200).json({
        msg:"files uploaded",
        filepaths: req.files.map(file => file.path)
    });

}));




//////////////// for Slides upload  //////////////////////////////////
// http://localhost:8080/upload/uploadSlide     + Body = form data , kye=file, value = file.extension 

const slidesStorage = multer.diskStorage({

    destination:function(req , file , cp){
        //const filePath = "../../Resources/Subjects/"+ req.body.subjects + "/Slides"; 
        const filePath = "../../Resources/ClassesFolder/"+ req.body.classID +"/Subjects/"+ req.body.subjects+"/Slides";
        cp( null , path.join(__dirname , filePath) );
    },

    filename:function(req , file , cp){
        const fileName = req.body.slideName; 
        cp( null , file.originalname );
    }

});

const uploadSlide = multer({storage : slidesStorage});

uploadRouter.post("/uploadSlide" , uploadSlide.single("file") , asyncHandler(async (req , res)=>{
     
    // Insert slide
    const slideObj = {
        slideName: req.file.originalname,
        subjects: req.body.subjects,
        size: req.body.size,
        pagesNumber: req.body.pagesNumber,
        description: req.body.description,
        pdfPath: req.body.pdfPath
    };
    const slideModel = new slides(slideObj);

    const result = await slideModel.save();

    res.status(200).json({
        msg:"file uploaded",
        filepath:req.file.path,
        slide: result
    });

}));





//////////////// for Attendance Excel upload  //////////////////////////////////
// http://localhost:8080/upload/uploadAttendanceExcel     + Body = form data , kye=file, value = file.extension 


const attendanceExcelStorage = multer.diskStorage({

    destination:function(req , file , cp){
        //const filePath = "../../Resources/Subjects/"+ req.body.subjects + "/Attendances"; 
        //const filePath = "../../Resources/AttendanceFiles/"+req.body.classID+"/"+ req.body.subject; 
        const filePath = "../../Resources/ClassesFolder/"+req.body.classID+"/Subjects/"+ req.body.subject+"/Attendances";
        cp( null , path.join(__dirname , filePath) );
    },

    filename:function(req , file , cp){
        const fileName = req.body.fileName; 
        cp( null , file.originalname );
    }

});

const uploadAttendanceExcel = multer({storage : attendanceExcelStorage});

uploadRouter.post("/uploadAttendanceExcel" , uploadAttendanceExcel.single("file") , asyncHandler(async (req , res)=>{
     
    // Insert Excel file
    const attendanceObj = {
        subject:    req.body.subject,
        class :     req.body.classID,
        teacher :   req.body.teacherID,
        fileName:   req.file.originalname,
        group:      req.body.group,
        insertedBy: req.body.insertedBy,
        updatedBy:  req.body.updatedBy,
        version:    req.body.version,
        studentsNumber : req.body.studentsNumber,
        lec1:       req.body.lec1,    
        lec2:       req.body.lec2,  
        lec3:       req.body.lec3,
        lec4:       req.body.lec4,
        lec5:       req.body.lec5,
        lec6:       req.body.lec6,
        lec7:       req.body.lec7,
        lec8:       req.body.lec8,
        lec9:       req.body.lec9,
        lec10:      req.body.lec10,
        lec11:      req.body.lec11,
        lec12:      req.body.lec12,
        lastLectureAttendanced: req.body.lastLectureAttendanced,
        stateDesc: req.body.stateDesc
    };
    const attendanceModel = new attendance(attendanceObj);

    const result = await attendanceModel.save();

    res.status(200).json({
        msg:"file uploaded",
        filepath:req.file.path,
        excelFile: result
    });

}));




//////////////// for Shedule File upload  //////////////////////////////////
// http://localhost:8080/upload/uploadAttendanceExcel     + Body = form data , kye=file, value = file.extension 


const scheduleFileStorage = multer.diskStorage({

    destination:function(req , file , cp){ 
        
        //const filePath = "../../Resources/ClassesFolder/"+req.body.classID+"/schedule";
        const filePath = "../../Resources/schedules";
        cp( null , path.join(__dirname , filePath) );
    },

    filename:function(req , file , cp){
        const fileName = req.body.fileName; 
        cp( null , file.originalname );
    }

});

const uploadScheduleFile = multer({storage : scheduleFileStorage});

uploadRouter.post("/uploadScheduleFile" , uploadScheduleFile.single("file") , asyncHandler(async (req , res)=>{
     

    // Update imgVersion for a specific ScheduleFile by ID
    const classID = req.body.classID; 
    const fileName = req.body.fileName; 
    const scheduleFileObjectID = req.body.scheduleFileObjectID; 

    await scheduleFile.findByIdAndUpdate(scheduleFileObjectID, { $inc: { imgVersion: 1 } });


    res.status(200).json({
        msg:"file uploaded",
        filepath:req.file.path
    });

}));

module.exports = {
    uploadRouter,
};



