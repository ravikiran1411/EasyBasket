
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import {orderCOD, userOrders } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/codorder',userAuth,orderCOD)

orderRouter.post('/userorders',userAuth,userOrders)

export default orderRouter;