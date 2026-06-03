
import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import upload from '../middleware/multer.js'
import { addProduct, addReview, adminRemoveProduct, allVendorProducts, listProduct, nearbyProducts, removeProduct, singleProduct, updateVendarProducts } from '../controllers/productController.js'
import userAuth from '../middleware/userAuth.js'
import vendarAuth from '../middleware/vendarAuth.js'

const productRouter = express.Router()

productRouter.post('/add',userAuth,vendarAuth,upload.fields([{name:"image1",maxCount:1},{name:"image2",maxCount:1},{name:"image3",maxCount:1},{name:"image4",maxCount:1}]),addProduct)

productRouter.post('/remove',userAuth,vendarAuth,removeProduct) 

productRouter.post('/admin/remove',adminAuth,adminRemoveProduct) 

productRouter.post('/list',listProduct)

productRouter.post('/update',userAuth,vendarAuth,updateVendarProducts)

productRouter.post('/singleproduct',singleProduct) 

productRouter.post('/allvendorproducts',userAuth,vendarAuth,allVendorProducts) 

productRouter.post('/addreview',userAuth,addReview) 

productRouter.post('/nearbyproducts',nearbyProducts) 

export default productRouter; 