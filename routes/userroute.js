
const {Router} = require("express");
const{user} = require("../models/usermodel")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { decode } = require("querystring");

const userRouter = Router()

userRouter.post("/signup",async(req,res)=>{
    // res.send("working")
    try {
        const{email,password,name,role}=req.body;
        const userexist = await user.findOne({email})

        if(userexist){
            return res.send("this email is already registerd please log in")
        }

        const hash = await bcrypt.hashSync(password,5)

        const newuser = new user({name,email,password:hash,role})

        await newuser.save();
        res.send("sigup succesfull")
    } catch (error) {
        res.send(error)
        
    }
});


userRouter.post("/login",async(req,res)=>{
    try {
        
        const{email,password}=req.body;

        const userexist = await user.findOne({email});

        if(!userexist) return 
        res.send("you have to register first please go to signup");
        // console.log("signup console")

        const passwordmatch = await bcrypt.compareSync(
            password,
            userexist.password
        );


        // Accesssecret = "bhavika"
        // Refreshsecret = "refreshb"


        if(!passwordmatch)
        return res.send("please put correct password")

        const token = await jwt.sign({email,useId:userexist._id,role:userexist.role},"bhavika",{expiresIn:"1m"}
            );

            const refreshtoken = await jwt.sign({email,useId:userexist._id},"refreshb",{expiresIn:"3m"})

            res.send({"msg":"Login success",token,refreshtoken})


    } catch (error) {
        res.send(error)
    }
})

userRouter.get("/getnewtoken",(req,res)=>{
    const refreshtoken = req.headers.authorization.split(" ")[1];

    if(!refreshtoken) return res.send("go to login");

    jwt.verify(refreshtoken,"refreshb",(err,decoded)=>{
        if(err)
        return res.send("login again")
        else{
            const token = jwt.sign(
                {userId:decoded.userId,email:decoded.email},
                "bhavika",
                {expiresIn:"1m"}
            );
            res.send({"msg":"login succes",token})
        }
    })

})


userRouter.get("/logout",(req,res)=>{
    try {
        
        const tone = req?.headers?.authorization?.split(" ")[1];

        const blacklistdata = JSON.parse(
            fs.readFileSync("./blacklist.json","utf-8")
        );
        blacklistdata.push(token)

        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistdata));

        res.send("logout success")
    } catch (error) {
        res.send(error)
    }
});







module.exports = {userRouter}