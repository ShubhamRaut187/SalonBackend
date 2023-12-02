const mongoose = require("mongoose");

const userscheme = mongoose.Schema({
    Name:{type:String, required:true},
    Email:{type:String, required:true},
    Mobile:{type:Number, required:true},
    Password:{type:String, required:true},
    Address:{type:String, required:true},
    Gender:{type:String, default:"Female"},
    Role:{type:String, default:"User"}
})

const UserModel = mongoose.model("user",userscheme);

module.exports={
    UserModel
}