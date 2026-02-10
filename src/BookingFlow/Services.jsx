import { Navbar } from "../Navbar/Navbar";
import { motion } from "framer-motion"
const Services = ({
  // props
  services,
  selectedService,
  onSelectedService,
  onContinue,
  onBack = () => {},
}) => {
  // Continue btn is enabled only if a service is selected
  const canContinue = Boolean(selectedService);
  return (
    <motion.section
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.6 }}
 
    className="min-h-screen mx-auto py-10 md:pt-33 pt-28">
      <Navbar />
      <h1 className="text-2xl md:text-2xl text-center font-bold mb-8">
        Select a Service to Book
      </h1>

      <div className="font-inter">
        <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-5 px-2 md:px-10">
          {/* Loop through service categories */}
          {services.map((service) => {
            // for every service, check if it's selected
            const isSelected = selectedService?.id === service.id;

            return (
              <button
                key={service.id}
                onClick={() => onSelectedService(service)}
                className={`p-1 mb-3 md:p-2 rounded-3xl hover:shadow-lg transition duration-300 text-center 
                ${isSelected ? "shadow-lg shadow-purple-400" : "border border-gray-300"}`}
              >
                {/* service image */}
                <div className="flex justify-center">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="h-20 w-20 md:h-24 md:w-24 object-cover rounded-full"
                  />
                </div>
                <div className="p-2">
                  <p className="text-lg font-semibold mb-2">{service.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-center md:gap-20 gap-3 px-3">
          <button
            onClick={onBack}
            className="md:w-50 w-full py-1 mt-10 text-md rounded-xl font-semibold 
            bg-gray-300 text-gray-700 cursor-pointer hover:bg-gray-400 transition duration-300"
          >
            Back
          </button>

          <button
            disabled={!canContinue}
            onClick={onContinue}
            className={`mt-10 md:w-50 w-full py-3 rounded-xl font-semibold text-lg 
            ${
              canContinue
                ? "bg-purple-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </motion.section>
  );
};
export default Services;
