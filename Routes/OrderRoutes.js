const {Router} = require('express');
const {Ordermodel} = require('../Models/Order.model');
const {Usermodel} = require('../Models/User.model');
const jwt = require('jsonwebtoken');

const orderRouter = Router();

// Create Order;
orderRouter.post('/createorder',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {UserID,TotalBill,Products} = req.body;
    if(!token){
        return res.status(401).send({"Message":"Please login to continue"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const New_Order = new Ordermodel({
                UserID,
                TotalBill,
                Products
            });
            await New_Order.save();
            res.status(201).send({"Message":"Order Confirmed"});
        }
        else{
            res.send({"Message":"Please login to continue"});
        }
    })
})

orderRouter.get("/:id",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    
    if(!token){
        return res.status(401).send({"Message":"Please login to get appointments"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const orders = await Ordermodel.find({UserID:id});
            res.status(200).send({"Orders":orders});
        }
        else{
            res.status(401).send({"Message":"Please login to continue"});
        }
    })
})

module.exports = {
    orderRouter
}