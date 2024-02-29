const {studentAdmins,validateRegisterStdAdminInfo} = require("../models/adminUser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

/**
 * USE this function  (super admin and manager )
 * عند اضافة ادمن جديد نجعل حالة نشاطه (غير نشط) وعند تسجيل الدخول نجعله نشط لكي لايدخل اكثر من واحد بنفس الحساب
 * 
 */
 
const registerAdmin = asyncHandler(async (req,res) => {
    // const {error} = validateRegisterStdAdminInfo(req.body);
    // if(error){    
    //     return res.status(400).json({ message:error.details[0].message });
    // }

    let admin = await studentAdmins.findOne({email:req.body.email});
    if(admin){
        return res.status(400).json({ message:"This admin already exists!" });
    }

    // const salt = await bcrypt.genSalt(10);
    // req.body.password = await bcrypt.hash(req.body.password , salt);

    admin = new studentAdmins(req.body);

    const result = await admin.save();

    // // Provide Token
    // const expirationDate = new Date('2023-12-01T00:00:00Z').getTime() / 1000; 
    // const token = jwt.sign(
    //     {
    //     id: admin._id,
    //     class: admin.class
    //     },
    //     "StdAdmins-SecretKey",
    //     { expiresIn: expirationDate }
    // );

    //const {password , ...other } = result._doc;
    
    //res.status(201).json({...other , token});
    res.status(201).json("success");
});

const insertStudentAdmins = asyncHandler(async (req, res) => {
    const studentAdminObjs = req.body;
    const studentAdminModels = studentAdminObjs.map((studentAdminObj) => new studentAdmins(studentAdminObj));
    const results = await studentAdmins.insertMany(studentAdminModels);
    //res.status(201).json(results);
    res.status(201).json("success");
  });

module.exports = {
    registerAdmin, insertStudentAdmins
};
