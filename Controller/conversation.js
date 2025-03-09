const conversation = require('../Modals/conversation');
const ConversationModel = require('../Modals/conversation');


exports.addConversation = async(req,res)=>{
    try {
        let senderId = req.user._id;
         let {receiverId} = req.body;

         let newConversation = new ConversationModel({
            members:[senderId,receiverId]
         })
         await newConversation.save();
         res.status(200).json({
            message:"Added Successfully",
            conversation:newConversation
         })
    } catch (error) {  
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
}


exports.getConversation = async(req,res)=>{
    try {
        let loggedinId = req.user._id;
        let conversation = await ConversationModel.find({
            members:{$in:[loggedinId]}
        }).populate("members","-password")
        res.status(200).json({
            message:"Fetched Successfully",
            conversation
        })
    }  catch (error) { 
        console.log(error);
        res.status(500).json({error:"Server Error"})
    }
}