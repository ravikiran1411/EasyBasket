import userModel from "../model/userModel.js";

const vendarAuth = async (req,res,next) => {

    try {

        const user = await userModel.findById(req.user.id);
        

        if (!user) {
            return res.status(404).json({
                success:false,
                message:"user not found"
            });
        }

        if (user.accountType !== "vendor") {
            return res.status(403).json({
                success:false,
                message:"access denied"
            });
        }

        next();

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

export default vendarAuth;