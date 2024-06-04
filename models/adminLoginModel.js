import mongoose from 'mongoose';

const adminLoginSchema=new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true}
});

const AdminLogin=mongoose.model('AdminLogin',adminLoginSchema);

export default AdminLogin;