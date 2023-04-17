
const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    blogtital:{type:String,require:true},
    owneremail:{type:String,require:true},
    description:{type:String,require:true},
   
})

const blog = mongoose.model("blog",blogSchema)

module.exports={blog};