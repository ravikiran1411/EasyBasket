
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { createVendorAccount, getMyStore, updateStore } from '../controllers/stroreController.js'
import vendarAuth from '../middleware/vendarAuth.js';

const storeRouter = express.Router()

storeRouter.post('/createvendor',userAuth,createVendorAccount);

storeRouter.post('/update',userAuth,updateStore);

storeRouter.get('/mystore',userAuth,vendarAuth,getMyStore)

export default storeRouter;