const {Router} = require('express');
const {UserModel} = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authUserRouter = Router();

// User Sigup Route
authUserRouter.post("/signup",async(req,res)=>{
    let {Name,Email,Mobile,Password,Address} = req.body;
    const HashedPassword = bcrypt.hashSync(Password,8);
    const New_User = new UserModel({
        Name,
        Email,
        Mobile,
        Password:HashedPassword,
        Address
    });
    await New_User.save();
    res.send({"Message":"You Have Succesfully Created Your Account. Please Login"})
})

// User Login Route
authUserRouter.post("/login",async(req,res)=>{
    let {Email,Password} = req.body;
    const User = await UserModel.findOne({Email});
    if(!User){
       return res.send({"Message":"You Have Not Registered, Please Sign Up"})
    }
    
        const hash = User.Password;
        const correct_password = bcrypt.compareSync(Password,hash);
        if(correct_password){
            const Token = jwt.sign({UserID:User._id},"UserToken");
         res.send({"user":User,"Message":"Welcome! Login Successful","token":Token});
        }
        else{
        res.send({"Message":"Failed to Login"});
        }

    
 })


module.exports = {
    authUserRouter
 }