const express= require("express");
const { registerUser, authUser, allUser } = require("../controller/userControllers");

const router= express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(authUser);
router.route('/').get(allUser);

module.exports= router;