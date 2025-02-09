import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut,  } from "lucide-react"; // Icons
import { auth } from "../Config/firebaseConfig"; // Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth"; // Firebase signout

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ setUser] = useState(null);
  const navigate = useNavigate();

  // Firebase authentication state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Setting user state
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin"); // Redirect after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-[#69cea9] p-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <button onClick={toggleSidebar} className="md:hidden">
            {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <h1 className="text-xl font-bold">Navodaya Medicals </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300 flex items-center gap-2">
             Home
          </Link>
          <Link to="/myappointment" className="hover:text-gray-300 flex items-center gap-2">
              Myappointment
          </Link>
          <Link to="/appointment" className="hover:text-gray-300 flex items-center gap-2">
          Appointment
          </Link>
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
         
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#69cea9] z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden shadow-lg`}
      >
        <div className="p-4 flex justify-between">
          <h2 className="text-lg font-bold">Navigation</h2>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-4 p-4">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 hover:bg-gray-200 rounded"
              onClick={toggleSidebar}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/myappointment"
              className="block p-2 hover:bg-gray-200 rounded"
              onClick={toggleSidebar}
            >
            Myappointment
            </Link>
          </li>
          <li>
            <Link
              to="/appointment"
              className="block p-2 hover:bg-gray-200 rounded"
              onClick={toggleSidebar}
            >
              Appointment
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
