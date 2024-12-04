const jwt=require("jsonwebtoken");
const config =require("./config");

const checkToken=(req,res,next)=>{
    let token=req.headers["authorization"];
    console.log("token received",token);

    
    if(token){
        token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;
        jwt.verify(token,config.key,(err,decoded)=>{
            if(err){
                return res.status(401).json({
                    status:false,
                    msg:"token is invalid",               
             });
            }else{
                req.decoded=decoded;
                next();
            }
        });
    }else{
        return res.status(401).json({
            status:false,
            msg:"token is not provided",
        });
    }
    
};
module.exports={
    checkToken: checkToken,
}