

import {Paper, Rating, Typography} from "@mui/material"
const Readreview=(props)=>{

    const {commentatorusername,comment,rating}=props.review


    return(
        <>

        <Paper sx={{marginY:"20px",padding:"10px"}}>

            <small>{commentatorusername}</small>
            <Typography></Typography>

            <Rating  value={Number(rating)} precision={0.5}   readOnly />
            <Typography variant="body1">{comment}</Typography>

        </Paper>
        
        </>
    )
}

export default Readreview