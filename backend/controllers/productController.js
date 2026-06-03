import productModel from "../model/productModel.js"
import { v2 as cloudinary } from "cloudinary";
import store from "../model/storeModel.js";

const addProduct = async (req,res) => {

    try {
        
        const {name,description,price,quantity,category,brand,stock,bestSeller} = req.body

        const storeData = await store.findOne({owner:req.user.id})

        if (!storeData) {
            return res.json({success:false,message:"store not found.."})
        }

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=>item!== undefined)

        if (images.length === 0) {
            return res.json({ success: false, message: "At least one image required" });
        }

        const imagesurl = await Promise.all(
            images.map( async (item)=> {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:"image"})
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price:Number(price),
            quantity,
            image:imagesurl,
            category,
            brand,
            rating: 0,
            numReviews: 0,
            stock : Number(stock),
            bestSeller: bestSeller === "true" ? true : false,
            store: storeData._id,
            date:Date.now()
        }

        const data = new productModel(productData)
        await data.save()

        res.json({success:true,message:"product added"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const removeProduct = async (req,res) => {

    try {
        
        const product = await productModel.findById(req.body.id)

        if (!product) {
            return res.status(404).json({success:false,message:"product not found"})
        }

        const storeData = await store.findOne({owner:req.user.id})

        if (!storeData) {
            return res.status(404).json({success:false,message:"store not found"})
        }

        if (product.store.toString()  !== storeData._id.toString()) {
            return res.status(403).json({success:false,message:"not autharozied"})
        }

        await productModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true,message:"product deleted succesfully"})

    } catch (error) {

        res.json({success:false,message:error.message})
    }
}

const listProduct = async (req,res) => {

    try {
        const products = await productModel.find({}).populate("store")

        res.status(200).json({success:true,products})

    } catch (error) {
        res.json({success:false,message:error.message})
    } 
} 

const singleProduct = async (req,res) => {

    try {
        
        const product = await productModel.findById(req.body.id).populate("store")

        if(!product){
            return res.status(404).json({success: false,message: "Product not found"});
        }

        res.json({success:true,product})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const allVendorProducts = async (req,res) =>{
    try {
        
        const storeData = await store.findOne({owner:req.user.id})

        if (!storeData) {
            return res.status(404).json({success:false,message:"store not found."})
        }

        const products = await productModel.find({store:storeData._id})

        res.status(200).json({success:true,products})

    } catch (error) {

        res.status(500).json({success:false,message:error.message});

    }
}

const updateVendarProducts = async (req,res) => {
    try {
        const {id,name,description,price,quantity,category,brand,stock,bestSeller} = req.body

        const product = await productModel.findById(id)
        console.log(product);
        
        
        if (!product) {
            return res.status(404).json({success:false,message:"product not found"});
        }

        const storeData = await store.findOne({owner:req.user.id})

        if (!storeData) {
            return res.status(404).json({success:false,message:"store not found"});
        }

        if (product.store.toString() !== storeData._id.toString()) {
            return res.status(403).json({success:false,message:"unauthorized"});
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = Number(price);
        if (quantity) product.quantity = quantity;
        if (category) product.category = category;
        if (brand) product.brand = brand;
        if (stock) product.stock = Number(stock);

        if (bestSeller!==undefined) {
            product.bestSeller==="true" ? true : false;
        }
        console.log();
        

        await product.save();

        res.status(200).json({success:true,message:"product updated successfully",product});
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}

const addReview = async (req,res) =>{

    try {
        
        const {id,rating,comment} = req.body;

        const product = await productModel.findById(id)

        if (!product) {
            return res.json({success:false,message:"no product found."})
        }

        if (!product.reviews) {
             product.reviews = [];
        }

        const viewed = product.reviews.find((item)=>item.userId.toString() === req.user.id.toString())

        if (viewed) {
            return res.json({success:false,message:"already reviewed"})
        }

        const review = {
            userId:req.user.id,
            userName:req.user.name,
            rating:Number(rating),
            comment,
            date: Date.now()
        }

        product.reviews.push(review)

        product.numReviews=product.reviews.length

        product.rating = product.reviews.reduce((acc,item)=>acc+item.rating,0)/product.reviews.length

        await product.save();

        res.json({success:true,message:"product review added."})


    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

const adminRemoveProduct = async(req,res)=>{
    try {

        const product = await productModel.findById(req.body.id)
        

        if(!product){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }

        await productModel.findByIdAndDelete(req.body.id)

        res.status(200).json({
            success:true,
            message:"product deleted"
        })

    } catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const nearbyProducts = async (req,res) => {
    try {
        
        const {latitude,longitude,city} = req.body;
        
        console.log(req.body);
        
        
        let stores=[]

        if (latitude && longitude) {
            console.log(latitude,longitude);
            
            stores = await store.find({
                location:{
                    $near:{
                        $geometry:{
                            type:"Point",
                            coordinates:[Number(longitude),Number(latitude)]
                        },
                        $maxDistance:15000,
                    }
                },
                
            })
        }

        else if (city) {
            console.log("hello");
            
            stores = await store.find({city: city.toLowerCase()});
            console.log(stores);
            

        }
        else {
            return res.json({success: false,message: "Location required"});

        }


        const storeId = stores.map(item=>item._id) 

        if (storeId.length===0) {
            return res.json({success: true,products: []});
        }

        const products = await productModel.find({store:{$in:storeId}}).populate('store')

        res.json({success:true,products}) 

    } catch (error) {

        res.status(500).json({success:false,message:error.message})
        console.log(error.message);
        
    }
}

export {addProduct,removeProduct,listProduct,singleProduct,addReview,allVendorProducts,updateVendarProducts,adminRemoveProduct,nearbyProducts}