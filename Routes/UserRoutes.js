const {Router} = require('express');
const {UserModel} = require('../Models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRouter = Router();


// Get All Users
userRouter.get('/',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const users = await UserModel.find({});
            res.status(200).send({
                "Users":users
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to get users"
            })
        }
    })
})

// Get Single User;
userRouter.get('/:id',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const user = await UserModel.find({_id:id});
            res.status(200).send({
                "User":user
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to get users"
            })
        }
    })
})

userRouter.patch('/updateuser/:id',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    const data = req.body;
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const user = await UserModel.findOneAndUpdate({_id:id},data,{new:true});
            res.status(200).send({
                "Message":"User Updated Successfully!",
                "User":user
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to update user"
            })
        }
    })
})

userRouter.delete('/removeuser/:id',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const user = await UserModel.findOneAndDelete({_id:id});
            res.status(200).send({
                "Message":"User Deleted Successfully!",
                "User":user
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to delete users"
            })
        }
    })
})

module.exports = {
    userRouter
}