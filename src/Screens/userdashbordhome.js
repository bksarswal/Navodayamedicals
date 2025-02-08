import { useState, useEffect } from "react";
import { User, BarChart, DollarSign, Users, Briefcase, Activity } from "lucide-react";
import { auth } from "../Config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardHome() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      {/* <div className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center gap-3">
          <User size={28} className="text-blue-600" />
          <span className="text-gray-700 font-medium">
            {user ? user.displayName || "Admin" : "Guest"}
          </span>
        </div>
      </div> */}

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">1,245</p>
          </div>
          <Users size={32} className="text-blue-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold text-green-600">$32,000</p>
          </div>
          <DollarSign size={32} className="text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-600">Active Sessions</h3>
            <p className="text-3xl font-bold text-yellow-600">350</p>
          </div>
          <Activity size={32} className="text-yellow-500" />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <BarChart size={24} className="text-blue-500" /> Analytics Overview
          </h3>
          <p className="mt-2 text-gray-600">Your monthly performance has increased by <span className="text-green-600 font-bold">18%</span></p>
          <div className="mt-4 h-32 bg-gray-200 rounded"></div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Briefcase size={24} className="text-purple-500" /> Recent Transactions
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="flex justify-between">
              <span className="text-gray-700">Payment Received</span>
              <span className="text-green-600 font-bold">+ $1,200</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Subscription Renewed</span>
              <span className="text-red-600 font-bold">- $299</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">New Order</span>
              <span className="text-green-600 font-bold">+ $850</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
