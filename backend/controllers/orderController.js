import { json } from "express"
import orderModel from "../model/orderModel.js"
import productModel from "../model/productModel.js"
import userModel from "../model/userModel.js"


import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const orderCOD = async (req,res) =>{
    try {
        
        const {address} = req.body
        const userId = req.user.id
        console.log(userId);
        

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
        console.log("orderData:", JSON.stringify(orderData, null, 2))


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

        const {address} = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId)

        const cart = user.cartData

        if (!cart || Object.keys(cart).length==0) {
            return res.json({success:false,message:"empty cart data"})
        }

        const line_items=[]

        for(const productId in cart) {

            const qty = cart[productId]

            const product = await productModel.findById(productId);

            if (!product) {
                return res.json({success:false,message:"no product found"})
            }
            if (product.stock<qty) {
                return res.json({success:false,message:"stock not available.."})
            }

            line_items.push({
                price_data:{
                    currency:"inr",
                    product_data:{
                        name:product.name,
                        images:[product.image[0]],
                    },
                    unit_amount:product.price*100,
                },
                quantity:qty,
            })
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types :['card'],
            metadata:{
                userId,
                address:JSON.stringify(address),
            },
            line_items,
            mode:"payment",
            success_url:`${process.env.FRONTEND_URL}/orders`,
            cancel_url:`${process.env.FRONTEND_URL}/cart`,
        })

        res.json({success:true, url:session.url })
        
    } catch (error) {
        res.json({success:false,message:error.message})
        console.log(error.message);
    }
}

const stripeWebhook = async (req,res) => {
    
    const sig = req.headers["stripe-signature"]

    let event;

    try {
        
        event = stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_WEBHOOK_SECRET)

    } catch (error) {
        return res.status(400).send(`webhook error: ${error.message}`)    
    }

    console.log(event.type);

    if (event.type=='checkout.session.completed') {

        const session = event.data.object;
        const userId = session.metadata.userId;
        const address = JSON.parse(session.metadata.address)
        
        const user = await userModel.findById(userId)
        const cart = user.cartData
        const orderItems=[]
        let total=0

        for(const productId in cart){
            const qty = cart[productId]

            const product = await productModel.findById(productId);

            orderItems.push({
                productId:product._id,
                name:product.name,
                price:product.price,
                image:product.image[0],
                qty
            })
            total+=product.price*qty

        }

        const orderData = {
            userId,
            items:orderItems,
            amount:total,
            address,
            status:"Placed",
            payment:true,
            paymentMethod:"Stripe",
            date:Date.now()
        }

        const order = new orderModel(orderData);
        await order.save()
        console.log("order saved");

        for(const item of orderItems){
            await productModel.findByIdAndUpdate(item.productId,{$inc:{stock:-item.qty}})
        }

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        
    }
    
    res.json({received:true})

}

const orderRazorPay = async (req,res) => {
    try {

    } catch (error) {
        
    }
}

const userOrders = async (req,res) =>{
    try {
        const userId = req.user.id
        
        const orderData = await orderModel.find({userId}).sort({date:-1})

        res.json({success:true,orderData})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
        
    }
}

const allOrders = async (req,res) => {
    try {
        
        const orders = await orderModel.find({}).sort({date:-1})    

        res.json({success:true,orders})


    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
} 

const updateOrderStatus = async (req,res) =>{
    try {
        
        const {orderId,status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})

        res.json({success:true,message:"order status changed.."})

    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}

export {orderCOD,orderRazorPay,orderStripe,userOrders,allOrders,updateOrderStatus,stripeWebhook} 
