const authorization = (role_array)=> async(
    req,res,next)=>{
    const userRole = req.body.role;
    if(role_array.includes(userRole)){
next();
    }
else{
    res.send("not authorizaed")
}
}

module.exports = {authorization}