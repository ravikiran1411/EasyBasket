
const vendarAuth = async (req,res,next) =>{
    try {
        
        if (!req.user) {
            return res.json({success:false,message:"please login.."})
        }

        if (req.user.accountType!=="vendor") {
            return res.json({success:false,message:"access denied.."})
        }

        next();

    } catch (error) {

        res.json({success:false,message:"something wrong in vendar middleware"})
        console.log(error.message);

    }
}

export default vendarAuth