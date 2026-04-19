
import jwt from 'jsonwebtoken'

const adminAuth =async (req,res,next) =>{
    try {
        
        const authHeader = req.headers.authorization 

        if(!authHeader || !authHeader.startsWith("Bearer")) {
            return res.json({success:false,message:"No token provided"})
        }

        const token = authHeader.split(" ")[1]

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(typeof decoded !== "object" || !decoded.email ) {

            return res.json({success:false,message:"invalid token"})
        }

        if(decoded.email !== process.env.ADMIN_EMAIL) {
            return res.json({success:false,message:"not authorized"})
        }

        next()

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export default adminAuth