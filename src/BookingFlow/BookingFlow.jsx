import { useState } from "react";
import Services from "./Services";
import DateTimeSelection from "./DateTimeSelection";
import CustomerDetails from "./CustomerDetails";
// Sample services data
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
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);

  // Handle service selection and update the selected service
  const handleSelectService = (service) => {
    setSelectedService(service);

    // clear the date and time when a new service is selected
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // move to the next step
  const goToDateTime = () => {
    setStep(2);
  };

  // Handle name input change
  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  // Handle email input change
  const handleEmailChange = (email) => {
    setSelectedEmail(email);
  };

  // Handle phone input change
  const handlePhoneChange = (phone) => {
    setSelectedPhone(phone);
  };

  // Handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // reset time when date changes
  };

  // Handle time selection
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const goToDetails = () => {
    setStep(3);
  };

  return (
    <div>
      {/* only show the serviceSelection when in step 1 */}
      {step === 1 && (
        <Services
          services={services}
          selectedService={selectedService}
          onSelectedService={handleSelectService}
          onContinue={goToDateTime}
        />
      )}
      {/* only show the DateTimeSelection when in step 2 */}
      {step === 2 && (
        <DateTimeSelection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedName={handleNameChange}
          selectedEmail={handleEmailChange}
          selectedPhone={handlePhoneChange}
          onSelectDate={handleDateSelection}
          onSelectTime={handleTimeSelection}
          onContinue={goToDetails}
        />
      )}
      {/* only show customer details, date/time in step 3*/}
      {step === 3 && (
        <CustomerDetails
          selectedService={selectedService}
          selectedName={selectedName}
          selectedEmail={selectedEmail}
          selectedPhone={selectedPhone}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
    </div>
  );
}
