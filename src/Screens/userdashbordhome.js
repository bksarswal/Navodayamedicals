import { useState, useEffect } from "react";
import { Calendar, User } from "lucide-react";
import { auth, db } from "../Config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser.uid);
        await fetchAppointments(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch user data from Firestore
  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.error("User data not found!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ✅ Fetch user's appointments from Firestore
  const fetchAppointments = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/appointments`));
      const appointmentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appointmentsList);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      {/* Logged-in User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <User size={48} className="text-blue-500" />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {userData ? userData.name : "Loading..."}
          </h2>
          <p className="text-gray-600">{userData ? userData.email : "No email found"}</p>
        </div>
      </div>

      {/* My Appointments Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Calendar size={24} className="text-blue-500" /> My Appointments
        </h3>
        {appointments.length === 0 ? (
          <p className="text-gray-600 mt-2">No appointments found.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {appointments.map((appointment) => (
              <li key={appointment.id} className="border p-4 rounded-lg flex justify-between bg-gray-50">
                <div>
                  <h4 className="font-semibold text-gray-700">{appointment.name}</h4>
                  <p className="text-gray-600 text-sm">{appointment.date} at {appointment.time}</p>
                  <p className="text-gray-500 text-sm">{appointment.message}</p>
                </div>
                <span className="text-green-600 font-bold">✓ Confirmed</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
