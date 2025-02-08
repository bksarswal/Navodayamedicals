import { useState, useEffect } from "react";
import { Trash2, CalendarCheck } from "lucide-react";
import { auth, db, collection, query, where, getDocs, deleteDoc, doc } from "../Config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function MyAppointments() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listen for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchAppointments(currentUser.uid);
      } else {
        setAppointments([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user appointments from Firestore
  const fetchAppointments = async (userId) => {
    setLoading(true);
    const appointmentsRef = collection(db, `users/${userId}/appointments`);
    const q = query(appointmentsRef);
    const querySnapshot = await getDocs(q);

    const fetchedAppointments = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setAppointments(fetchedAppointments);
    setLoading(false);
  };

  // Function to cancel (delete) an appointment
  const handleCancelAppointment = async (appointmentId) => {
    if (!user) return;

    const confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, `users/${user.uid}/appointments`, appointmentId));
      alert("Appointment cancelled successfully!");
      fetchAppointments(user.uid); // Refresh the list
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("Failed to cancel appointment.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <CalendarCheck size={24} /> My Appointments
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-center text-gray-500">You have no booked appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment.id} className="p-4 border border-gray-300 rounded-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{appointment.date} at {appointment.time}</p>
                <p className="text-sm text-gray-600">{appointment.message || "No additional notes"}</p>
              </div>
              <button
                onClick={() => handleCancelAppointment(appointment.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
