import React, { useState } from 'react';

import { auth } from '../Config/firebaseConfig';

import { createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigate } from 'react-router-dom';




const Signup = () => {

   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    createUserWithEmailAndPassword(auth, formData.email, formData.password).then((res)=>{

    alert("signup")
    navigate("/signin")

    }).catch((err)=>{
      alert(err)
    })

  
  };

  const handleGooglesignup= () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="min-h-screen max-h-screen mt-16 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-[30px] bg-[#69cea9] p-8 relative">
        {/* Close button */}
        <button className="absolute top-6 right-6 text-black hover:text-gray-700">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h2 className="text-[48px] font-bold text-center mb-8 font-poppins">Signup</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
                placeholder="Email"
              />
            
            </div>

            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
                placeholder="Password"
              />
            </div>

            <div className="text-center">
              <a href="/resetpassword" className="text-[#2196F3] hover:text-[#1976D2] font-poppins">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
           
              className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 disabled:opacity-50 transition-colors font-poppins text-[18px]"
            >
             signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default  Signup;
