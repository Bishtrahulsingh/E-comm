


const mongoose=require("mongoose")


const cartSchema=new mongoose.Schema({

    user_id:String,
    product_id:String,
    value:Number

},{timestamps:true})

const cart=new mongoose.model("cart",cartSchema)
module.exports=cart