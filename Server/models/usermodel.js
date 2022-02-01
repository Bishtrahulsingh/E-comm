

const mongoose =require("mongoose")




const userSchema=new mongoose.Schema({

      username:String,
      email:String,
      password:String,
      isAdmin:{
          type:Boolean,
          default:false
      },
      image:{
         
        public_id:{
           type:String,
       },
        url:{
           type:String,
       }},
      refreshtoken:String

},{timestamps:true})


const user=new mongoose.model("user",userSchema)
module.exports=user