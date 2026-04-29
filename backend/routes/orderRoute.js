
import express from 'express'
import userAuth from '../middleware/userAuth.js'
import { allOrders, orderCOD } from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.post('/codorder',userAuth,orderCOD)

orderRouter.post('allorders',userAuth,allOrders)

export default orderRouter;