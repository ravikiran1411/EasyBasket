import userModel from "../model/userModel.js"

const addCart = async (req,res) =>{

    try {
        
        const {productId,quantity} = req.body

        const user = await userModel.findById(req.user.id)
        console.log(req.user.id);
        

        let cartData = user.cartData || {}
        console.log(cartData);
        

        cartData[productId] = (cartData[productId] || 0) + quantity

        user.cartData = cartData
        user.markModified("cartData")

        await user.save()
        console.log(user.cartData)

        res.json({success:true,message:"Added to Cart"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

const cartUpdate = async (req,res) => {

    try {
        
        const {productId,quantity} = req.body

        const user = await userModel.findById(req.user.id)

        let cartData = user.cartData

        if (quantity <=0) {
            delete cartData[productId]
        }
        else{
            cartData[productId] = quantity
        }

        user.cartData = cartData
        user.markModified("cartData")
        await user.save()

        res.json({success:true,message:"cart updated"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

const getCartData = async (req,res) => {

    try {
        
        const user = await userModel.findById(req.user.id)

        res.json({success:true,cartData:user.cartData})

    } catch (error) {
        res.json({success:false,message:error.message})
    }

}


export {addCart,cartUpdate,getCartData} 