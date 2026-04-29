import orderModel from "../model/orderModel.js"
import productModel from "../model/productModel.js"
import userModel from "../model/userModel.js"

const orderCOD = async (req,res) =>{
    try {
        
        const {address} = req.body
        const userId = req.user.id

        if (!address) {
            return res.json({success:false,message:"address required."})
        }

        const user = await userModel.findById(userId)

        const cart = user.cartData;

        if (!cart || Object.keys(cart).length===0) {
            return res.json({success:false,message:"empty cart"})
        }

        const orderItems=[]
        let total=0

        for(const productId in cart) {
            const qty = cart[productId]

            const product = await productModel.findById(productId)

            if (!product) {
                return res.json({success:false,message:"product not found"})
            }

            if (product.stock <qty) {
                return res.json({success:false, message: `${product.name} out of stock`})
            }

           orderItems.push({
            productId:product._id,
            name:product.name,
            price:product.price,
            image:product.image[0],
            qty,
           })
            total+=product.price * qty;
        }

        const orderData = {
            userId,
            items:orderItems,
            amount:total,
            address,
            payment:false,
            paymentMethod : "COD",
            status:"Placed",
            date : Date.now()
        }

        const order = new orderModel(orderData)
        await order.save();

        for(const item of orderItems) {
            await productModel.findByIdAndUpdate(item.productId, {$inc:{stock:-item.qty}})
        }

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true,message:"order placed"});

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

const orderStripe = async (req,res) =>{
    try {
        
    } catch (error) {
        
    }
}

const orderRazorPay = async (req,res) => {
    try {
        


    } catch (error) {
        
    }
}

const allOrders = async (req,res) =>{
    try {
        const userId = req.user.id
        
        const OrderData = await orderModel.find({userId}).sort({date:-1})

        res.json({success:true,orderData})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}

export {orderCOD,orderRazorPay,orderStripe,allOrders}
