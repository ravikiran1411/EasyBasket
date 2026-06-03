import store from "../model/storeModel.js";
import userModel from "../model/userModel.js";

const createVendorAccount = async (req,res) =>{
    try {
        
        const {storeName,city,address,latitude,longitude} = req.body;

        if (!storeName || !city || !address || !latitude || !longitude) {
            return res.json({ success:false,message:"all fields are required"})
        }
        
        const isExist = await store.findOne({owner:req.user.id});

        if (isExist) {
            return res.json({success:false,message:"vender already exist"});
        }

        const storeData = await store.create({
            storeName,
            city:city.toLowerCase() ,
            owner:req.user.id,
            address,
            location:{
                type:"Point",
                coordinates:[longitude,latitude],
            },
        });

        await userModel.findByIdAndUpdate(req.user.id,{accountType:"vendor"})

        res.json({success:true,message:"vendor store created..",storeData})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}


const updateStore = async (req,res) =>{

    try {

        const {storeName,city,address,latitude,longitude} = req.body;

        const storeData = await store.findOne({owner:req.user.id});

        if (!storeData) {
            return res.json({success:false,message:"store not found , please create one.."})
        }

        if (storeName) {
            storeData.storeName=storeName
        }

        if (city) {
            storeData.city=city.toLowerCase()
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

const getNearbyStores = async (req,res) => {
    try {
        
        const {latitude,longitude,city} = req.body
        let stores = []

        if (latitude && longitude) {
            stores = await store.find({
                location:{
                    $near:{
                        $geometry:{
                            type:"Point",
                            coordinates:[Number(longitude),Number(latitude)]   
                        },
                        $maxDistance:15000
                    }
                }
            })
            res.json({success:true,stores})
        }

        else if(city) {
            stores = await store.find({city: city.toLowerCase(),isApproved: true});
            res.json({success:true,stores})

        }

        else {

            return res.json({success: false,message: "Location required"});
        }


    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

const getStoreCities = async (req,res) => {

    try { 
        
        const cities = await store.distinct("city") 

        res.json({success:true,cities}) 

    } catch (error) { 
        res.json({success:false,message:error.message}) 
    } 
} 

export {createVendorAccount,updateStore,getMyStore,getNearbyStores,getStoreCities} 