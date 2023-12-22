const mongoose= require("mongoose");

const messageModel= mongoose.Schema(
    {
     sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//reference to user modal
     },
     content:{
        type:String,
        trim:true
     },
     chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",//reference to chat modal
     }
    },
    {
        timestamps:true,
    }
)


const Message= mongoose.model("Message",messageModel);

module.exports=Message;


