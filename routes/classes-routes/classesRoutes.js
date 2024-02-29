const express = require("express");
const classesRouter = express.Router();

// نعمل امبورت للكنرولر لكي ناخذ منه الدوال المناسبه لكل رابط
const {insertClass,insertClasses, updateClass,deleteClass,deleteAllClasses} = require("../../controllers/classes-controllers/insertClass");
const {getAllClasses} = require("../../controllers/classes-controllers/getClasses");


classesRouter.post("/insertClass" ,insertClass );
classesRouter.post("/insertClasses" ,insertClasses );
classesRouter.put("/updateClass" ,updateClass );
classesRouter.delete("/deleteClass" ,deleteClass );
classesRouter.post("/deleteAllClasses" ,deleteAllClasses );

classesRouter.get("/getAllClasses", getAllClasses);


module.exports = {
    classesRouter
}