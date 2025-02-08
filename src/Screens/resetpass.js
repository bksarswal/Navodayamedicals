import React, { useState } from "react";
import { auth } from "../Config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
      setTimeout(() => navigate("/signin"), 3000); // Redirect to signin page after 3 sec
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full rounded-[30px] bg-[#F2FAFA] p-8">
        <h2 className="text-[48px] font-bold text-center mb-8 font-poppins">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2196F3] font-poppins text-[16px]"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#2196F3] text-white py-3 rounded-xl hover:bg-[#1976D2] focus:outline-none focus:ring-2 focus:ring-[#2196F3] focus:ring-offset-2 transition-colors font-poppins text-[18px]"
            >
              Send Reset Email
            </button>
          </div>
        </form>
        {message && <p className="text-center text-[#2196F3] mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
