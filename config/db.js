
const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://bhavika:bhavika@cluster0.ucmbja4.mongodb.net/evalution2?retryWrites=true&w=majority")

module.exports={
    connection
}