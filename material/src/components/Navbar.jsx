


import { AppBar,
     Button,
     Typography,
     ButtonGroup,
     Toolbar,
     IconButton,
     Avatar,
     Menu,
     MenuItem,
     Divider,
     FormControlLabel,
     ListItemIcon,
     ListItemText,
     Container,
     Hidden
    
     }from "@mui/material"
import Home from "@mui/icons-material/Home"
import Cart from "@mui/icons-material/ShoppingCart"
import Account from "@mui/icons-material/AccountCircle"
import AAccount from "@mui/icons-material/AddCircleOutline"
import Logout from "@mui/icons-material/Logout"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import { useNavigate} from "react-router-dom"
import "../css/componentcss/navbar.css"
import {useSelector}from "react-redux"
import {api} from "../api"

const Navbar=(props)=>{




    const storedata=useSelector(state=>state.userdata.data)
    const {username,_id}=storedata
    

  



    const navigate=useNavigate()


    
 const [open,setOpen]=useState(null)
 const handleOpen=(e)=>{
     setOpen(e.currentTarget)
 }
 const handleClose=()=>{
     setOpen(false)
 } 

 const logout=async()=>{
     await api.post(`/logout/${_id}`)
 }



    return(
        <>
        
           <AppBar  elevation={8} position="fixed" sx={{bgcolor:"white",color:'black'}} >


               <Toolbar color="Black" >
                   <Typography variant="h4" sx={{flexGrow:1,fontSize:"3vmax"}}>E-comm</Typography>
                   
                


                   <Hidden smDown={true} >
                   <ButtonGroup variant="text" color="inherit" >
                       <Button onClick={()=>navigate("/")} startIcon={<Home/>} >Home</Button>
                       <Button onClick={()=>navigate("/usercart")} startIcon={<Cart/>}>cart</Button>
                       <IconButton onClick={handleOpen} >
                           <Avatar  src={props.userimage}  />
                       </IconButton>
                   </ButtonGroup>
                   </Hidden>
                   <Hidden smUp>
                   <Button  color="inherit" sx={{mr:"20px"}} onClick={()=>navigate("/usercart")} startIcon={<Cart/>}>cart</Button>
                       <MenuIcon onClick={handleOpen}/>
                   </Hidden>
               </Toolbar>
               <div>
               <Button   onClick={()=>navigate("/searchitem")} variant="contained">search items</Button>
               </div>
           </AppBar>   


            


          <Menu  open={Boolean(open)} anchorEl={open} onClose={handleClose} PaperProps={{style:{width:210}}}>
             
            
             <Container
              sx={{bgcolor:"black",
              display:"flex", 
              justifyContent:'center', 
              color:'white'}} >
                  <MenuItem onClick={()=>{
                      navigate("/edituserprofile")
                  }} ><FormControlLabel  control={<Avatar src={props.userimage}  />} label="edit profile ...." labelPlacement="bottom" ></FormControlLabel></MenuItem></Container>
            
            
            
              
              <MenuItem onClick={()=>{
                  handleClose()
                  return navigate("/Login")
              }}>
              <ListItemIcon><Account/></ListItemIcon>
              <ListItemText>Login</ListItemText>
              </MenuItem>

              
              <MenuItem onClick={()=>{
                  handleClose()
                  return navigate("/Signup")
              }}><ListItemIcon><Account/></ListItemIcon>
              <ListItemText>Signup</ListItemText></MenuItem>
              


              <Divider variant="middle" sx={{border:"solid 1px black"}}/>

              
              <MenuItem onClick={()=>{
                  handleClose()
                  return navigate("/E-commstore")
              }}><ListItemIcon><AAccount/></ListItemIcon>
              <ListItemText>E-comm Store</ListItemText></MenuItem>
             


              
              <MenuItem onClick={()=>{
                  handleClose()
                  logout()
                  return navigate("/Login")
              }}><ListItemIcon><Logout/></ListItemIcon>
              <ListItemText>Logout</ListItemText>
              </MenuItem>
              <Divider variant="middle" sx={{border:"solid 1px black"}}/>
    

              <MenuItem >
              <ListItemText sx={{color:'blue'}} >@{username}</ListItemText>
              </MenuItem>
             
              
          </Menu>
          

        </>
    )
}
export default Navbar