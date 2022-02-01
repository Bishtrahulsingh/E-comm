


import Home from "@mui/icons-material/Home"
import { AppBar,
    Button,
    ButtonGroup,
    IconButton,  
    Toolbar, 
    Typography
} from "@mui/material"
import { useNavigate } from "react-router-dom"


const Storeappbar=()=>{
    const navigate=useNavigate()
    return(
        <>
           <AppBar >
                <Toolbar>
                    <IconButton onClick={()=>navigate("/")}>
                        <Home  />
                    </IconButton>
                    <Typography sx={{flexGrow:1}} ></Typography>
                    <ButtonGroup variant="contained" sx={{fontSize:"19vmin"}}  >
                        <Button onClick={()=>navigate("/E-commstore")}>All products</Button>
                        <Button onClick={()=>navigate("/E-commstore/createproduct")} >Create product</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </>
    )
}
export default Storeappbar