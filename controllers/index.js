import e, { response } from "express";
import AdminLogin from "../models/adminLoginModel.js";
import ChooseUs from "../models/chooseUsModel.js";
import Classes from '../models/classModel.js';
import Post from '../models/postModel.js';
import Price from '../models/priceModel.js';
import Service from '../models/serviceModel.js';
import Trainer from '../models/trainerModel.js';
import jwt from 'jsonwebtoken';
export const postAdminLoginController=async (req,res)=>{
    try {
        const JWTKey=process.env.JWTKEY;
        const {name,password}=req.body;
        console.log(name,password);
        if(!name && !password){
            return res.json({message:'Please provide the required credientails.'})
        }
        if(!name){
            return res.json({message:'Please provide name.'})
        }
        if(!password){
            return res.json({message:'Please provide password.'})
        }
        if (name && password){
            console.log('inside name and password valid')
            const checkData=await AdminLogin.find({name:name});
            if(name===checkData[0]?.name){
                return res.json({message:'The name is already exists. Please provide the unique name.'})
            }
            else{
                const data=new AdminLogin({name,password})
                const result =await data.save();
                delete result.password;
                console.log('result',result)
                console.log(result.password)
                if(result){
                    console.log('inside result')
                    jwt.sign({result},JWTKey,{expiresIn:'3h'},(err,token)=>{
                        console.log(err,'err')
                        console.log('hello')
                       if(err){
                        return res.json({message:'Something went wrong take some time.'})
                       }
                       return res.status(200).json({
                            success:'success',
                            message:'Successfully login',
                            result:result,
                            token:token
                    
                        }) 
                        
                    })
                    
                }
                
            }
        }
        
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
    
}
export const verifyToken=(req,res,next)=>{
    let token=req.headers['authorization'];
    if(token){
        token=token.split(' ')[1];
        jwt.verify(token,JWTKey,(err,valid)=>{
            if(err){
                res.json({message:'Please provide valid token'})
            }else{
                next()
            }
    })
    }
    else{
        res.json({message:'Please provide the token with in the headers.'})
    }

}
export const getAdminLoginController=async(req,res)=>{
    try {
        const JWTKey=process.env.JWTKEY;
        const {name,password}=req.body;
        console.log(name,password);
        if(!name && !password){
            return res.json({message:'Please provide the required credientails.'})
        }
        if(!name){
            return res.json({message:'Please provide name.'})
        }
        if(!password){
            return res.json({message:'Please provide password.'})
        }
        if(name && password){
            console.log('result get')
            const result=await AdminLogin.findOne({name,password}).select('-password');
console.log(result,'backresult')
            if(result){
                console.log('inside result')
                jwt.sign({result},JWTKey,{expiresIn:'3h'},(err,token)=>{
                   console.log(err,'err')
                   console.log('hello')
                   if(err){
                    return res.json({message:'Something went wrong take some time.'})
                   }else{
                    return res.status(200).json({
                        success:'success',
                        message:'Successfully login',
                        result,
                        token
                
                    }) 
                   }
                   
                    
                })
                
            }
        }
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
    

}
export const deleteAdminLoginController=async(req,res)=>{
    try {
        const {_id}=req.body;
        const data=await AdminLogin.deleteOne(id);
        res.status(200).json({
            success:'success',
            message:'Successfully deleted admin'
        })

    } catch (error) {
    res.status(500).json({
        success:'failed',
        error:error
    })    
    
}
}
// export const postChooseUsController=async(req,res)=>{
// try {
//     const body=req.body;
//     const data=new ChooseUs(body);
//     const result= await data.save();
//     res.status(200).json({
//         success:'success',
//         message:'Successfully added ChooseUs'
//     })
// } catch (error) {
//     res.status(500).json({
//         success:'failed',
//         error:error
//     })
// }
// }
export const getChooseUsController=async(req,res)=>{
    try {
        const clients=2;
        const trainers=3;
        const services=4;
        const posts=5;
        const data=await ChooseUs({clients,trainers,services,posts});
        const result=await data.save();
        res.status(200).json({
            success:'success',
            message:'Successfully fetch the Choose Us',
            result:result
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const postClassController=async(req,res)=>{
    try {
        const body=req.body;
        const data=new Classes(body);
        const result=await data.save();
        res.status(200).json({
            success:'success',
            message:'Successfully added Classes'
        })

    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const getClassController=async(req,res)=>{
    try {
        const data =await Classes.find();
        const result=await data;
        res.status(200).json({
            success:'success',
            message:'Successfully fetched Classes',
            result:result
        })
        
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const deleteClassController=async(req,res)=>{
    try {
        const _id=req.params;
        const data=await Classes.findByIdAndDelete(_id);
        res.status(200).json({
            success:'success',
            message:'Successfully delete class',

        })

    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const putClassController=async(req,res)=>{
    try {
        const _id=req.params;
        const singleClass=await Classes.findById(_id)
        const data=await Classes.findByIdAndUpdate(_id,{
            $set:{singleClass}
        },{new:true})
        res.status(200).json({
            success:'success',
            message:'Successfully updated class'
        })
        
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const postPostController=async(req,res)=>{
    try {
        const body=req.body;
        const data=new Post(body);
        const result=await data.save();
        res.status(200).json({
            success:'success',
            message:'Successfully added Posts'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        }
        )
    }
}
export const getPostController=async(req,res)=>{
    try {
        const data=await Post.find();
        const result=await data;
        res.status(200).json({
            success:'success',
            message:'Successfully fetch post',
            result:result
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const putPostController=async(req,res)=>{
    try {
        const _id=req.params;
        const post=await Post.findById(_id);
        const data=await Post.findByIdAndUpdate(_id,{
            $set:{post}
        })
        res.status(200).json({
            success:'success',
            message:'Successfully updated post'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}

export const deletePostController=async(req,res)=>{
    try {
        const _id=req.params;
        const data=await Post.findByIdAndDelete(_id)
        res.status(200).json({
            success:'success',
            message:'Successfully delete post'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })    }
}
export const postPriceController=async(req,res)=>{
    try {
        const body=req.body;
        const data=new Price(body);
        const result =await data.save();
        res.status(200).json({
            success:'success',
            message:'Successfully added Price'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const getPriceController=async(req,res)=>{
    try {
        const data = await Price.find();
        const result=await data;
        res.status(200).json({
            success:'success',
            message:'Successfully fetched price',
            result:result
        })

    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const putPriceController=async(req,res)=>{
    try {
        const _id=req.params;
        const price=await Price.findById(_id);
        const data=await Price.findByIdAndUpdate(_id,{$set:{price}},{new:true})
        res.status(200).json({
            success:'success',
            message:'Successfully updated price',

        })
    } catch (error) {
        res.status(500).json(
        {
            success:'failed',
            error:error
        }
        )
    }
}
export const deletePriceController=async(req,res)=>{
    try {
        const _id=req.params;
        const data= await Price.findByIdAndDelete(_id);
        res.status(200).json({
            success:'success',
            message:'Successfully delete price',

        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const postServiceController=async(req,res)=>{
    try {
        const body=req.body;
        const data=new Service(body);
        const result=await data.save();
        res.status(200).json({
            success:'success',
            mesage:'Successfully added service'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const getServiceController=async(req,res)=>{
    try {
        const data=Service.find();
        const result=await data;
        res.status(200).json({
            success:'success',
            message:'Successfully fetched service ',
            result:result
        })
        
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const putServiceContoller=async(req,res)=>{
    try {
        const _id=req.params;
        const service=await Service.findById(_id);
        const data=await Service.findByIdAndUpdate(_id,{
            $set:{service}
        },{new:true})
        res.status(200).json({
            success:'success',
            message:'Successfully update service'

        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const deleteServiceController=async(req,res)=>{
    try {
        const _id=req.params;
        const data=await Service.findByIdAndDelete(_id);
        res.status(200).json({
            success:'success',
            message:'Successfully delete service'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
export const postTrainerController=async(req,res)=>{
    try {
        const body=req.body;
        const data=new Trainer(body);
        const result=await data.save();
        res.status(200).json({
            success:'success',
            message:'Successfully added trainer'
        })
    } catch (error) {
        res.status(500).json({
            success:'failed',
            error:error
        })
    }
}
