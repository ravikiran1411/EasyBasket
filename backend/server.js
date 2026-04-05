import dontenv from 'dotenv'
dontenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoutes from './routes/userRoutes.js'


//app config
const app= express()
const port = 4000
connectDB()
connectCloudinary()



//middleware
app.use(express.json())
app.use(cors())


//endpoints
app.use('/api/user',userRoutes)

app.get('/',(req,res)=>{
    res.send("api working..")
    console.log("working");
    
})

app.listen(port)

