import React from 'react';

import {  Routes,Route } from 'react-router-dom'
import DashboardNavbar from '../Layouts/userdashbordNavbar';
import DashboardHome from '../Screens/userdashbordhome';
import Footer from '../Layouts/footer';
import MyAppointments from '../Screens/Myappointment';

import Appointment from '../Screens/Appointment';

const Dashboardrouter = () => {
  return (
    <div>  
  <DashboardNavbar/>
       <Routes>
        <Route path='/dashboard' element={<DashboardHome/>} />
        <Route path='/appointment' element={<Appointment/>} />
        <Route path='/myappointment' element={<MyAppointments/>} />
      
       </Routes>
   <Footer/>
    </div>
  )
}

export default Dashboardrouter