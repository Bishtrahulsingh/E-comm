import { Avatar, 
    Paper,
    Divider,
    TextField,
    Input,
    Button
   

} from "@mui/material"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux"
import {api} from "../api"
import {useNavigate} from "react-router-dom"



const Profile=()=>{


    const navigate=useNavigate()
    const [profileimg,setProfileimg]=useState("")

    const [small,setSmall]=useState(false)
    const formdata=new FormData()
    const [image,setImage]=useState() 
    formdata.append("file",image)
    const {username,email,_id}=useSelector(state=>state.userdata.data)


    useEffect(async()=>{

     const imageurl=await api.get(`/profile/${_id}`)
     setProfileimg(imageurl.data.url)

    },[])

    const onupload=async()=>{
        await api.post(`/edituserprofile/${_id}`,formdata)
        setSmall(true)
        navigate("/")
    }



    return(
        <>
           <Paper sx={{height:"100vh",display:"flex",flexDirection:"column",alignItems:'center'}} >
                <Avatar sx={{width:"30vh",height:"30vh",marginBottom:"10px"}} src={profileimg}  />
                <h2>hello , {username}</h2>
                <Divider sx={{border:"solid 1px",width:'90vw'}}/>
                <TextField focused disabled defaultValue={username} label="username" variant="outlined" sx={{marginTop:"15px"}}/>
                <TextField focused disabled defaultValue={email} label="email" variant="outlined" sx={{marginTop:"15px",marginBottom:"15px"}}/>
                <h3>select image here</h3>
                <Input onChange={(e)=>setImage(e.target.files[0])} accept="image/*"  multiple type="file"  sx={{marginTop:"15px",marginBottom:"15px"}} />
                <Button variant="contained" onClick={()=>onupload()} >Upload image</Button>
                {small && <small style={{color:"red"}} >changes will be updated soon</small>}
               
           </Paper>
        </>
    )
}
export default Profile