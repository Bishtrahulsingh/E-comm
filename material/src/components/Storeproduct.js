
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
import Delete from '@mui/icons-material/Delete'
import { useNavigate} from "react-router-dom"
import { api } from "../api"






const Storeproduct =(props)=>{
    const navigate=useNavigate()

    const {_id,image,title,price,rating}=props.product




    const deleteproduct=async()=>{


        await api.delete(`/deleteproduct?id=${_id}`)
        navigate("/")
    }


    return(
        <>

           <Paper elevation={0}  sx={{display:"flex",
           flexWrap:"wrap",
           width:"80vw",
           alignItems:'center',
           justifyContent:"space-around" ,
           position:"relative",
           left:'10vw',
           marginTop:'90px',
           marginBottom:'12px'}}>
               <img src={image.url} alt="" style={{width:"60vw"}} />
               <Box  sx={{marginBottom:3}} >
               <Typography variant="h6">{title}</Typography>
               <Rating precision={0.5} value={Number(rating)} readOnly />
                <div>

               <Typography variant="h6">rs. {price}</Typography>

                </div>
               </Box>
               <Button onClick={()=>deleteproduct()} variant="outlined"color="secondary" endIcon={<Delete/>} >Delete product</Button>
           </Paper>
           <Divider/>
       
        </>
    )
}
 
export default Storeproduct 