const mongoose = require("mongoose");

const productsheme = mongoose.Schema({
   Name:String,
   Category:String,
   Brand:String,
   MRP:Number,
   Price:Number,
   Description:String
})

const Productmodel = mongoose.model("product",productsheme);

module.exports={
    Productmodel
}