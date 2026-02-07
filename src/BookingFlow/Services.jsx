import { Navbar } from "../Navbar/Navbar";
const Services = ({
  // props
  services,
  selectedService,
  onSelectedService,
  onContinue,
}) => {
  // Continue btn is enabled only if a service is selected
  const canContinue = Boolean(selectedService);
  return (
    <section className="min-h-screen mx-auto py-10 pt-28">
      <Navbar />
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
        Categories of Services
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-5 px-2 md:px-10">
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
      <div className="flex justify-center px-3 md:px-20">
        <button
          disabled={!canContinue}
          onClick={onContinue}
          className={`mt-10 w-100 py-3 rounded-full font-semibold text-lg 
            ${
              canContinue
                ? "bg-purple-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          Continue
        </button>
      </div>
    </section>
  );
};
export default Services;
