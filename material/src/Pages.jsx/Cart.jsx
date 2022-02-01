import { useEffect,useState } from "react"
import Cartappbar from "../components/Cartappbar"
import Cartproduct from "../components/Cartproduct"
import {api} from '../api'
import { useSelector } from "react-redux"


const Cart=()=>{


    const {_id}=useSelector(state=>state.userdata.data)

    const [cartdata,setCartdata]=useState([])
    useEffect(async()=>{
        const cart=await api.get(`/getallcartitems/${_id}`)
        setCartdata(cart.data)
    },[])
    return(
        <>
           <Cartappbar/>
           {cartdata.map(x=>{
               return <Cartproduct  key={x._id} cart={x}  />
           })}
        </>
    )
}
export default Cart 