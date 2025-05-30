import Product from "../models/product.model.js";
import { productSchema } from "../types.js";
import cloudinary from "../lib/cloudinary.js";

// export const getProducts = async(req,res)=>{
//     try {
//         const isUserAdmin = req.user.isAdmin
//         const products = await Product.find({isAdmin:isUserAdmin})
        
//         res.status(200).json({
//             status:"success",
//             products
//         })

//     } catch (error) {
//             console.log('error in get products',error);
//         res.status(500).json({
//             msg:"internal server error"
//         })
//     }
// }

export const addProduct = async(req,res)=>{

    try {
        const ProductInfo = productSchema.safeParse(req.body)

        const userId = req.user._id
    
        if (!ProductInfo.success) {
            return res.status(411).json({
                msg:"invalid inputs"
            })
        }

             // Validate that imageUrl is provided
        if (!ProductInfo.data.imageUrl) {
            return res.status(400).json({
                msg: "Image URL is required"
            });
        }

         const uploadResponse = await cloudinary.uploader.upload(ProductInfo.data.imageUrl,{
            folder:'products',
            resource_type:'auto'
         });
        //  const updatedUser = await User.findByIdAndUpdate(userId,{imageUrl:uploadResponse.secure_url},{new:true})

    
        await Product.create({
            name:ProductInfo.data.name,
            brand:ProductInfo.data.brand,
            price:ProductInfo.data.price, 
            description:ProductInfo.data.description,
            imageUrl:uploadResponse.secure_url,
            userId:req.user._id,
            sizes:ProductInfo.data.sizes,
            stock:ProductInfo.data.stock,
            category:ProductInfo.data.category 
        })
    
        res.status(200).json({
            msg:"Product added successfully"
        })

    } catch (error) {
        console.log('error in add product',error);
        res.status(501).json({msg:"Internal server error"})
    }
}

// export const getEditProduct = async(req,res)=>{
//     try {
//         const {productId} = req.params;
//         const existingProduct = await Product.findById(productId)
//         if (!existingProduct) {
//             return res.status(411).json({
//                 msg:"product doesn't exists"
//             })
//         }

//         res.status(200).json({
//             status:"success",
//             product:existingProduct
//         })

//     } catch (error) {
//          console.log('error in get specific product',error);
//         res.status(501).json({msg:"Internal server error"})
//     }
// }

export const postEditProduct = async(req,res)=>{
    try {

        // const updatedTitle = req.body.title || ""
        // const updatedPrice = req.body.price || "";
        // const updatedImg = req.body.image || "";
        // const updatedDesc = req.body.description || "";
        // const updateStock = req.body.stock || "";
        // const updateCategory = req.body.category || "";

        const {updatedValues} = req.body;

        const {productId} = req.params;
        const existingProduct = await Product.findById(productId)
        if (!existingProduct) {
            return res.status(411).json({
                msg:"product doesn't exists"
            })
        }

        // await Product.updateOne({
        //     title:updatedTitle,
        //     description:updatedDesc,
        //     imageUrl:updatedImg,
        //     price:updatedPrice,
        //     stock:updateStock,
        //     category:updateCategory
        // })

        const updatedProduct = await Product.updateOne({
            _id:productId
        },{
            updatedValues
        })

        

        res.status(200).json({
            status:"success",
            product:updatedProduct
        })

    } catch (error) {
         console.log('error in get specific product',error);
        res.status(501).json({msg:"Internal server error"})
    }
}

export const deleteProduct = async(req,res)=>{

    try {
        const {productId} = req.params;
        await Product.findByIdAndDelete(productId)

        res.status(200).json({
            msg:"product deleted"
        })
        
    } catch (error) {
       console.log('error in deleting product',error);
        res.status(500).json({
            msg:"internal server error"
        })
    }

}