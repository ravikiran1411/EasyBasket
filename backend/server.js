import dontenv from 'dotenv'
dontenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoutes from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'
import profileRouter from './routes/profileRoute.js'


//app config
const app= express()
const port = process.env.PORT || 4000
connectDB() 
connectCloudinary() 


//middleware
app.use(express.json()) 
app.use(cors()) 


//endpoints
app.use('/api/user',userRoutes)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/profile',profileRouter)

app.get('/',(req,res)=>{
    res.send("api working..")
    console.log("working");
    
})

app.listen(port)

