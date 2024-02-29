const express = require("express");
const downloadRouter = express.Router();



////عند طلب تنزيل ملف نرسل المسار مع الطلب 

downloadRouter.get("/:filePath" , (req , res)=>{
    
  const filePath = req.params.filePath;

  const directoryPath = __dirname + "/../../Resources/" + filePath;
    
  res.download(directoryPath);
    
    //   res.download(directoryPath, fileName, (err) => {
    //     if (err) {
    //       res.status(500).send({
    //         message: "Could not download the file. " + err,
    //       });
    //     }
    //   });
    
    // const filePath = req.params.filePath;     

    // res.attachment(directoryPath).send();

});


// download Schedule img from schedules directory
//http://localhost:8080/download/schedule/٢٠٢٣١١٢٥_١٠١٣٠٦.jpg
downloadRouter.get("/schedule/:classID/:filePath" , (req , res)=>{ 
    
    const classID = req.params.classID;
    const filePath = req.params.filePath;

    //const directoryPath = __dirname + "/../../Resources/ClassesFolder/" + classID + "/schedule/" + filePath;
    
    const directoryPath = __dirname + "/../../Resources/schedules/" + filePath;
    
    res.download(directoryPath);
    
});



// download Slide from Slides directory
//http://localhost:8080/download/slide/656de602955394abbdd8753b/file.pdf
downloadRouter.get("/slide/:classID/:subjectID/:filePath" , (req , res)=>{ 

    const filePath = req.params.filePath;
    const subjectID = req.params.subjectID;
    const classID = req.params.classID;

    //const directoryPath = __dirname + "/../../Resources/Subjects/" + subjectID + "/Slides/" + filePath;
    const directoryPath = __dirname + "/../../Resources/ClassesFolder/" + classID + "/Subjects/" + subjectID + "/Slides/" + filePath;
    res.download(directoryPath);
    
});


// when we download a file we get the IDs from req.params not req.body like uploading
// download attendance from attendance directory
//http://localhost:8080/download/attendanceExcel/6518849796d29415a8c84e0e/656e5038bb60ab3a5096441e/classes.xlsx
downloadRouter.get("/attendanceExcel/:classID/:subjectID/:filePath" , (req , res)=>{ 

    const classID = req.params.classID;
    const subjectID = req.params.subjectID;
    const filePath = req.params.filePath;

    //const directoryPath = __dirname + "/../../Resources/AttendanceFiles/" + classID + "/" + subjectID + "/" + filePath;
    const directoryPath = __dirname + "/../../Resources/ClassesFolder/" + classID + "/Subjects/" + subjectID + "/Attendances/" + filePath;
    
    res.download(directoryPath);
    
});

module.exports = {
    downloadRouter,
};