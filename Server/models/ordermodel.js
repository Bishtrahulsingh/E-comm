


const mongoose=require("mongoose")


const orderSchema=new mongoose.Schema({

    user_id:{
        type:String,
        required:true
    },
    orderItems:[
        {
            productname:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    shippingaddress:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        postalcode:{
            type:Number,
            required:true
        }
    },
    payment:{
        type:String,
        required:true
    },
    paymentresults:{
        paymentid:String,
        status:String,
        update_time:{String},
        email_address:String
    },
    shippingprice:{
        type:Number,
        required:true
    },
    paidat:Date,
    isdelivered:{
        type:Boolean,
        required:true
    },
    deliveredat:{
        type:Date
    }

},{timestamps:true})

const order=new mongoose.model("order",orderSchema)