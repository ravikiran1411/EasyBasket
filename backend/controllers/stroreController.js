import store from "../model/storeModel.js";
import userModel from "../model/userModel.js";

const createVendorAccount = async (req,res) =>{
    try {
        
        const {storeName,address,latitude,longitude,deliveryRadius} = req.body;
        
        const isExist = await store.findOne({owner:req.user.id});

        if (isExist) {
            return res.json({success:false,message:"vender already exist"});
        }

        const storeData = store.create({
            storeName,
            owner:req.user.id,
            address,
            location:{
                type:"Pointer",
                coordinates:[latitude,longitude],
            },
            deliveryRadius,
        });

        await userModel.findByIdAndUpdate(req.user.id,{accountType:"vendor"})

        res.json({success:true,message:"vendor store created.."},storeData)

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


const updateStore = async (req,res) =>{
    try {
        const {storeName,address,latitude,longitude,deliveryRadius} = req.body;

        const storeData = await store.findOne({owner:req.user.id});

        if (!storeData) {
            return res.json({success:false,message:"store not found , please create one.."})
        }

        if (storeName) {
            storeData.storeName=storeName
        }
        if (address) {
            storeData.address=address
        }
        if (latitude && longitude) {
            storeData.location={
                type:"Pointer",
                coordinates:[latitude,longitude]
            }
        }
        if (deliveryRadius) {
            storeData.deliveryRadius=deliveryRadius
        }

        await storeData.save()

        res.json({success:true,message:"store updated successfully..",storeData})


    } catch (error) {
        
        res.json({success:false,message:error.message})
    }
}


export {createVendorAccount,updateStore}