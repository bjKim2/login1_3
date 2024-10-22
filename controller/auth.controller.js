const authController = {};
const jwt = require('jsonwebtoken');
require('dotenv').config();

authController.authenticate = async (req,res,next) => {
    try{
        const tokenString = req.headers.authorization // Bearer token
        if (!tokenString){
            throw new Error("invalid token");
        }
        const token = tokenString.replace("Bearer ","");
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err,payload)=>{
            if(err){
                throw new Error("invalid token");
            }
            req.userId = payload._id;
            next();
            // res.status(200).json({status:"success",data:payload._id});
        });
        
    }catch(error){
        res.status(400).json({status:"fail",message : error.message});
    }

}

module.exports = authController;