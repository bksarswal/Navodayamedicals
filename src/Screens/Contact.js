import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, Home, Phone, Send } from "lucide-react";
import { auth, db } from "../Config/firebaseConfig"; // Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  // Firebase authentication state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Handle Contact Form Submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please sign in to submit the form.");
      return;
    }

    try {
      await addDoc(collection(db, `users/${user.uid}/contacts`), {
        ...contact,
        timestamp: new Date(),
      });

      alert("Message Sent Successfully! 🚀");
      setContact({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding contact:", error);
      alert("Failed to send message.");
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
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300 flex items-center gap-2">
            <Home size={20} /> Home
          </Link>
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2">
              <User size={24} className="text-blue-400" />
              <span className="text-gray-200">{user.displayName || "User"}</span>
            </div>
          )}
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
        className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${
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
            <Link to="/dashboard" className="block p-2 hover:bg-gray-200 rounded" onClick={toggleSidebar}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/analytics" className="block p-2 hover:bg-gray-200 rounded" onClick={toggleSidebar}>
              Analytics
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block p-2 hover:bg-gray-200 rounded" onClick={toggleSidebar}>
              Settings
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>
      )}

      {/* Contact Form Section */}
      <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Phone size={24} /> Contact Us
        </h2>
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 border border-gray-300 rounded"
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#69cea9] flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md hover:bg-[#57b996] transition"
          >
            <Send size={20} /> Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
