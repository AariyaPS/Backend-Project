import { Product } from "../Models/product.js";

//Add product
export const addProduct = async (req,res)=>{
    try{
        let product = await Product.create(req.body);
        res.json({message:"Product added successfully!", product, success:true });
    }catch(err){
        res.json(err.message);
    }
}

//Fetching all products
export const getAllProducts = async (req,res)=>{

    try{
        let products = await Product.find();
        if(!products) res.status(400).json({message:"No product found!",success:false});

        res.status(200).json({message:"Fetched All Product Details: ", products,success:true});
    }catch (err){
        res.json(err.message);
    }
}

//Get product by id
export const getProductById = async (req,res)=>{

    try{
        let id =req.params.id;
        let product = await Product.findById(id);
        if(!product) res.status(400).json({message:"Invalid Id!",success:false});

        res.status(200).json({message:"Fetched Product Details: ", product,success:true});
    }catch (err){
        res.json(err.message);
    }
}

//Update Product by Id
export const updateProductById = async (req,res)=>{

    try{
        let id = req.params.id;
        let product = await Product.findByIdAndUpdate(id,req.body,{new:true});
        if(!product) res.status(400).json({message:"Invalid Id!",success:false});

        res.status(200).json({message:"Product Updated Successfully: ", product,success:true});
    }catch (err){
        res.json(err.message);
    }
    
}

//Delete Product By Id
export const deleteProductById = async (req,res)=>{
    try{
        let id = req.params.id;
        let product = await Product.findByIdAndDelete(id);
        if(!product) res.status(400).json({message:"Invalid Id!",success:false});

        res.status(200).json({message:"Product Has Been Deleted Successfully: ", success:true});
    }catch (err){
        res.json(err.message);
    }
}