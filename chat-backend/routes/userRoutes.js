const express= require("express");
const { registerUser, authUser, allUser } = require("../controller/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router= express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(protect,allUser);

module.exports= router;