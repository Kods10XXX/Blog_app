const express = require("express");
const User = require("../models/users.model");
const usersModel = require("../models/users.model");
const config = require("../config");
const jwt = require("jsonwebtoken");
const middleware=require("../middleware");


const router =express.Router();
router.route("/:username").get(middleware.checkToken,async (req,res)=>{
    try{
        const result= await User.findOne({username:req.params.username},);
        if(!result) return res.status(404).json({msg:"user not found"});
        return res.json({
            data:result,
            username: req.params.username,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal Server Error",error:err.message});
    }
    
});

router.route("/login").post(async(req,res)=>{
    try{
        const result =await User.findOne({username:req.body.username});
        if(result==null) return res.status(403).json({msg:"Either Username incorrect"});
        if(result.password===req.body.password){
            let token=jwt.sign({username:req.body.username},config.key, {
                expiresIn:"24h"//expirer dans 24h
            });
            res.json({
                token: token,
                msg: "success",
            });
        }else{
            res.status(403).json("password is incorrect");
        }
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"Internal Server Error",error:err.message});
    }
})

router.route("/register").post((req,res)=>{
    console.log("inside the register");
    const newUser=new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
    });
    newUser
        .save()
        .then(()=>{
            console.log("user registred");
            res.status(200).json("ok");
        })
        .catch((err)=>{
            res.status(403).json({
                msg:err
            });
        });

}); 
router.route("/update/:username").patch(middleware.checkToken,async(req,res)=>{
    try{
        const result=await User.findOneAndUpdate({
            username:req.params.username},
        {$set:{password:req.body.password}},
        {new: true}

        );
        if(!result) return res.status(404).json({msg:"User Not Found"});
        
        const msg={
                msg:"password successfully updated",
                username:req.params.username,
            };
            return res.json(msg);
    }catch(err){
            res.status(500).json({msg:err.message});
        }
    });
    
    
router.route("/delete/:username").delete(middleware.checkToken,async(req,res)=>{
    try{
        const result=await User.findOneAndDelete(
            {username:req.params.username});
            if(!result){
                 return res.status(404).json({msg:"User Not Found"});
            }
            return res.json({
                msg:"User Deleted Successfully",
                username:req.params.username,
            });
    
     }catch(err){
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
     }

});

module.exports=router;