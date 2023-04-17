const express = require("express")
const {connection} = require("./config/db")

const {authenticationdone} = require("./middlewear/authentication")
 

const{userRouter}= require("./routes/userroute")
const jwt = require("jsonwebtoken")

const {user} = require("./models/usermodel")

const {authorization} = require("./middlewear/authorization")

const {blogRouter} = require("./routes/blog")

require("dotenv").config()
const port = process.env.PORT

const app = express()

app.use(express.json());

app.get("/",((req,res)=>{
    res.send("HOME PAGE")
}))


app.use("/user",userRouter)
app.listen(port,async()=>{
    try{
        await connection;
        console.log("connected to db")
    }
    catch(err){
console.log(err)
    }
    
    console.log("app is runnig at "+port)
})