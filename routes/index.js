import express from 'express';
const router=express.Router();
import { postAdminLoginController,postClassController,postTrainerController,postPriceController,postServiceController,
    postPostController,getPostController,getChooseUsController,getClassController,getServiceController,getPriceController,getAdminLoginController,
    verifyToken,
 } from '../controllers/index.js';

//post
router.post('/post',postPostController);
router.post('/classes',postClassController);
router.post('/service',postServiceController);
// router.post('/trainer',postTrainerController);
router.post('/price',postPriceController);
router.post('/adminSignUp',postAdminLoginController);
//get
router.get('/post',getPostController);
router.get('/chooseUs',getChooseUsController);
router.get('/classes',getClassController);
router.get('/service',getServiceController);
// router.get('/trainer',getTrainerController);
router.get('/price',getPriceController);
router.post('/adminLogin',getAdminLoginController);
export default router;