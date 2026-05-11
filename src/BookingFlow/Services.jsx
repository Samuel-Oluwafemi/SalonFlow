import { Navbar } from "../Navbar/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, DollarSign, Check, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";

const Services = ({
  services,
  selectedService,
  selectedSubService,
  onSelectedService,
  onSelectedSubService,
  onContinue,
  onBack = () => {},
}) => {
  // Create ref for sub-services section
  const subServicesRef = useRef(null);

  // Auto-scroll to sub-services when service is selected
  useEffect(() => {
    if (selectedService && subServicesRef.current) {
      setTimeout(() => {
        subServicesRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // Delay to allow animation to start
    }
  }, [selectedService]);

  // Continue btn is enabled only if both service AND sub-service are selected
  const canContinue = Boolean(selectedService && selectedSubService);
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      className="min-h-screen mx-auto py-10 md:pt-28 pt-20 bg-gradient-to-br from-white via-purple-50 to-blue-50"
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
          Select Your Service
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose the service you'd like to book. Each comes with professional care and guaranteed satisfaction.
        </p>
      </motion.div>

      <div className="font-inter max-w-6xl mx-auto px-4 md:px-8">
        {/* Main Services Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12"
        >
          {services.map((service) => {
            const isSelected = selectedService?.id === service.id;

            return (
              <motion.button
                key={service.id}
                onClick={() => {
                  onSelectedService(service);
                  onSelectedSubService(null);
                }}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`p-6 md:p-8 rounded-2xl text-center transition duration-300 ${
                  isSelected
                    ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xl border-2 border-purple-400"
                    : "bg-white text-gray-900 shadow-md border-2 border-gray-200 hover:border-purple-300"
                }`}
              >
                {/* Service Image */}
                <div className="flex justify-center mb-6">
                  <div
                    className={`relative ${
                      isSelected ? "ring-4 ring-white" : "ring-2 ring-gray-300"
                    } rounded-full p-2`}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-24 w-24 md:h-32 md:w-32 object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Service Name */}
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-4 ${
                    isSelected ? "text-white" : "text-gray-900"
                  }`}
                >
                  {service.name}
                </h3>

                {/* Service Details */}
                <div
                  className={`flex items-center justify-center gap-6 mb-6 text-lg ${
                    isSelected ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span>{service.duration}</span>
                  </div>
                  <div
                    className="w-px h-6"
                    style={{
                      backgroundColor: isSelected
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(0,0,0,0.1)",
                    }}
                  ></div>
                  <div className="flex items-center gap-2 font-bold text-lg">
                    <DollarSign size={20} />
                    <span>{service.price}</span>
                  </div>
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center justify-center gap-2 text-white bg-white/20 px-4 py-2 rounded-full w-fit mx-auto"
                  >
                    <Check size={18} />
                    <span className="font-semibold">Selected</span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Sub-Services Selection - Show when a service is selected */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              ref={subServicesRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-2 border-purple-200"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {selectedService.name}
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a specific option for {selectedService.name}:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {selectedService.subServices.map((subService) => {
                    const isSubSelected = selectedSubService?.id === subService.id;

                    return (
                      <motion.button
                        key={subService.id}
                        onClick={() => onSelectedSubService(subService)}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.96 }}
                        className={`p-4 rounded-xl transition duration-300 border-2 ${
                          isSubSelected
                            ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white border-purple-400 shadow-lg"
                            : "bg-gray-50 text-gray-900 border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4
                            className={`text-lg font-semibold text-left ${
                              isSubSelected ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {subService.name}
                          </h4>
                          {isSubSelected && (
                            <motion.div
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                            >
                              <Check
                                size={20}
                                className="text-white flex-shrink-0"
                              />
                            </motion.div>
                          )}
                        </div>
                        <p
                          className={`text-sm font-bold ${
                            isSubSelected ? "text-white/90" : "text-gray-600"
                          }`}
                        >
                          {subService.price}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-4 md:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-full md:w-48 py-3 md:py-4 text-base md:text-lg rounded-xl font-bold 
            bg-gray-300 text-gray-700 cursor-pointer hover:bg-gray-400 transition duration-300"
          >
            Back
          </motion.button>

          <motion.button
            whileHover={canContinue ? { scale: 1.05 } : {}}
            whileTap={canContinue ? { scale: 0.95 } : {}}
            disabled={!canContinue}
            onClick={onContinue}
            className={`w-full md:w-48 py-3 md:py-4 text-base md:text-lg rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 ${
              canContinue
                ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white cursor-pointer hover:shadow-lg"
                : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
            }`}
          >
            Continue
            {canContinue && <ChevronRight size={20} />}
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};
export default Services;
