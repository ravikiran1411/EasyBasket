
import mongoose from 'mongoose'

const schema = mongoose.Schema({
    userId : {type:String,required:true},
    items : [{
        productId:{type:String,required:true},
        name:{type:String,required:true},
        price:{type:Number,required:true},
        image:{type:String,required:true},
        qty:{type:Number,required:true},
    }],

    amount:{type:Number,required:true},

    address:{
        name:{type:String,required:true},
        phone:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        pincode:{type:String,required:true},
    },

    status:{type:String,required:true,enum:["Placed","Shipped","Out for delivery","Delivered"]},
    payment:{type:Boolean,required:true,default:false},
    paymentMethod:{type:String,required:true,enum:["COD","Stripe","Razor Pay"]},
    date:{type:Date,required:true,default:Date.now()}
})

const orderModel = mongoose.models.order || mongoose.model('order',schema)

export default orderModel;