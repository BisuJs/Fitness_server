import mongoose from 'mongoose';

const chooseUsSchema=new mongoose.Schema({
    clients:{type:Number},
    trainers:{type:Number},
    services:{type:Number},
    posts:{type:Number}
    // exprience:{type:Number},
    // branch:{type:Number}
});

const ChooseUs=mongoose.model('ChooseUs',chooseUsSchema);

export default ChooseUs;