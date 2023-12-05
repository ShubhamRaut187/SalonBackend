const mongoose = require('mongoose');

const orderscheme = mongoose.Schema({
    UserID:{
        type:String,
        required:true
    },
    TotalBill:{
        type:Number,
        required:true,
    },
    Products:{
        type:[],
        required:true,
        default:undefined
    }
})

const Ordermodel = mongoose.model('orders',orderscheme);

module.exports = {
    Ordermodel
}