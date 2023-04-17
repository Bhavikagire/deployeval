const jwt = require("jsonwebtoken")

const fs = require("fs")

const authenticationdone = async(req,res,next)=>{
    try {
        const token = req?.headers?.authentication?.split(" ")[1];

        if(!token){
            return res.send("login again")
        }

        const blacklistdata = JSON.parse(
            fs.readFileSync
        )
   
        ("./blacklist.json","utf-8")
    

    const blcklistedtoken = blacklistdata.find((b_token)=> b_token == token)

    if(blcklistedtoken){
        res.send("login again")
    }

    const istokenvalid = await jwt.verify(token,"bhavika")

    if(!istokenvalid){
        res.send("failed")
    }

    req.body.userId = istokenvalid.userId;
    req.body.email = istokenvalid.email,
    req.body.role = istokenvalid.role,
    next()

} catch (error) {
    res.send(error)
}
}

module.exports = {authenticationdone}