import productModel from "../model/productModel.js"
import { v2 as cloudinary } from "cloudinary";

const addProduct = async (req,res) => {

    try {
        
        const {name,description,price,quantity,category,brand,stock,bestSeller} = req.body

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
        
        await productModel.findByIdAndDelete(req.body.id)

        res.json({success:true,message:"product removed."})

    } catch (error) {

        res.json({success:false,message:error.message})
    }

}

const listProduct = async (req,res) => {

    try {
        const products = await productModel.find({})

        res.json({success:true,products})

    } catch (error) {
        res.json({success:false,message:error.message})
    } 
} 

const singleProduct = async (req,res) => {

    try {
        
        const product = await productModel.findById(req.body.id)
        res.json({success:true,product})

    } catch (error) {
        res.json({success:false,message:error.message})
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

export {addProduct,removeProduct,listProduct,singleProduct,addReview}