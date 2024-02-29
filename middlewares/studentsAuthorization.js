const { students, validateLoginStudentinfo } = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// function verifyStudentToken(req , res , next){

//     const token = req.headers.token;
//     if(token){
//         try{
//             const decodedPayload = jwt.verify(token , "Students-SecretKey");  ////////////  secretKey
//             req.decodedPayload = decodedPayload;              /////////  ناخذ الملومات من التوكن ونحفظها في متغير جديد في الريك
//             next();
//         }catch(error){
//             res.status(401).json({message:" Invalid Token"});
//         }
//     }else{
//         res.status(401).json({message:" there is not token"});
//     }

// }

const verifyStudentToken = asyncHandler(async (req, res, next) => {

    const token = req.headers.token;
    if(token){
        try{
            const decodedPayload = jwt.verify(token , "Students-SecretKey");  ////////////  secretKey
            req.decodedPayload = decodedPayload;              /////////  ناخذ الملومات من التوكن ونحفظها في متغير جديد في الريك
            
            //////// check the email if exist
            let user = await students.findOne({ _id: decodedPayload.id });
            if (!user) {
                console.error('Token Verification Error:', "User not found");
                return res.status(400).json({ error: "User not found." });
            }
            if (user.stateDescription === "Blocked") {
                return res.status(400).json({ error: "this Account is Blocked, please contact with admin to check the state." }); 
            } 
            else if (user.stateDescription === "Signout") {
                return res.status(400).json({ error: "this Account is Signed-out, please login again to your account." }); 
            }

            next();
        }catch(error){
            console.error('Token Verification Error:', error);
            res.status(401).json({error:" Invalid Token"});
        }
    }else{
        res.status(401).json({error:" there is not token"});
    }

});

module.exports = {
    verifyStudentToken,
    
}
