
import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        storeName:{
            type:String,
            required:true,
            trim:true,
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        location:{
            type:{
                type:String,
                enum:["Point"],
                default:"Point",
            },
            coordinates:{
                type:[Number],
                required:true,
            },
        },
        deliveryRadius:{
            type:Number,
            default:5,
        },
        isApproved : {
            type:Boolean,
            default:false,
        },
    },
    {timestamps:true}
)

schema.index({location:"2dsphere"})

const store = mongoose.models.Store || mongoose.model("Store",schema);

export default store;

