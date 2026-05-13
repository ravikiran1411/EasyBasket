
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import {allOrders, orderCOD, orderStripe, stripeWebhook, updateOrderStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post('/webhook',express.raw({type:'application/json'}),stripeWebhook)

orderRouter.post('/codorder',userAuth,orderCOD)

orderRouter.post('/userorders',userAuth,userOrders)

orderRouter.post('/allorders',adminAuth,allOrders)

orderRouter.post('/status',updateOrderStatus)

orderRouter.post('/stripe',userAuth,orderStripe)

export default orderRouter;