
import express from 'express'
import { adminLogin, userLogin, userRegister } from '../controllers/userController.js'

let userRoutes= express.Router()

userRoutes.post('/login',userLogin)
userRoutes.post('/register',userRegister)

userRoutes.post('/adminlogin',adminLogin)

export default userRoutes