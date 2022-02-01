


import Storeproduct from "../components/Storeproduct"
import Storeappbar from "../components/Storeappbar"
import { useEffect, useState } from "react"
import {api} from "../api"
import { useSelector } from "react-redux"



const Store=()=>{


    const {_id}=useSelector(state=>state.userdata.data)

    const [product,setProduct]=useState([])

   useEffect(async()=>{

    const userproduct=await api.get(`/userproducts/${_id}`)
     setProduct(userproduct.data)
   },[])


    return (
        <>
            <div>
            <Storeappbar/>
            
            {product.map(x=>{
                 return <Storeproduct key={x._id} product={x}    />
             })}



            </div>
        </>
    )
}
export default Store