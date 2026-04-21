
import jwt from 'jsonwebtoken'

const userAuth = async (req,res,next) => {

    try {
        
        const token = req.headers.token;

        if (!token) {
            return res.json({success:false,message:"not authorized"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded

        next()


    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

export default userAuth;