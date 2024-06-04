import mongoose from 'mongoose';

const trainerSchema=new mongoose.Schema({
    name:{type:String,required:true},
    position:{type:String,required:true},
    img:{type:String},
    socialLinks:[{facebook:{type:String}},{twitter:{type:String}},
        {instagram:{type:String}}
    ],
    desc:{type:String}
});
const Trainers=mongoose.model('Trainers',trainerSchema);

export default Trainers;