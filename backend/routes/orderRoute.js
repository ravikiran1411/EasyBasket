
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import {allOrders, orderCOD, updateOrderStatus, userOrders } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'

const orderRouter = express.Router()

orderRouter.post('/codorder',userAuth,orderCOD)

orderRouter.post('/userorders',userAuth,userOrders)

orderRouter.post('/allorders',adminAuth,allOrders)

orderRouter.post('/status',updateOrderStatus)

export default orderRouter;