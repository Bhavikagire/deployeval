

const {Router} = require("express");
const {authorization} = require("../middlewear/authorization");

const{blog}= require("../models/blogmodel")

const blogRouter = Router();

blogRouter.get("/all",async(req,res)=>{
    try {
        const blogs = await blog.find();
        res.send({blogs})
    } catch (error) {
        res.send(error)
    }
})


blogRouter.post("/createblog",authorization(["user"]),
async (req,res)=>{
    try {
        const nblog = new blog(req.body);
        await nblog.save()
        res.send("blog added")

    } catch (error) {
        res.send(error)
    }
})

blogRouter.delete("/deleteblog/:blogId",
authorization(["Moderator"]))
async(req,res)=>{
    try {
       const{blogId} = req.params;
       const nblog = await blog.find({blogId})

       if(blog.userId === req.body.userId){
        res.send("blog deleted")
       }
       else{
        res.send("not authorized")
       }
    } catch (error) {
        res.send(error)
    }
}

module.exports = {blogRouter}