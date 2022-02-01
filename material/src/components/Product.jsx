




import {
    Paper, 
    Rating, 
    Typography,
    Divider,
    Button
    
    
    } from "@mui/material"
    
import {
     Box } from "@mui/system"
import "../css/componentcss/product.css"
import Arrow from '@mui/icons-material/ArrowForward'
import { useNavigate} from "react-router-dom"
import {api} from '../api'
import { useState } from "react"
import {useSelector,useDispatch} from "react-redux"
import { reviewuserinfo } from "../Slices/reviewSlice"






const Product=(props)=>{

   


    const dispatch=useDispatch()
    const {_id,username}=useSelector(state=>state.userdata.data)
    const productid=props.product._id

    const [val,setVal]=useState(false)
    const navigate=useNavigate()


    const addtocart=async()=>{
        await api.post(`/createcartitem?user_id=${_id}&product_id=${productid}`,{value:1})
        setVal(true)
    }
    const checkreview=async()=>{

      dispatch(reviewuserinfo({username,productid}))
      navigate("/Review")


    }

    


    return(
        <>

           <Paper elevation={0}  sx={{display:"flex",
           flexWrap:"wrap",
           width:"70vw",
           alignItems:'center',
           justifyContent:"space-around" ,
           position:"relative",
           left:'10vw',
           marginTop:'20vh',
           marginBottom:'2px'}}>
               <img src={`${props.product.image.url}`} alt={props.product.category} style={{width:"50vw",marginBottom:"15px",marginRight:"20px"}} />
               <Box  sx={{marginBottom:3}} >
               <Typography variant="h5">{props.product.category}</Typography>
               <Typography variant="h6">{props.product.title} </Typography>
               <Rating precision={0.5} defaultValue={Number(props.product.rating)} readOnly />
                <div>

               <Typography variant="h6">rs. {props.product.price}</Typography>
              
               <Button variant="outlined" onClick={()=>{checkreview()}} endIcon={<Arrow/>}>
                   Check reviews
               </Button>
               

                </div>
               <Typography sx={{marginY:"5px"}} variant="body1">{props.product.discription}</Typography>
               <Button variant="outlined"color="secondary" onClick={()=>addtocart()} >Add to cart</Button>
               <Button onClick={()=>navigate("/buyproduct")} variant="outlined"color="secondary" >Buy now</Button>
               </Box>
               {val && <small style={{color:"red",marginTop:"2px"}} >added to cart</small>}

               
           </Paper>
           <Divider/>
       
        </>
    )
}
 
export default Product   