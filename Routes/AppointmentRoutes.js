const {Router} = require('express');   
const {Appointmentmodel} = require('../Models/Appointments.model');
const jwt = require('jsonwebtoken');
const {UserModel} = require('../Models/User.model')
const apponitmentRouter = Router();

// Create Appointment
apponitmentRouter.post('/createappointment',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {Name,Email,Mobile,Date,Time,Salon,Service,Message} = req.body;
    if(!token){
        return res.status(401).send({"Message":"Please login to continue"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const UserID = decoded.UserID;
            // const User = await UserModel.findOne({_id:id});
            const New_Appointment = new Appointmentmodel({
                UserID,
                Name,
                Email,
                Mobile,
                Date,
                Time,
                Salon,
                Service,
                Message
            });
            await New_Appointment.save();
            res.status(201).send({"Message":"Appointment request received!"});
        }
        else{
            res.send({"Message":"Please login to continue"});
        }
    })
})

apponitmentRouter.get("/:id",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    
    if(!token){
        return res.status(401).send({"Message":"Please login to get appointments"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const appointments = await Appointmentmodel.find({UserID:id});
            res.status(200).send({"Appointments":appointments});
        }
        else{
            res.status(401).send({"Message":"Please login to continue"});
        }
    })
})
 

module.exports={
    apponitmentRouter
}