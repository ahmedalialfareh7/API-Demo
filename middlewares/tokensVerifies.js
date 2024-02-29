const jwt = require("jsonwebtoken");


function verifyToken(req , res , next){

    const token = req.headers.token;
    if(token){
        
        try{
            const decodedPayload = jwt.verify(token , "secretKey");  ////////////  secretKey
            req.decodedPayload = decodedPayload;              /////////  ناخذ الملومات من التوكن ونحفظها في متغير جديد في الريك
            next();
        }catch(error){
            res.status(401).json({message:" Invalid Token"});
        }

    }else{
        res.status(401).json({message:" there is not token"});
    }


}


function adminAuthorization(req , res , next){

    verifyToken(req , res , ()=>{
        if(req.decodedPayload.stateDescription === "admin" && req.decodedPayload.id === req.params.id ){
            next();
        }else{
            res.status(401).json({message:" you are not allowed...! only admins "});
        }
    })

}

