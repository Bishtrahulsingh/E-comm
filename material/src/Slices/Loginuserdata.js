
import {createSlice} from "@reduxjs/toolkit"
const initialState={
    data:[],
}

export const Loginuserdata= createSlice({
    name:"Loginuserdata",
    initialState,
    reducers:{
        Logindata:(state,{payload})=>{
            state.data=payload
        }
    }
})
export const {Logindata}=Loginuserdata.actions
export default Loginuserdata.reducer