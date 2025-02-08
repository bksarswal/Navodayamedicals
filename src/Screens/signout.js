
import React from "react";
import { auth } from "../Config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
      navigate("/signin"); // Redirect to signin page
    } catch (error) {
      console.error("Sign out error:", error.message);
      alert("Error signing out!");
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
