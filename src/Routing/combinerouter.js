import React, { useState, useEffect, useMemo } from "react";
import { auth } from "../Config/firebaseConfig"; // Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

import Allrouter from "./Allrouter";         // Public Routes (Signup, Login, etc.)
import UserRouter from "./userdashbordrouter"; // Authenticated User Dashboard

const Combinerouter = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for Firebase Authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Optimize Routing based on User State
  const RouterComponent = useMemo(() => (user ? <UserRouter /> : <Allrouter />), [user]);

  // Loading UI (Better UX)
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{RouterComponent}</>;
};

export default Combinerouter;
