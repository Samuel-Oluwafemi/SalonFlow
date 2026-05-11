import { Navbar } from "../Navbar/Navbar";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar, Clock, ChevronRight } from "lucide-react";

const DateTimeSelection = ({
  selectedName = "",
  selectedEmail = "",
  selectedPhone = "",
  selectedDate = "",
  selectedTime = "",
  onSelectName = () => {},
  onSelectEmail = () => {},
  onSelectPhone = () => {},
  onSelectDate = () => {},
  onSelectTime = () => {},
  onContinue = () => {},
  onBack = () => {},
}) => {
  const canContinue = Boolean(
    selectedName &&
    selectedEmail &&
    selectedPhone &&
    selectedDate &&
    selectedTime,
  );

  // Time slots grid
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
    "5:00 PM", "6:00 PM"
  ];

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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen mx-auto py-10 md:pt-28 pt-20 
      bg-gradient-to-br from-white via-purple-50 to-blue-50"
    >
      <Navbar />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Complete Your Details
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select your preferred date and time, then provide your contact information
        </p>
      </motion.div>

      <div className="font-inter max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Personal Information Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
                <User size={24} className="text-white" />
              </div>
              Your Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={selectedName || ""}
                  onChange={(e) => onSelectName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 
                  focus:outline-none bg-gray-50 hover:bg-white transition duration-300 text-gray-900 font-medium"
                />
              </motion.div>

              {/* Email */}
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={selectedEmail || ""}
                  onChange={(e) => onSelectEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 
                  focus:outline-none bg-gray-50 hover:bg-white transition duration-300 text-gray-900 font-medium"
                />
              </motion.div>

              {/* Phone */}
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+234 901 234 5678"
                  value={selectedPhone || ""}
                  onChange={(e) => onSelectPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-purple-500 
                  focus:outline-none bg-gray-50 hover:bg-white transition duration-300 text-gray-900 font-medium"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Date Selection Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-lg">
                <Calendar size={24} className="text-white" />
              </div>
              Select Date
            </h2>

            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
              <input
                type="date"
                value={selectedDate || ""}
                onChange={(e) => onSelectDate(e.target.value)}
                className="w-full px-4 py-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 
                focus:outline-none bg-gray-50 hover:bg-white transition duration-300 text-gray-900 font-medium text-lg"
              />
            </motion.div>
          </motion.div>

          {/* Time Selection Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg">
                <Clock size={24} className="text-white" />
              </div>
              Select Time
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {timeSlots.map((time) => (
                <motion.button
                  key={time}
                  onClick={() => onSelectTime(time)}
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-2 rounded-lg font-semibold transition duration-300 border-2 ${
                    selectedTime === time
                      ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white border-purple-400 shadow-lg"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-white"
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-full md:w-48 py-4 text-lg rounded-xl font-bold 
              bg-gray-300 text-gray-700 cursor-pointer hover:bg-gray-400 transition duration-300"
            >
              Back
            </motion.button>

            <motion.button
              whileHover={canContinue ? { scale: 1.05 } : {}}
              whileTap={canContinue ? { scale: 0.95 } : {}}
              disabled={!canContinue}
              onClick={onContinue}
              className={`w-full md:w-48 py-4 text-lg rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 ${
                canContinue
                  ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white cursor-pointer hover:shadow-lg"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              Continue
              {canContinue && <ChevronRight size={20} />}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DateTimeSelection;
