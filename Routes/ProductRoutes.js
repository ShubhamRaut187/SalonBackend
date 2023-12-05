const {Router} = require('express');
const {Productmodel} = require('../Models/Product.model');
const jwt = require('jsonwebtoken');

const productRouter = Router();




// Create Product
productRouter.post('/createproduct',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {Name,Category,Brand,MRP,Price,Description,Images} = req.body;
    if(!token){
        return res.status(401).send({"Message":"Please login to continue"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const New_product = new Productmodel({
                Name,
                Category,
                Brand,
                MRP,
                Price,
                Description,
                Images
            });
            await New_product.save();
            res.status(201).send({"Message":"Product added"});
        }
        else{
            res.send({"Message":"Please login to continue"});
        }
    })
})

productRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).send({"Message":"Please login to continue"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const products = await Productmodel.find({});
            res.status(200).send({"Products":products});
        }
        else{
            res.status(401).send({"Message":"Please login to continue"});
        }
    })
})


productRouter.get("/:id",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    
    if(!token){
        return res.status(401).send({"Message":"Please login to get product"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            // console.log(decoded);
            const product = await Productmodel.findOne({_id:id});
            res.status(200).send({"Products":product});
        }
        else{
            res.status(401).send({"Message":"Please login to continue"});
        }
    })
})

productRouter.patch('/updateproduct/:id',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    const data = req.body;
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const product = await Productmodel.findOneAndUpdate({_id:id},data,{new:true});
            res.status(200).send({
                "Message":"Product Updated Successfully!",
                "Product":product
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to update product"
            })
        }
    })
});

productRouter.delete('/deleteproduct/:id',async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    const {id} = req.params;
    if(!token){
        res.status(401).send({"Message":"Login to continue!"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            const product = await Productmodel.findOneAndDelete({_id:id});
            res.status(200).send({
                "Message":"Product Deleted Successfully!",
                "Product":product
            })
        }
        else{
            res.status(401).send({
                "Message":"Login to delete product"
            })
        }
    })
})

module.exports = {
    productRouter
}