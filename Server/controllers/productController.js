



const jwt =require("jsonwebtoken")
const joi =require("@hapi/joi")
const cloudinary=require('cloudinary').v2
const Errorhandler=require("../services/Errorhandler")
const productmodel =require('../models/productmodel')




exports.deletenoimageproduct=async(req,res,next)=>{


  try {
     const data=await productmodel.find({image:{public_id:"",url:""}})
     res.send(data)
  } catch (error) {
     return next(Errorhandler.Customerror("not found",404))
  }


}





exports.products= async(req,res,next)=>{
    

   try {
      const product=await productmodel.find()


  
   const data={
      product
   }
   res.send(data)
   } catch (error) {
      return next(Errorhandler.Customerror("internal server error",500))
   }
   

}

exports.userproduct=async(req,res,next)=>{
    

   try {
      const product=await productmodel.find({creator_id:req.params.id})
  
      res.send(product)
   } catch (error) {
      return next(Errorhandler.Customerror("user not found",404))
   }
   

}







exports.createproduct=async(req,res,next)=>{




   //category
   //title
   //price
   //rating
   //discription
   //imageurl
   //stock
   //creator_id


   const creator_id=req.params.id

   const {category,title,price,discription,stock}=req.body

   var product={
      category,
      title,
      price,
      discription,
      stock,
      creator_id,
   }
   const productSchema =joi.object({
      category:joi.string().required(),
      title:joi.string().required(),
      price:joi.number().required(),
      discription:joi.string().required(),
      stock:joi.number().required(),
      creator_id:joi.string().required()
   })
   const {error}=productSchema.validate(product)
   if(error){
      return next(Errorhandler.Customerror(error.message,422))
   }
    
   try {
     var createdproduct= await productmodel.create(product)
   } catch (error) {
      return next(Errorhandler.Customerror("internal server error",500))
   }
   res.status(200).json({
      _id:createdproduct._id,
      status:200
   })
}
      
   


exports.editproduct=async(req,res,next)=>{


   


  

   let public_id
   let url
   const img=req.files.file.tempFilePath



     try {
      await cloudinary.uploader.upload(img,{
         folder:"productimages"
      },(error,Image)=>{
         if(error){
            return next(Errorhandler.Customerror("internal server error",500))
         }
         
   
         public_id=Image.public_id
         url=Image.url
      }) 
     } catch (error) {
        return next(Errorhandler.Customerror("internal server error",500))
     }


   try {
      await productmodel.updateOne({_id:req.params.id},{image:{public_id,url}})


   } catch (error) {
      return next(Errorhandler.Customerror("internal server error",500))
   }

   res.status(200).json({
      message:'image uploaded successfully'
   })

}
 





exports.deleteproduct=async(req,res,next)=>{


   const _id=req.query.id
    
   
   try {
      const productfind=await productmodel.findOne({_id})

      cloudinary.uploader.destroy(productfind.image.public_id)

      await productmodel.deleteOne({_id})


   } catch (error) {
      console.log(error)
      return next(Errorhandler.Customerror("internal server error",500))
   }



   res.status(200).json({message:"product deleted successfully"})
   
}


exports.createreview=async(req,res,next)=>{

   try {
      await productmodel.updateOne({_id:req.params.id},{$push:{reviews:req.body}})
      res.json({success:true})
   } catch (error) {
      return next("internal server error",500)
   }
}


exports.readreview=async(req,res,next)=>{



   try {
      const review=await productmodel.findOne({_id:req.params.id})
      res.send(review.reviews)
   } catch (error) {
      return next(Errorhandler.Customerror("internal server error",500))
   }
}




//search api create

exports.searchapi=async(req,res,next)=>{

   const search=req.params.search
   try {

      const serchdata=await productmodel.find({category:{$regex:search,$options:`$i`}})
      res.send(serchdata)
   } catch (error) {
      return next(Errorhandler.Customerror("not found",404))
   }
}