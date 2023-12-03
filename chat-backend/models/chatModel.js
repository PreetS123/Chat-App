const mongoose = require("mongoose");

const chatModel = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",//reference to user modal
  }],
  latestMessage:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Message",//reference to message modal
  },
  groupAdmin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",//reference to user modal
  }
},
{
    timestamps:true,
}
);

const Chat= mongoose.model("Chat",chatModel)
module.exports=Chat;

//chatName
// isGroupChat
// users
// latestMessage
// groupAdmin
