// Modules
const express = require("express")
const connection = require("./db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Models
const {UserModel} = require("./User.model")
const {Productmodel} = require("./Product.model")





const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Basic Route");
})

// Signup Route
app.post("/signup",async(req,res)=>{
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
    res.send("You Have Succesfully Created Your Account. Please Login")
})

// Login
app.post("/login",async(req,res)=>{
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

// Product get
app.get("/products",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        return res.send({"Message":"Please login to continue"});
    }
    jwt.verify(token,"UserToken",async(error,decoded)=>{
        if(decoded){
            console.log(decoded);
            const products = await Productmodel.find({});
            res.send({products});
        }
        else{
            res.send({"Message":"Please login to continue"});
        }
    })
})

























app.listen(8000,async()=>{
    try {
        await connection;
        console.log("Connected to mongodb on port 8000");
    } catch (error) {
        console.log("Failed Error");
        console.log(error);
    }
 
})