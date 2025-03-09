const MessageModel = require('../Modals/message')

exports.sendMessage = async(req,res)=>{
    try {
        let {conversation, content} = req.body;
        let addMessage = new MessageModel({sender:req.user._id,conversation,message:content});
        await addMessage.save();
        let populatedMessage = await addMessage.populate("sender")
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Server Error"});
    }
}


exports.getMessage = async(req,res)=>{
    try {
        let {convId} = req.params;
        let message = await MessageModel.find({
            conversation:convId
        }).populate("sender")
        res.status(200).json({messages:"Fetched Message Successfully",message})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Server Error"});
    }
}