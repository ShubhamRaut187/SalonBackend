const mongoose = require('mongoose');

const appointmentscheme = mongoose.Schema({
    UserID:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
    },
    Mobile:{
        type:Number,
        required:true
    },
    Date:{
        type:String,
        required:true
    },
    Time:{
        type:String,
        required:true
    },
    Salon:{
        type:String,
        required:true
    },
    Service:{
        type:String,
        required:true
    },
    Message:{
        type:String,
        default:'NA',
        required:true
    }

})

const Appointmentmodel = mongoose.model('appointments',appointmentscheme);

module.exports={
    Appointmentmodel
}