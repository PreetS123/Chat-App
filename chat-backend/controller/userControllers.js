const asyncHandler= require("express-async-handler");
const User= require("../models/userModel");
const generateToken=require("../config/generateToken");

const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,pic}=req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExist= await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User already exists");
    }

    const user= await User.create({
        name,
        email,
        password,
        pic
    });

    if(user){
        res.status(201).json({
            token:generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error("Failed to create new user");
    }

});

module.exports={registerUser};