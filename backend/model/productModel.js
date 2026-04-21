import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:Array,required:true},
    price:{type:Number,required:true},
    quantity:{type:String , required:true},
    category:{type:String,required:true},
    brand:{type:String},
    reviews:[
    {
      userId:{type:String},
      userName:{type:String},
      rating:{type:Number},
      comment:{type:String},
      date:{type:Number}
    }
  ],
    rating:{type:Number,default:0},
    numReviews:{type:Number,default:0},
    stock:{type:Number,required:true},
    bestSeller:{type:Boolean},
    date:{type:Number,required:true},

})

const productModel = mongoose.models.product || mongoose.model("product",schema)

export default productModel