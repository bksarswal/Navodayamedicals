import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Send } from "lucide-react";
import { db } from "../Config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function ContactForm() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();

  // Handle Contact Form Submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "contacts"), {
        name: contact.name,
        email: contact.email,
        message: contact.message,
        timestamp: new Date(),
      });

      alert("Message Sent Successfully! 🚀");

      // ✅ Input fields clear
      setContact({ name: "", email: "", message: "" });

      // ✅ Navigate after slight delay (smooth UX)
      setTimeout(() => {
        navigate("/home");
      }, 500);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message.");
    }
  };

  return (
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
  );
}
