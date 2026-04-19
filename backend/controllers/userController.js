import userModel from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import validator from 'validator'
const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

//user login
const userLogin = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success:false,message:"user not found. please register"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.json({success:false,message:"incorrect password."})
        }

        const token = createToken(user._id)

        res.json({success:true,token})


    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//user register
const userRegister = async (req,res) =>{
    
    try {
        const {name,email,password} = req.body

    const exists= await userModel.findOne({email})

    if(exists){
        return res.json({success:false,message:"user already exists"})
    }

    if(!validator.isEmail(email)) {
        return res.json({success:false,message:"enter valid email"})
    }

    if(password.length < 8){
        return res.json({success:false,message:"password is too small, it should be atleast 8 characters"})
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new userModel({
        name,
        email,
        password:hashedPassword,
    })

    const user = await newUser.save()

    const token = createToken(user._id)
    console.log(token);
    
    
    res.json({success:true,token})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// admin login
const adminLogin = async (req,res) =>{
    
    try {

        const {email,password} = req.body

        if(email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD ) {
            return res.json({success:false,message:"incorrect email/password."})
        }

        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'}) 

        res.json({success:true,token}) 
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }

}

export {userLogin,userRegister,adminLogin}