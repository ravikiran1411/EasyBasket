
import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'
import { addProduct, addReview, allVendorProducts, listProduct, removeProduct, singleProduct } from '../controllers/productController.js'
import userAuth from '../middleware/userAuth.js'
import vendarAuth from '../middleware/vendarAuth.js'
import { updateStore } from '../controllers/stroreController.js'
const productRouter = express.Router()

productRouter.post('/add',userAuth,vendarAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)

productRouter.post('/remove',userAuth,vendarAuth,removeProduct) 

productRouter.post('/list',listProduct)

productRouter.post('/update',userAuth,vendarAuth,updateStore)

productRouter.post('/singleproduct',singleProduct) 

productRouter.post('/allvendorproducts',userAuth,vendarAuth,allVendorProducts)

productRouter.post('/addreview',userAuth,addReview)

export default productRouter; 