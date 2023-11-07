const mongoose = require('mongoose');
const connection = mongoose.connect("mongodb+srv://WomensParadiseAdmin:WPSadmin123@cluster0.hc0ozvy.mongodb.net/WomensParadiseSalonDataBase");
module.exports = {
    connection
}