import { Button, Divider, FormControlLabel, Rating, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import {api} from "../api"
import {useNavigate} from "react-router-dom"
import {useSelector} from 'react-redux'
import { useState } from "react"



const Makereview=()=>{

    const [rating,setRating]=useState(0)
    const {username}=useSelector(state=>state.userdata.data)
    const {productid}=useSelector(state=>state.review.data)
    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors}}=useForm()



    if(rating==0){
        setRating(2.5)
    }


    const onsubmit =async(data)=>{

        
    
           const userdata={
               ...data,
                 rating,
               commentatorusername:username

           }
            const response=await api.post(`/createreview/${productid}`,userdata)
            
            navigate("/")
        
     }



    return(
        <>

        <Typography align="center">*Rating with comments are required</Typography>
        <Divider sx={{marginBottom:"20px"}}/>
        <div style={{display:"flex",flexDirection:'column',alignItems: "center",marginBottom:"50px"}}>
        <FormControlLabel control={<Rating  onChange={(e)=>setRating(e.target.value)} defaultValue={2.5} precision={0.5} />}labelPlacement="start" label="Rating here" />
        <Typography/>
        <FormControlLabel control={<textarea {...register("comment",{required:true})}  />}labelPlacement="start" label="message here" />
        {errors.comment&&<small style={{marginTop:"10px",color:'red'}}>both field are required</small>}
        
        </div>
        <Button onClick={handleSubmit(onsubmit)} sx={{marginLeft:"50vw",marginBottom:'20px'}} variant="outlined" >save review</Button>
        <Divider sx={{marginBottom:"20px"}}/>
        
        </>
    )
}
export default Makereview