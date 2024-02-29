const express = require("express");
const uploadManyRouter = express.Router();
const multer = require("multer");
const path = require("path");


//////////////// for many files upload  //////////////////////////////////

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

const uploadMany = multer({storage});

uploadManyRouter.post("/uploadManyfiles" , uploadMany.array("files") , (req , res)=>{
    
    res.status(200).json({
        msg:"files uploaded",
        filepaths: req.files.map(file => file.path)
    });

})

module.exports = {
    uploadManyRouter,
};



