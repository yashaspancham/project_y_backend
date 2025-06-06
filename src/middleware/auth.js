const jwt=require("jsonwebtoken");

function authenticateToken (req,res,next){
    const authHeader=req.headers["authorization"];
    const token=authHeader?.split(" ")[1];

    if(!token) return res.status(401).json({message:"Token required"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token"})
    }
}

module.exports=authenticateToken;