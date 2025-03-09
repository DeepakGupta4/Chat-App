const userModel = require('../Modals/user');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.register = async(req,res)=>{
    try {
        let {name,mobileNumber,password,profilePic,} = req.body;
        const isExist = await userModel.findOne({mobileNumber});
        if(isExist){
            return res.status(409).json({message:"Mobile Number Already use. Try with different number"})
        }

        let hashedPassword = await bcrypt.hash(password,10)
        // console.log(hashedPassword)

        const newUser = new userModel({name,mobileNumber,password:hashedPassword,profilePic});
        await newUser.save();

        res.status(200).json({message:"User registered Successfully",newUser})

    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    
    }
}

const cookieOptions = {
    httpOnly: true,
    secure: false, //Set to true in production
    sameSite: 'Lax'
};

exports.login = async(req,res)=>{
    try {
        const {mobileNumber,password}=req.body;
        const userExist = await userModel.findOne({mobileNumber});
        
        if(userExist && await bcrypt.compare(password,userExist.password)){

            const token = jwt.sign({userId:userExist._id},"its_my_secret_key")
            res.cookie("token",token,cookieOptions)

            res.status(200).json({message:"Login Successfully",
                user:userExist
            })
        }else{
            res.status(400).json({error:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
}


exports.searchMember =async (req,res)=>{
    try {
        let {queryParam} = req.query;
        const users = await userModel.find({
            $and:[
                {_id: {$ne:req.user._id}},
                {
                    $or:[
                        {name: {$regex: new RegExp(`^${queryParam}`, 'i')}},
                        {mobileNumber: {$regex: new RegExp(`^${queryParam}`, 'i')}}
                    ]
                }
            ]
        })
        res.status(201).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
}


exports.logout = async(req,res)=>{
    try {
        res.clearCookie('token',cookieOptions).json({message:'Logged out successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
}