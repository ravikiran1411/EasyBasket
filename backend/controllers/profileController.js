import userModel from "../model/userModel.js";


const getProfile = async (req,res) => {
    try {
        const userId = req.user.id;        

        const user = await userModel.findById(userId).lean();        
        
        res.json({success:true,user})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

const updateProfile = async (req,res) => {

    try {

        const userId = req.user.id
        const {name,phone,address,city,pincode} = req.body
        const user = await userModel.findByIdAndUpdate(userId)

        user.name = name || user.name
        user.phone = phone || user.phone
        user.address = address || user.address
        user.city = city || user.city
        user.pincode = pincode || user.pincode

        await user.save()

        res.json({success:true,message:"updated profile"})
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})        
    }

}

export {getProfile,updateProfile}; 