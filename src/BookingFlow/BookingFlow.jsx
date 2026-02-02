import { useState } from "react";
import { Services } from "./Services";
import { DateTimeSelection } from "./DateTimeSelection";
import { ConusmerDetails } from "./CustomerDetails";

const services = [
  {
    id: 1,
    name: "Wig Installation",
    duration: "2hrs",
    price: "#25k",
    image: "/images/elless wigs.jpeg",
  },
  {
    id: 2,
    name: "Braiding",
    duration: "3hrs",
    price: "#30k",
    image: "/images/elless braiding2.jpeg",
  },
  {
    id: "3",
    name: "Pedicure & Manicure",
    duration: "1hr",
    price: "#15k",
    image: "/images/elless pedicure.jpeg",
  },
  {
    id: 4,
    name: "Tooth Gem Application",
    duration: "2hrs",
    price: "#20k",
    image: "/images/elless Tooth Gem.jpeg",
  },
];

export default function BookingFlow() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);

  // Handle service selection and update the selected service
  const handleSelectService = (service) => {
    setSelectedService(service);

    // clear the date and time when a new service is selected
    setSelectedDate(null);
    setSelectedTime(null);

    // move to the next step
    setStep(2);
  };

  return (
    <div className="bg-white max-w-md mx-auto">
      {/* only show the serviceSelection when in step 1 */}
      {step === 1 && (
        <Services
          services={services}
          selectedService={selectedService}
          onSelectedService={handleSelectService}
        />
      )}
      {/* only show the DateTimeSelection when in step 2 */}
      {step === 2 && (
        <DateTimeSelection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={setSelectedDate}
          onselectTime={setSelectedTime}
          onContinue={() => setStep(3)}
        />
      )}
      {/* only show customer details, date/time in step 3*/}
      {step == 3 && (
        <ConusmerDetails
          selectedService={selectedService}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
    </div>
  );
}
