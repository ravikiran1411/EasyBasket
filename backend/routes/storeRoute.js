
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { createVendorAccount, updateStore } from '../controllers/stroreController.js'

const storeRouter = express.Router()

storeRouter.post('/createvendor',userAuth,createVendorAccount);
storeRouter.post('/update',userAuth,updateStore);

export default storeRouter;