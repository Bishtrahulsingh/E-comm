
import { Button,
     Divider,
     Paper,
     TextField,
     Typography,
     } from "@mui/material"
import "../css/pagescss/login.css"
import LoginIcon from "@mui/icons-material/LoginRounded"
import {Link} from "react-router-dom"
import { useForm } from "react-hook-form"
import {api} from "../api.js"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { Logindata } from "../Slices/Loginuserdata"


const Login=()=>{



    const dispatch=useDispatch()
    const logindata=useSelector(state=>state.userdata.data)
    
    
    
    
    const navigate=useNavigate()

    const[showerr,setShowerr]=useState(false)

    const {register,handleSubmit,formState:{errors}}=useForm()

    const onsubmit =async(data)=>{
        try {
            const response=await api.post("/loginuser",data)
            setShowerr(false)
            dispatch(Logindata(response.data))
            navigate("/")
        } catch (error) {
            setShowerr(true)
        }
     }
     


    return(
        <>
          
         <div id="lwrap" >

         <Paper   sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center', width:'300px', height:'390px', paddingBottom:'40px' }}>
              <Button variant="text"  startIcon={<LoginIcon/>}><h2>Login</h2></Button>


             {showerr && <small style={{color:"red"}} >email or password didn't match</small>}
              <TextField label="email" placeholder="email"  {...register("email",{required:true,minLength:3,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})} focused/>
             {errors.email && <small style={{color:"red"}} >a valid email is required</small>}


              <TextField label="password" placeholder="password" type="password" {...register("password",{required:true})} focused/>
             {errors.password && <small style={{color:"red"}} >this field is required</small>} 

               


              <Button type="submit" variant="outlined" color="secondary" onClick={handleSubmit(onsubmit)} >Login</Button>



              <Divider  sx={{width:'250px'}} >or</Divider>
              <Typography variant="body2">New user?<Link to="/Signup"><Button>Register here</Button></Link></Typography>
                          
          </Paper>

         </div>
        
        </>
    )



}
export default Login