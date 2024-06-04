import mongoose from 'mongoose';
const priceSchema=new mongoose.Schema({
    name:{type:String,required:true},
    duration:{type:Number,required:true},
    trainer:{type:Number,required:true},
    amountOfPeople:{
    type:Number,required:true
    },
    price:{type:Number,required:true}
})

const Price=mongoose.model('Price',priceSchema);
export default Price;