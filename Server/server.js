



if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config() 
 }    
const express=require("express")
const cookieparser=require('cookie-parser')
const bodyparser=require("body-parser")
const app=require("./app")
const cloudinary=require("cloudinary").v2
const connection=require("./database/mongoose")
const router = require("./routes/routes")
const Errorhandler = require("./Services/Errorhandler")
const fileupload=require("express-fileupload")
const path=require("path")




const port=process.env.PORT
app.listen(port,()=>{
    console.log("server is running")
})

connection()



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


//app.use portion 

app.use(cookieparser())
app.use(bodyparser.json())
app.use(fileupload({
    useTempFiles:true
}))
app.use(router)


app.use(express.static(path.join(__dirname,"../material/build")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "../material/build/index.html"))
})






app.use((req,res,next)=>{
    return next(Errorhandler.Customerror("page not found ",404))
})
app.use ((err,req,res,next)=>{
    if(err instanceof Errorhandler){
        return res.status(err.status).json ({
            message:err.message,
            status:err.status
        })
    }
    else {
        return res.status(err.status).json ({
            message:err.message,
            status:err.status
        })
    }
})









