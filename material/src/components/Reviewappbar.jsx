


import {
    AppBar, IconButton, Toolbar, Typography,

} from "@mui/material"
import Home from "@mui/icons-material/Home"
import {useNavigate} from "react-router-dom"

const Reviewappbar=()=>{

    const navigate=useNavigate()

    return(
        <>
       <div style={{marginTop:'90px'}}>
        <AppBar  >
            <Toolbar>
            <Typography sx={{flexGrow:1}} variant="h4" >Reviews</Typography>
            <IconButton onClick={()=>{
                navigate("/")
            }} >
                <Home/>
            </IconButton>
            </Toolbar>
        </AppBar>
        </div>
        </>
    )
}
export default Reviewappbar