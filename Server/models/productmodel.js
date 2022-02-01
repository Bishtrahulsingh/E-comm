




const mongoose =require("mongoose")




const reviewSchema=new mongoose.Schema({
    commentatorusername:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
},{timestamps:true})





const productSchema=new mongoose.Schema({

    creator_id:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
     title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
     image:{
         
         public_id:{
            type:String,
            default:""
        },
         url:{
            type:String,
            default:""
        }
},
     reviews:[reviewSchema],
     rating:{
         type:String,
         default:2.5
     },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    }


})


const product=new mongoose.model("product",productSchema)
module.exports=product