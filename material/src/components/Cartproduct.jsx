import { Toolbar,
Paper,
Button,
Typography,
 } from "@mui/material"
import { useEffect,useState } from "react"
import { api } from "../api"


const Cartproduct=(props)=>{

     const [img,setImg]=useState("")
     const {product_id}=props.cart

    
     
     useEffect(async()=>{
         const response=await api.get(`/getitemimage/${product_id}`)
         setImg(response.data)
     })

 



     return(
         <>


         <Paper>
             <Toolbar>
                 <img src={img} alt="hello" style={{width:"15vw"}} />
                 <Typography sx={{flexGrow:1}}></Typography>
                 
                 <Button>Buy</Button>
             </Toolbar>
         </Paper>
          
         
         </>
     )
   
}
export default Cartproduct