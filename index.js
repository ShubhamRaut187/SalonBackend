// Modules
const express = require("express")
const connection = require("./Configuration/db");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Routes
const {authUserRouter} = require('./Routes/AuthenticationRoutes');
const {userRouter} = require('./Routes/UserRoutes')
const {productRouter} = require('./Routes/ProductRoutes')
const {orderRouter} = require('./Routes/OrderRoutes');
const {apponitmentRouter} = require('./Routes/AppointmentRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to backend server!");
});

app.use('/auth',authUserRouter);
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use('/order',orderRouter);
app.use('/appointment',apponitmentRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection;
        console.log("Connected to mongodb on port 8000");
    } catch (error) {
        console.log("Failed Error");
        console.log(error);
    }
 
})