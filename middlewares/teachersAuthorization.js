const jwt = require("jsonwebtoken");

function verifyTeacherToken(req , res , next){

    const token = req.headers.token;
    if(token){
        try{
            const decodedPayload = jwt.verify(token , "Teachers-SecretKey");  ////////////  secretKey
            req.decodedPayload = decodedPayload;              /////////  ناخذ الملومات من التوكن ونحفظها في متغير جديد في الريك
            next();
        }catch(error){
            res.status(401).json({message:" Invalid Token"});
        }
    }else{
        res.status(401).json({message:" there is not token"});
    }


}

module.exports = {
    verifyTeacherToken,
    
}