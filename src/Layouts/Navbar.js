import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { auth } from "../Config/firebaseConfig"; // ✅ Firebase Auth Import
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     navigate("/signin"); // ✅ Redirect to signin page
  //   } catch (error) {
  //     console.error("Error signing out:", error);
  //   }
  // };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-[#69cea9] p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h1 className="text-xl font-bold">Navodaya Medicals </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/about" className="hover:text-gray-200">About</Link>
          <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          
          <Link to="/signin" className="hover:text-gray-200">Sign In</Link>
        </div>

        {/* Sign Up Button */}
        <button>
          <Link to="/signup" className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            <LogOut size={20} /> Sign Up
          </Link>
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#69cea9] text-white z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 flex justify-between">
          <h2 className="text-lg font-bold">Navigation</h2>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div> 
        <ul className="space-y-4 p-4">
          <li><Link to="/" className="block p-2 hover:bg-blue-500 rounded" onClick={toggleSidebar}>Home</Link></li>
          <li><Link to="/about" className="block p-2 hover:bg-blue-500 rounded" onClick={toggleSidebar}>About</Link></li>
          {/* <li><Link to="/services" className="block p-2 hover:bg-blue-500 rounded" onClick={toggleSidebar}>Services</Link></li> */}
          
          <li><Link to="/contact" className="block p-2 hover:bg-blue-500 rounded" onClick={toggleSidebar}>Contact</Link></li>
          <li><Link to="/signin" className="block p-2 hover:bg-blue-500 rounded" onClick={toggleSidebar}>Signin</Link></li>
        </ul>
      </div>

      {/* Overlay for Sidebar (Full Screen Click to Close) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
