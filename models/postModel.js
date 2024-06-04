import mongoose from 'mongoose';

const postSchema=new mongoose.Schema({
    title:{type:String,required:true},
    postBy:{type:String, required:true},
    description:{type:String},
    postStatus:{type:String},
    image:{type:String}
})

const Post=mongoose.model('Post',postSchema);
export default Post;