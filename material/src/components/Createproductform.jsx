import { 
    TextField,
    Button
 } from "@mui/material"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { api } from "../api"
import {useNavigate} from "react-router-dom"
import {useSelector} from "react-redux"



const Createproductform=()=>{


    const {_id}=useSelector(state=>state.userdata.data)
    const navigate=useNavigate()
    const [product_idstate,setProduct_idstate]=useState("")
    const [imgError,setImgError]=useState(false)
    const [formerror,setFormerror]=useState(false)
    const [saved ,setSaved]=useState(false)
    const [image,setImage]=useState("")
    const formdata=new FormData()
    formdata.append("file",image)


    const {register,handleSubmit,formState:{errors} }=useForm()


     
    

    const onsubmit=async(data)=>{
       try {
      const response= await api.post(`/createproduct/${_id}`,data)
        setSaved(true)
        const  product_id=response.data._id 
        setProduct_idstate(product_id)
       } catch (error) {
           setFormerror(true)
       }
    }

    const onupload=async(data)=>{
        
        try {
            await api.put(`/editproduct/${product_idstate}`,formdata)
            navigate("/E-commstore")
        } catch (error) {
            setImgError(true)
        }
        
    }



    return (
        <>
            <div style={{display:"flex",flexDirection:'column',alignItems:'center'}} >


                 {formerror&&<small style={{color:"red",marginY:'2px'}} >please enter a valid data</small>}
                 <TextField label="product category" {...register("category",{required:true,minLength:3})} focused sx={{width:"300px",marginY:2}} />
                {errors.category && <small style={{color:"red"}} >product category is required</small>}



                 <TextField label="product title" {...register("title",{required:true,minLength:3})} focused sx={{width:"300px",marginY:2}} />
                {errors.title && <small style={{color:"red"}} >title is required</small>}



                <TextField label="product price" {...register("price",{required:true,maxLength:6})} focused sx={{width:"300px",marginY:2}} />
                 {errors.price && <small style={{color:"red"}} >price is required</small>}



                 <TextField label="Stock" {...register("stock",{required:true,minLength:1})} focused sx={{width:"300px",marginY:2}} />
                 {errors.stock && <small style={{color:"red"}} >stock is required</small>}



                 <small>product discription goes here</small>
                 <textarea label="product discription" {...register("discription",{required:true,minLength:3})} style={{width:"300px",outline:'none',marginBottom:'20px'}} />
                 {errors.discription && <small style={{color:"red"}} >product discription is required</small>}
                 <Button variant="contained" onClick={handleSubmit(onsubmit)} >Save product </Button>
                    

                 {imgError&&<small style={{color:"red",marginY:'2px'}} >image not found</small>}
                  {saved && <small style={{margin:"20px,0"}} >uploading image is required </small>}
                  {saved && <input type="file" onChange={(e)=>setImage(e.target.files[0])} />}
                  {saved && <Button onClick={()=>onupload()} >upload image</Button>}
                  
                 
            </div>
        </>
    )
}
export default Createproductform