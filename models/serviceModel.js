import mongoose,{Schema} from 'mongoose';
const serviceModelSchema=new mongoose.Schema({
    title:{type:String,required:true},
    slug:{
        type:String,
        unique:true
    },
    description:{type:String},
    img:{type:String},
    classes:[{type:Schema.Types.ObjectId,ref:'Classes'}],
    trainers:[{type:Schema.Types.ObjectId,ref:'Trainers'}]
},{
    timestamps:true
});
const Services =mongoose.model('Services',serviceModelSchema);
export default Services;