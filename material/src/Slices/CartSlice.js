



import { createSlice } from '@reduxjs/toolkit'


const initialState = { value: 1 } 

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++
      
    },
    decrement(state) {
      if(state.value>=1){
      state.value--
      }
    },
    incrementbyvalue(state,{payload}){
      state.value=payload
    }
  },
})

export const {increment, decrement,incrementbyvalue } = counterSlice.actions
export default counterSlice.reducer