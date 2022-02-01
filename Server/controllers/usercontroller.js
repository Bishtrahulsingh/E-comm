


const { TokenExpiredError } = require("jsonwebtoken")
const bcrypt=require('bcrypt')
const joi =require("@hapi/joi")
const usermodel=require("../models/usermodel")
const Errorhandler=require("../services/Errorhandler")
const JwtService=require("../services/Jwtservice")
const cloudinary=require('cloudinary').v2


exports.createuser=async(req,res,next)=>{



  //checking if user already exist 

  const exist =await usermodel.findOne({email:req.body.email})
  if(exist){
    return next(Errorhandler.Customerror("user already exist",403))
  }




// validation using hapi joi
  const createSchema=joi.object({
    username:joi.string().min(3).required(),
    email:joi.string().email().required(),
    password:joi.string().required().min(5).max(20),
    repeatpassword:joi.ref('password')
  })
  const{error}=createSchema.validate(req.body)



//checking if it is valid or not 
  if(error){
    return next(Errorhandler.Customerror(error.message,422))
  }



  //recreating user with the hashed password
  const {username,email}=req.body
  const password=await bcrypt.hash(req.body.password,10)


  const user={
    username,
    email,
    password
  }

  //creating the  user 
   try {
       await usermodel.create(user)
       res.send("user created successfully")

   } catch (error) {
       return next(Errorhandler.Customerror("unprocessable entity",422))
   }


}




exports.edituser=async (req,res,next)=>{

   try {
      
   var public_id
   var url
   const img=req.files.file.tempFilePath
   
   

   const existuser=await usermodel.findOne({_id:req.params.id})
   if(!existuser){
     return next(Errorhandler.Customerror("user not found",404))
   }

   if(existuser.image.public_id){
     await cloudinary.uploader.destroy(existuser.image.public_id)
   }

   await cloudinary.uploader.upload(img,{
      folder:"profileimage"
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
      await usermodel.updateOne({_id:req.params.id},{image:{public_id,url}})


   } catch (error) {
      return next(Errorhandler.Customerror("internal server error",500))
   }

   res.status(200).json({
      message:'image uploaded successfully'
   })

}



exports.loginuser=async (req,res,next)=>{

//validating the usersdata
  const loginSchema=joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
  })





  const {error}=loginSchema.validate(req.body)
  if(error){
    return next(Errorhandler.Customerror("validation failed",422))
  }

// finding the user in records
   const logindata=req.body


  try {
    var data= await usermodel.findOne({email:logindata.email})
  } catch (error) {
    return next(Errorhandler.Customerror("user not found",401))
  } 
  

 //checking the password 
  try {
    const userpassword=await bcrypt.compare(req.body.password,data.password)
    if(!userpassword){
      return next(Errorhandler.Customerror("password didn't match",401))
    }
  } catch (error) {
    return next(Errorhandler.Customerror("password didn't match", 401))
  }

///JWT TOKENS


const accesssecret=process.env.ACCESS_SECRET
const refreshsecret=process.env.REFRESH_SECRET


  const refreshtoken=JwtService.Sign({_id:data._id},refreshsecret,'1y')
  const accesstoken=JwtService.Sign({_id:data._id},accesssecret,"24h")


  res.cookie("Ecommaccess",accesstoken,{
    maxAge:100*60*60*24*365,
    httpOnly:true
  })
  res.cookie("Ecommrefresh",refreshtoken,{
    maxAge:100*60*60*24*365,
    httpOnly:true
  })
  
  


  try {
    await usermodel.updateOne({_id:data._id},{refreshtoken})
  } catch (error) {
    return next(Errorhandler.Customerror("internal server error",500))
  }




  res.status(200).json({
    _id:data._id,
    username:data.username,
    email:data.email
  })



  

}



exports.jwtuserautologin= async(req,res,next)=>{

 const accesssecret=process.env.ACCESS_SECRET
 const refreshsecret=process.env.REFRESH_SECRET

 const {Ecommaccess}=req.cookies
 const {Ecommrefresh}=req.cookies

 if(!Ecommrefresh && !Ecommaccess){
   return next(Errorhandler.Customerror("cookie not found",404))
 }





 try {
   const {_id}=JwtService.Verify(Ecommaccess,accesssecret)
    


   try{
   const {refreshtoken}=await usermodel.findOne({_id})
        if(refreshtoken==""){
        return next(Errorhandler.Customerror("user not found",404))
        
        }  
      } catch (error) {
        return next(Errorhandler.Customerror("token not found",404))
      }


      let userdata
      try {
       userdata=await usermodel.findOne({_id})
      } catch (error) {
        return next(Errorhandler.Customerror("user not found",404))
      }
      

   res.json({
    _id:userdata._id,
    username:userdata.username,
    email:userdata.email
   })
 }  
 
 
 
 
 
 
 catch (error) { 
     if(TokenExpiredError){
  

      try {
        var {_id}=await usermodel.findOne({refreshtoken:Ecommrefresh})
        if(!_id){
        return next(Errorhandler.Customerror("user not found",404))
        
        }  
      } catch (error) {
        return next(Errorhandler.Customerror("token not found",404))
      }


      let userdata
      try {
       userdata=await usermodel.findOne({_id})
      } catch (error) {
        return next(Errorhandler.Customerror("user not found",404))
      }




       res.clearCookie("Ecommaccess")
       res.clearCookie("Ecommrefresh")


       const refreshtoken=JwtService.Sign({_id},refreshsecret,'1y')
       const accesstoken=JwtService.Sign({_id},accesssecret,"24h")
     
     
       res.cookie("Ecommaccess",accesstoken,{
         maxAge:100*60*60*24*365,
         httpOnly:true
       })
       res.cookie("Ecommrefresh",refreshtoken,{
         maxAge:100*60*60*24*365,
         httpOnly:true
       })

       
     try {
       await usermodel.updateOne({_id},{refreshtoken})
     } catch (error) {
       return next(Errorhandler.Customerror("internal server error",500))
     }     
   

     res.json({
      _id:userdata._id,
      username:userdata.username,
      email:userdata.email
     })

     }
 }
    

 }



 exports.logout=async(req,res,next)=>{


   const _id=req.params.id

   
   try {
    await usermodel.updateOne({_id},{refreshtoken:""})
   } catch (error) {
     return next(Errorhandler.Customerror("user not found",404))
   }
   res.json({
     success:true
   })


 }

 exports.profile=async(req,res,next)=>{

  try {
    const {image}= await usermodel.findOne({_id:req.params.id})

    res.json({
      url:image.url
    })
  } catch (error) {
    return next(Errorhandler.Customerror("image not found",404))
  }



 }


