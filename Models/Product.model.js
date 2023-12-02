const mongoose = require("mongoose");

const productsheme = mongoose.Schema({
   Name:{
    type:String,
    required:true
   },
   Category:{
    type:String,
    required:true
   },
   Brand:{
    type:String,
    required:true
   },
   MRP:{
    type:Number,
    required:true
   },
   Price:{
    type:Number,
    required:true
   },
   Description:{
    type:String,
    required:true
   },
   Images:{
    type:[String],
    required:true,
    default:undefined
   }
})

const Productmodel = mongoose.model("products",productsheme);

module.exports={
    Productmodel
}