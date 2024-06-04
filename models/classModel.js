import mongoose,{Schema} from 'mongoose';

const classModelSchema=new mongoose.Schema({
    dayOfWeek:{type:String,required:true},
    startTime:{type:String},
    endTime:{type:String},
    category:{type:String,required:true}
},{
    timestamps:true
});
const ClassesModel=mongoose.model('Classes',classModelSchema);

export default ClassesModel;