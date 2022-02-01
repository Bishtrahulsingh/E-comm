

import Home from './Pages.jsx/Home'
import Login from './Pages.jsx/Login'
import Signup from './Pages.jsx/Signup'
import './App.css';
import {Routes,Route} from "react-router-dom"
import Profile from './Pages.jsx/Profile';
import Createproduct from './Pages.jsx/Createproduct';
import Store from './Pages.jsx/Store';
import Cart from "./Pages.jsx/Cart"
import Review from './Pages.jsx/Review';
import Search from './Pages.jsx/Search'
import Underconstruction from "./Pages.jsx/Underconstruction"
function App() {



  
  return (
    <>
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/Login" element={<Login/>}/>
         <Route path="/Signup" element={<Signup/>}/>
         <Route path="/edituserprofile" element={<Profile/>}/>
         <Route path ="/E-commstore" element={<Store/>}/>
         <Route path ="/E-commstore/createproduct" element={<Createproduct/>}/>
         <Route path ="/usercart" element={<Cart/>}/>
         <Route path="/Review" element={<Review/>}/>
         <Route path="/searchitem" element={<Search/>}/>
         <Route path="/buyproduct" element={<Underconstruction/>}/>

       </Routes>
    </>
  )
}

export default App;
