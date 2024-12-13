import mongoose, { trusted } from "mongoose";
const Schema = new mongoose.Schema({
    title:{
        type:String,
        required:trusted
    },
    description:{
        type:String, 
        required:true
    },
    category:{
        type:String,
        required:true

    },
    author:{
        type:String,
        required:true
    },
    authorImg:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }


})

const BlogModel = mongoose.models.blog ||  mongoose.model('blog',Schema);

export default BlogModel;