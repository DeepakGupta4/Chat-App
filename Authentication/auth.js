const userModel = require('../Modals/user')
const jwt = require('jsonwebtoken');


const auth = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
       return res.status(401).json({error:"No Token, authorization denied"})
    }
    try {
        const decode = jwt.verify(token,"its_my_secret_key");
        let loggedInUserId =  decode.userId;
        req.user = await userModel.findById(loggedInUserId).select("-password");
        next();
        
    } catch (error) {
        return res.status(401).json({error:"Token is not valid"});
    }
}

module.exports = auth;