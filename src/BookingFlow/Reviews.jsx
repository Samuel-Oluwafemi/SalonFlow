import {db} from "../firebase"; // my database
import { collection, addDoc } from "firebase/firestore"; // collection -> where data is stored, addDoc-> function to save data.
import { Navbar } from "../Navbar/Navbar";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";

const Reviews = ({
  selectedService,
  selectedName,
  selectedEmail,
  selectedPhone,
  selectedDate,
  selectedTime,
  onBack = () => {},
}) => {

  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Get current time to determine greeting
  let greeting = "";
  const hour = new Date().getHours();
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour <= 16) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const handleConfirm = async () => {
    setIsSending(true);

    // create booking data object to save to Firestore and send via EmailJS
    const bookingData = {
      service: selectedService?.name ?? "N/A",
      name: selectedName,
      email: selectedEmail,
      phone: selectedPhone,
      date: selectedDate,
      time: selectedTime,
      createdAt: new Date()
    };
    try {
      // STEP 1: Save to firebase first
      await addDoc(collection(db, 'bookings'), bookingData);
      console.log("Booking saved to Firestore:", bookingData);



      // STEP 2: Send confirmation email to customer via EmailJS
      await emailjs.send(
        'service_8noa3te', // replace with your EmailJS service ID
        'template_7yyjbca', // replace with your EmailJS template ID
        {
          customer_name: selectedName,
          customer_email: selectedEmail,
          service_name: selectedService?.name ?? 'N/A',
          booking_date: selectedDate,
          booking_time: selectedTime,
          customer_phone: selectedPhone,
        },
        'AbT-uDvQJ20dCkqSz' // replace with your EmailJS public key
      );

      setSent(true);
    } catch (error) {
      console.error('EmailJS error:', error);
      // Even if email fails still redirect to WhatsApp

  } finally {
      setIsSending(false)

  // Handle confirm booking - open WhatsApp with pre-filled message
    const name = selectedName ?? "N/A";
    const phone = selectedPhone ?? "N/A";
    const message = `I want to book ${selectedService?.name ?? "a service"} 
    on ${selectedDate ?? "N/A"} at ${selectedTime ?? "N/A"}.`;
    const text = `Hello, ${greeting}. My name is ${name}. My phone number is ${phone}. ${message}`;
    const whatsappNumber = "2348102409849"; // replace with your WhatsApp number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  }
};

  return (
    <section className="min-h-screen mx-auto py-10 md:pt-28 pt-28">
      <Navbar />
      <main className="md:px-30 md:px-3 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          Review Your Booking Details
        </h1>
        {/* Service details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg py-8 px-6"
        >
          <h2 className="text-xl font-semibold mb-4">Service Details</h2>
          <p className="mb-2">
            <span className="font-medium">Service:</span> {selectedService.name}
          </p>
          <p className="mb-2">
            <span className="font-medium">Date:</span> {selectedDate}
          </p>
          <p className="mb-2">
            <span className="font-medium">Time:</span> {selectedTime}
          </p>
          <p className="bg-gray-300 h-[1px]"></p>
          <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {selectedName}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {selectedEmail}
          </p>
          <p className="mb-2">
            <span className="font-medium">Phone No:</span> {selectedPhone}
          </p>
        </motion.div>
        <div className="flex gap-10 justify-center mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg 
            font-semibold text-lg hover:bg-gray-400 transition duration-300 
            cursor-pointer"
          >
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            disabled={isSending}
            className="bg-green-500 text-white px-6 py-3 rounded-lg 
            font-semibold text-lg hover:bg-green-600 transition duration-300
            cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Confirm Booking'}
          </motion.button>
        </div>
         {sent && (
          <p className="mt-6 text-green-600 font-medium">
            Confirmation email sent successfully.
          </p>
        )}
      </main>
    </section>
  );
};
export default Reviews;
