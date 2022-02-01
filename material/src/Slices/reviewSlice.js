

import {createSlice} from "@reduxjs/toolkit"
const initialState={
    data:[],
}

export const reviewSlice= createSlice({
    name:"reviewSlice",
    initialState,
    reducers:{
        reviewuserinfo:(state,{payload})=>{
            state.data=payload
        }
    }
})
export const {reviewuserinfo}=reviewSlice.actions
export default reviewSlice.reducer