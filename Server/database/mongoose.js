



const mongoose=require('mongoose')


const uri=process.env.URI




const connection =async()=>{


    await mongoose.connect(uri,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    console.log('database is working fine')
}

module.exports=connection
