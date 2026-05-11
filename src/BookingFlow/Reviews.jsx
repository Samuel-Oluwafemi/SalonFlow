import { db } from "../firebase"; // my database
import { collection, addDoc } from "firebase/firestore"; // collection -> where data is stored, addDoc-> function to save data.
import { Navbar } from "../Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CheckCircle, AlertCircle, Briefcase, User, Calendar, Clock, MessageSquare, ChevronRight } from "lucide-react";

const Reviews = ({
  selectedService,
  selectedSubService,
  selectedName,
  selectedEmail,
  selectedPhone,
  selectedDate,
  selectedTime,
  onBack = () => {},
}) => {
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    console.log("handleConfirm started");
    setIsSending(true);
    setError(null);
    setSuccess(false);

    // create booking data object to save to Firestore
    const bookingData = {
      service: selectedService?.name ?? "N/A",
      subService: selectedSubService?.name ?? "N/A",
      subServicePrice: selectedSubService?.price ?? "N/A",
      name: selectedName,
      email: selectedEmail,
      phone: selectedPhone,
      date: selectedDate,
      time: selectedTime,
      status: "pending",
      createdAt: new Date(),
    };
    try {
      // STEP 1: Save booking to Firebase
      console.log("Step 1: Saving to Firestore...");
      console.log("Booking data:", bookingData);

      // Add timeout to catch hanging requests
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(new Error("Firebase request timed out after 10 seconds")),
          10000,
        ),
      );

      const docPromise = addDoc(collection(db, "bookings"), bookingData);
      const docRef = await Promise.race([docPromise, timeoutPromise]);

      console.log(
        "Step 1 Complete - Booking saved to Firestore with ID:",
        docRef.id,
      );

      // STEP 2: Open WhatsApp with booking confirmation
      console.log("Step 2: Opening WhatsApp...");
      const name = selectedName ?? "N/A";
      const phone = selectedPhone ?? "N/A";
      const message = `I want to book ${selectedService?.name ?? "a service"} 
      on ${selectedDate ?? "N/A"} at ${selectedTime ?? "N/A"}.`;
      const text = `Hello, ${greeting}. My name is ${name}. My phone number is ${phone}. ${message}`;
      const whatsappNumber = "2348102409849"; // replace with your WhatsApp number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
      console.log("Step 2 Complete - WhatsApp opened");
      setSuccess(true);
    } catch (error) {
      console.error("Error occurred:", error);
      console.error("Error message:", error.message);
      console.error("Error details:", error);
      setError(
        `Failed to complete booking: ${error.message || "Unknown error"}`,
      );
    } finally {
      setIsSending(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="min-h-screen mx-auto py-10 md:pt-28 pt-20 bg-gradient-to-br from-white via-purple-50 to-blue-50">
      <Navbar />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Review Your Booking
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please verify all details before confirming. You'll be connected to WhatsApp to complete the booking.
        </p>
      </motion.div>

      <div className="font-inter max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6 mb-8"
        >
          {/* Service Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gradient-to-r from-purple-200 to-blue-200 border-purple-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
                <Briefcase size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Main Service */}
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border-2 border-purple-200">
                <p className="text-sm font-semibold text-gray-600 mb-1">Main Service</p>
                <p className="text-2xl font-bold text-gray-900">{selectedService?.name}</p>
              </div>

              {/* Sub Service */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
                <p className="text-sm font-semibold text-gray-600 mb-1">Selected Option</p>
                <p className="text-lg font-bold text-gray-900">{selectedSubService?.name}</p>
                <p className="text-sm text-gray-600 mt-1 font-semibold">{selectedSubService?.price}</p>
              </div>

              {/* Date */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border-2 border-orange-200 flex items-center gap-3">
                <Calendar size={24} className="text-orange-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Date</p>
                  <p className="text-lg font-bold text-gray-900">{selectedDate}</p>
                </div>
              </div>

              {/* Time */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-4 border-2 border-cyan-200 flex items-center gap-3">
                <Clock size={24} className="text-cyan-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Time</p>
                  <p className="text-lg font-bold text-gray-900">{selectedTime}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Details Card */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-green-200"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-lg">
                <User size={28} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-600 mb-1">Full Name</p>
                <p className="text-lg font-bold text-gray-900">{selectedName}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
                <p className="text-sm font-semibold text-gray-600 mb-1">Email</p>
                <p className="text-sm font-semibold text-gray-900 break-all">{selectedEmail}</p>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 md:col-span-2">
                <p className="text-sm font-semibold text-gray-600 mb-1">Phone Number</p>
                <p className="text-lg font-bold text-gray-900">{selectedPhone}</p>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3"
              >
                <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-red-700">Booking Error</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 border-2 border-green-300 rounded-lg p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-4"
                >
                  <CheckCircle size={48} className="text-green-600" />
                </motion.div>
                <p className="text-xl font-bold text-green-700 mb-2">Booking Confirmed! 🎉</p>
                <p className="text-green-600">
                  Please complete the chat with the salon on WhatsApp to finalize your appointment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            disabled={isSending}
            className="w-full md:w-48 py-4 text-lg rounded-xl font-bold 
            bg-gray-300 text-gray-700 cursor-pointer hover:bg-gray-400 transition duration-300 disabled:opacity-50"
          >
            Back
          </motion.button>

          <motion.button
            whileHover={!isSending ? { scale: 1.05 } : {}}
            whileTap={!isSending ? { scale: 0.95 } : {}}
            onClick={handleConfirm}
            disabled={isSending}
            className={`w-full md:w-56 py-4 text-lg rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 ${
              isSending
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-pointer hover:shadow-lg"
            }`}
          >
            {isSending ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Confirming...
              </>
            ) : (
              <>
                <MessageSquare size={20} />
                Confirm Booking
                <ChevronRight size={20} />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
