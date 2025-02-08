import React from 'react'

import { Routes,Route } from 'react-router-dom'

import Navbar from '../Layouts/Navbar'

import Home from '../Screens/home'
import Signup from '../Screens/signup'
import Signin from '../Screens/signin'
import SignOutButton from '../Screens/signout'
import ResetPassWord from '../Screens/resetpass'
import PageNotFound from '../Screens/Pagenotfound'

import Footer from '../Layouts/footer'
import Contact from '../Screens/Contact'
import About from '../Screens/About'
const Allrouter = () => {
  return (
    <div> 
      
        <Navbar/> 
    <Routes>
     <Route   path='/' element={<Home/>}  />
     <Route   path='/home' element={<Home/>}  />
    
     
     <Route   path='/signup' element={<Signup/>} />
     <Route   path='/signin' element={<Signin/>}/>
     <Route   path='/signout' element={<SignOutButton/>}/>
     <Route   path='/resetpassword' element={<ResetPassWord/>}/>
     <Route   path='/contact' element={<Contact/>}/>
     <Route   path='/about' element={<About/>}/>
    
     <Route   path='*' element={<PageNotFound/>}  />
     
    
    
     
    </Routes>
    
    <Footer/>
    </div>
  )
}

export default Allrouter