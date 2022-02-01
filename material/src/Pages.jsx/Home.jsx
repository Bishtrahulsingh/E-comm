

import { useEffect } from 'react'
import { useState } from 'react'
import Navbar from "../components/Navbar"
import Product from '../components/Product'
import "../css/pagescss/home.css"
import {api} from "../api"
import { Logindata } from '../Slices/Loginuserdata'
import { useDispatch } from 'react-redux'


const Home = ()=>{


    const[userimage,setUserimage]=useState("")

    const dispatch=useDispatch()
    const [product,setProduct]=useState([])
    useEffect(async()=>{
     
        const response=await api.get("/products")
        setProduct(response.data.product)

        const userautologin=await api.post(`/jwtuserautologin`)
        dispatch(Logindata(userautologin.data))

        const image=await api.get(`/profile/${userautologin.data._id}`)
        
        setUserimage(image.data.url)
        
    },[])

    return(     
        <>


        

        <Navbar userimage={userimage} />
        {product.map((value)=>{
               return <Product key={value._id} product={value} />
         })}
         
       
       </> 
    )
}
export default Home