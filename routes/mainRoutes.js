//نعمل امبورت للاكسبرس وناخذ منه الراوتر لكي يتعرف في ملف المين على الروابط التي سنعرفها للدوال 
const express = require("express");
const router = express.Router();

// نعمل امبورت للكنرولر لكي ناخذ منه الدوال المناسبه لكل رابط
//const {insertResource} = require("../controllers/insertResource");
//const {getAllResourcesWhenStart} = require("../controllers/getResources");
//const {updateResource} = require("../controllers/updateResources");
const {registerUser ,insertStudents,blockUser,unblockUser} = require("../middlewares/registerUser");
const {loginUser,LogoutUser} = require("../middlewares/loginUser");
//const {registerAdmin , insertStudentAdmins} = require("../middlewares/registerAdmin");
//const {loginAdmin} = require("../middlewares/loginAdmin");

//router.post("/insertStudentAdmins" , insertStudentAdmins )  //insert list of students admins
router.post("/insertStudents" , insertStudents )            //insert list of students


router.post("/register" , registerUser ) // Register Student
router.post("/blockUser" , blockUser ) // blockUser Student
router.post("/unblockUser" , unblockUser ) // unblockUser Student

router.get("/login" , loginUser ) // Login Student
router.post("/LogoutUser" , LogoutUser ) // Login Student

//router.post("/registerAdmin" , registerAdmin ) // Register StudentAdmin
//router.get("/loginAdmin" , loginAdmin ) // Login StudentAdmin


//router.post("/insertRes/:insertOperation" , insertResource )

//router.get("/getAllRes" ,getAllResourcesWhenStart );

//router.put('/updateRes/:id&:UpdateOperation' ,updateResource);

module.exports = {
    router,
}

