

const productmodel=require("../models/productmodel")
const cartmodel=require("../models/cartmodel")
const Errorhandler = require("../services/Errorhandler")


exports.getallcartitems=async(req,res,next)=>{
    
   try {
    const cart=await cartmodel.find({user_id:req.params.id})
    res.send(cart)
   } catch (error) {
     return next(Errorhandler.Customerror('internal server error',500)) 
   }

}


exports.createcartitem=async(req,res,next)=>{


    const user_id=req.query.user_id
    const product_id=req.query.product_id
    const value=req.body.value
    try {
        await cartmodel.create({user_id,product_id,value})
        res.status(200).json({
            success:true
        })
    } catch (error) {
        return next(Errorhandler.Customerror('internal server error',500))
    }
}


exports.updatecart=async(req,res,next)=>{
     

    const user_id=req.query.user_id
    const product_id=req.query.product_id
    const value=req.body.value
    try {
       await cartmodel.updateOne({$and:[{user_id},{product_id}]},{product_id,value})
       res.status(200).json({
        success:true
    })
    } catch (error) {
        return next(Errorhandler.Customerror('internal server error',500))
    }
}
exports.deletecartitem=async(req,res,next)=>{


    const user_id=req.query.user_id
    const product_id=req.query.product_id

    try {
        await cartmodel.deleteOne({user_id,product_id})
        res.status(200).json({
            success:true
        })
    } catch (error) {
        return next(Errorhandler.Customerror('internal server error',500))
    }
}

exports.getitemimage=async (req,res,next)=>{

    try {
        const {image}=await productmodel.findOne({_id:req.params.id})
       res.send(image.url)
    } catch (error) {

      next(Errorhandler.Customerror("image not found",404))
        
    }
}