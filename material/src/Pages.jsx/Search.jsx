import { AppBar, Button, TextField, Typography,Toolbar,
IconButton } from "@mui/material"
import Home from "@mui/icons-material/Home"
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {api} from "../api"
import { useState } from "react"
import Product from "../components/Product"



const Search=()=>{

    const [data,setData]=useState([])
    const [search,setSearch]=useState("")



    const onsubmit=async()=>{
         
        const response=await api.get(`/searchapi/${search}`)
        setData(response.data)
    }

    const navigate=useNavigate()
    return(
        <>
           <AppBar sx={{bgcolor:'white',height:"15vh",display:"flex",alignitems:"center",justifyContent:"center"}}>
               <Toolbar>
               
                <IconButton  onClick={()=>navigate('/')} >
                   <Home/> 
                </IconButton>
                <Typography sx={{flexGrow:1}}></Typography>
               <TextField onChange={(e)=>setSearch(e.target.value)} label="search category here" /><Button onClick={()=>onsubmit()} sx={{marginLeft:'2px'}} variant="contained">search</Button>
               </Toolbar>
           </AppBar>

           {data.map(x=>{
               return <Product key={x._id} product={x} />
           })}
        </>
    )
}
export default Search