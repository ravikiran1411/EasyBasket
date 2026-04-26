
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { addCart, cartUpdate, getCartData } from '../controllers/cartController.js'

const cartRouter = express.Router()

cartRouter.post('/addcart',userAuth,addCart)

cartRouter.post('/updatecart',userAuth,cartUpdate)

cartRouter.post('/getcart',userAuth,getCartData)

export default cartRouter;