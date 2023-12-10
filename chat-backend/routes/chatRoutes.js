const express= require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require("../controller/chatControllers");

const chatRouter= express.Router();

chatRouter.route('/').post(protect,accessChat);
chatRouter.route('/').get(protect,fetchChats);
chatRouter.route('/group').post(protect,createGroupChat);
chatRouter.route('/rename').put(protect,renameGroupChat);
chatRouter.route('/groupadd').put(protect,addToGroup);
chatRouter.route('/groupremove').put(protect,removeFromGroup);



module.exports={chatRouter};