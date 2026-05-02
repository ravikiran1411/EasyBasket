
import express from 'express'
import userAuth from '../middleware/userAuth.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.post('/getprofile',userAuth,getProfile)

profileRouter.post('/update',userAuth,updateProfile)

export default profileRouter;