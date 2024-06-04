import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import dbConnection from "./dbConfig/index.js";
import router from "./routes/index.js";
import errorMiddleware from '../server/middleware/errorMiddleware.js'
dotenv.config();

const app=express();
const PORT=process.env.PORT || 8000;
dbConnection();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({extended:true}));
app.use(router)
app.use(errorMiddleware)
app.listen(PORT,()=>{
    console.log('Server running of port'+PORT)
})
