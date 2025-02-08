import { useState, useEffect } from "react";
import { Calendar, Send } from "lucide-react";
import { auth, db, collection, addDoc, query, where, getDocs } from "../Config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Appointment() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [appointment, setAppointment] = useState({
    name: "",
    email: "",
    mobile: "",
    date: "",
    time: "",
    message: "",
  });

  // Listen for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setAppointment((prev) => ({
          ...prev,
          email: currentUser.email || "",
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to check if the user has already booked on the selected date
  const checkExistingAppointment = async (selectedDate) => {
    if (!user) return false;

    const appointmentsRef = collection(db, `users/${user.uid}/appointments`);
    const q = query(appointmentsRef, where("date", "==", selectedDate));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Returns true if an appointment already exists
  };

  // Handle Appointment Form Submission
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
      alert("Please sign in to book an appointment.");
      setLoading(false);
      return;
    }

    if (!appointment.name.trim() || !appointment.mobile.trim()) {
      alert("Please fill in your name and mobile number.");
      setLoading(false);
      return;
    }

    // Validate selected date
    const selectedDate = new Date(appointment.date);
    if (selectedDate.getDay() === 0) {
      alert("Appointments cannot be booked on Sundays.");
      setLoading(false);
      return;
    }

    // Validate selected time
    const selectedHour = parseInt(appointment.time.split(":")[0], 10);
    if (selectedHour < 9 || selectedHour >= 17) {
      alert("Please select a time between 9:00 AM and 5:00 PM.");
      setLoading(false);
      return;
    }

    // Check if the user already has an appointment for the selected date
    const alreadyBooked = await checkExistingAppointment(appointment.date);
    if (alreadyBooked) {
      alert("You have already booked an appointment for this date.");
      setLoading(false);
      return;
    }

    try {
      await addDoc(collection(db, `users/${user.uid}/appointments`), {
        ...appointment,
        timestamp: new Date(),
      });

      alert("Appointment Booked Successfully! 🎉");
      setAppointment({ name: "", email: user.email || "", mobile: "", date: "", time: "", message: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-lg rounded-md">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Calendar size={24} /> Book an Appointment
      </h2>

      {!user ? (
        <p className="text-red-500 font-semibold text-center">
          ⚠️ You must be logged in to book an appointment.
        </p>
      ) : (
        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={appointment.name}
            onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
            value={appointment.email}
            readOnly
          />
          <input
            type="tel"
            placeholder="Your Mobile Number"
            className="w-full p-2 border border-gray-300 rounded"
            value={appointment.mobile}
            onChange={(e) => setAppointment({ ...appointment, mobile: e.target.value })}
            required
          />
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={appointment.date}
            onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
            required
          />
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded"
            value={appointment.time}
            onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
            required
          />
          <textarea
            placeholder="Additional Notes (Optional)"
            className="w-full p-2 border border-gray-300 rounded"
            value={appointment.message}
            onChange={(e) => setAppointment({ ...appointment, message: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="bg-[#69cea9] flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md hover:bg-[#57b996] transition disabled:opacity-50"
            disabled={loading}
          >
            <Send size={20} /> {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}
    </div>
  );
}
