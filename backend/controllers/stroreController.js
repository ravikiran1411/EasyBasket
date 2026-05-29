import store from "../model/storeModel.js";
import userModel from "../model/userModel.js";

const createVendorAccount = async (req,res) =>{
    try {
        
        const {storeName,address,latitude,longitude,deliveryRadius} = req.body;

        if (!storeName || !address || !latitude || !longitude) {
            return res.json({ success:false,message:"all fields are required"})
        }
        
        const isExist = await store.findOne({owner:req.user.id});

        if (isExist) {
            return res.json({success:false,message:"vender already exist"});
        }

        const storeData = await store.create({
            storeName,
            owner:req.user.id,
            address,
            location:{
                type:"Point",
                coordinates:[longitude,latitude],
            },
            deliveryRadius,
        });

        await userModel.findByIdAndUpdate(req.user.id,{accountType:"vendor"})

        res.json({success:true,message:"vendor store created..",storeData})

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
                type:"Point",
                coordinates:[longitude,latitude]
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

const getMyStore = async (req,res)=>{

    try {

        const storeData = await store.findOne({owner:req.user.id});

        if(!storeData){
            return res.status(404).json({success:false,message:"Store not found"});
        }

        res.status(200).json({success:true,storeData});

    } catch(error){

        res.status(500).json({success:false,message:error.message});
    }
}


export {createVendorAccount,updateStore,getMyStore}