


import counterSlice from "./Slices/CartSlice"
import Loginuserdata from "./Slices/Loginuserdata"
import {configureStore} from "@reduxjs/toolkit"
import reviewSlice from "./Slices/reviewSlice"

export const store=configureStore({

     reducer:{
        userdata:Loginuserdata,
        counter:counterSlice,
        review:reviewSlice
     },


})