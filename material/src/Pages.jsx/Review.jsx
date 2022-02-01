import { Divider } from "@mui/material"
import { useEffect, useState } from "react"
import Makereview from "../components/Makereview"
import Readreview from "../components/Readreview"
import Reviewappbar from "../components/Reviewappbar"
import {api} from "../api"
import {useSelector} from "react-redux"





const Review=()=>{

  const[reviews,setReviews]=useState([])

  const {productid}=useSelector(state=>state.review.data)


  useEffect(async()=>{

    const response=await api.get(`/getreviews/${productid}`)
    setReviews(response.data)

  },[])



    return(
        <>
          <Reviewappbar/>
          <Divider/>
          <Makereview/> 

           {reviews.map(x=>{
                return <Readreview key={x._id}  review={x} />
           })}
         

        </>
    )
}
export default Review