
import { Button,
    Divider,
    Paper,
    TextField,
    Typography,
    } from "@mui/material"
import "../css/pagescss/login.css"
import Account from "@mui/icons-material/AccountCircle"
import { useForm } from "react-hook-form"
import {Link,useNavigate} from "react-router-dom"
import {api} from "../api"
import { useState } from "react"


const Signup=()=>{
    const navigate=useNavigate()

   const [showerr,setShowerr]=useState(false)
   const {register,handleSubmit,formState:{errors},getValues}=useForm()

   const onsubmit =async(data)=>{
      

    try {
        await api.post("/createuser",data)
        setShowerr(false)
        navigate("/Login")
    } catch (error) {
        setShowerr(true)
    }

}
   
   

   return(
       <>
         
        <div id="lwrap" >

        <Paper   sx={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center', width:'300px', height:'490px', paddingBottom:'4px' }}>
             <Button variant="text"  startIcon={<Account/>}><h2>Sign Up</h2></Button>


             {showerr && <small style={{color:"red"}} >email already exist login here</small>}
             <TextField label="username" placeholder="username" {...register("username",{required:true,minLength:3})} focused/>
             {errors.username && <small style={{color:"red"}} >username is required with min 3 charachter</small>}



             <TextField label="email" placeholder="email" {...register("email",{required:true,minLength:3,pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})} focused/>
             {errors.email && <small style={{color:"red"}} >a valid email is required</small>}



             <TextField label="password" placeholder="password" type="password" {...register("password",{required:true,minLength:5})} focused/>
             {errors.password && <small style={{color:"red"}} >password is required with min 5 charachter</small>} 



             <TextField label="repeatPassword" placeholder="repeatPassword" type="password" {...register("repeatpassword",{required:true,minLength:5,validate:value=>value===getValues("password")})} focused/>
             {errors.repeatpassword && <small style={{color:"red"}} >didn't match with password</small>}



             <Button type="submit" variant="outlined" color="secondary" onClick={handleSubmit(onsubmit)} >Signup</Button>
             <Divider  sx={{width:'250px'}} >or</Divider>
             <Typography variant="body2">Already registered?<Link to="/Login"><Button>Login here</Button></Link></Typography>
                         
         </Paper>

        </div>
       
       </>
   )



}
export default Signup