const express= require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat } = require("../controller/chatControllers");

const chatRouter= express.Router();

chatRouter.route('/').post(protect,accessChat);
// router.route('/').get(protect,fetchChats);
// router.route('/group').post(protect,createGroupChats);
// router.route('/rename').put(protect,renameGroup);
// router.route('/groupremove').put(protect,removeFromGroup);
// router.route('/groupadd').put(protect,addToGroup);



module.exports={chatRouter};