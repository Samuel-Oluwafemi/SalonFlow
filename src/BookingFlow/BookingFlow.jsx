
import { useState} from "react";
import Services from "./Services";
import DateTimeSelection from "./DateTimeSelection";
import Reviews from "./Reviews";
import Dashboard from "../admin/Dashboard";
// Sample services data with sub-services
const services = [
  {
    id: 1,
    name: "Wig Installation",
    duration: "2hrs",
    price: "#25k",
    image: "/images/elless wigs.jpeg",
    subServices: [
      { id: 1.1, name: "Glueless Wig", price: "#25k" },
      { id: 1.2, name: "Glued Wig", price: "#30k" },
      { id: 1.3, name: "Full Lace Wig", price: "#35k" },
      { id: 1.4, name: "Lace Closure", price: "#20k" },
    ],
  },
  {
    id: 2,
    name: "Braiding",
    duration: "3hrs",
    price: "#30k",
    image: "/images/elless braiding2.jpeg",
    subServices: [
      { id: 2.1, name: "Box Braids", price: "#30k" },
      { id: 2.2, name: "Cornrows", price: "#25k" },
      { id: 2.3, name: "Goddess Braids", price: "#35k" },
      { id: 2.4, name: "Feed-in Braids", price: "#40k" },
    ],
  },
  {
    id: 3,
    name: "Pedicure & Manicure",
    duration: "1hr",
    price: "#15k",
    image: "/images/elless pedicure.jpeg",
    subServices: [
      { id: 3.1, name: "Basic Mani/Pedi", price: "#15k" },
      { id: 3.2, name: "Gel Mani/Pedi", price: "#25k" },
      { id: 3.3, name: "Acrylic Nails", price: "#20k" },
      { id: 3.4, name: "Nail Art", price: "#30k" },
    ],
  },
  {
    id: 4,
    name: "Tooth Gem Application",
    duration: "2hrs",
    price: "#20k",
    image: "/images/elless Tooth Gem.jpeg",
    subServices: [
      { id: 4.1, name: "Single Tooth Gem", price: "#20k" },
      { id: 4.2, name: "Multiple Gems", price: "#35k" },
      { id: 4.3, name: "Diamond Gems", price: "#50k" },
      { id: 4.4, name: "Custom Design", price: "#60k" },
    ],
  },
  {
    id: 5,
    name: "Hair Treatment",
    duration: "1.5hrs",
    price: "#18k",
    image: "/images/elless treatment.jpeg",
    subServices: [
      { id: 5.1, name: "Deep Conditioning", price: "#18k" },
      { id: 5.2, name: "Keratin Treatment", price: "#35k" },
      { id: 5.3, name: "Protein Treat", price: "#22k" },
      { id: 5.4, name: "Hair Spa", price: "#28k" },
    ],
  },
  {
    id: 6,
    name: "Facial Treatment",
    duration: "1hr",
    price: "#20k",
    image: "/images/elless facial.jpeg",
    subServices: [
      { id: 6.1, name: "Basic Facial", price: "#20k" },
      { id: 6.2, name: "HydraFacial", price: "#35k" },
      { id: 6.3, name: "Chemical Peel", price: "#40k" },
      { id: 6.4, name: "Acne Facial", price: "#25k" },
    ],
  },
  {
    id: 7,
    name: "Make-up Services",
    duration: "1.5hrs",
    price: "#22k",
    image: "/images/elless makeup.jpeg",
    subServices: [
      { id: 7.1, name: "Bridal Make-up", price: "#45k" },
      { id: 7.2, name: "Party Make-up", price: "#30k" },
      { id: 7.3, name: "Everyday Make-up", price: "#22k" },
      { id: 7.4, name: "Eye Make-up", price: "#15k" },
    ],
  },
];

export default function BookingFlow() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [selectedName, setSelectedName] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedPhone, setSelectedPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1);

  // Handle service selection and update the selected service
  const handleSelectService = (service) => {
    setSelectedService(service);
    setSelectedSubService(null);

    // clear all form data when a new service is selected
    setSelectedDate(null);
    setSelectedTime(null);
    // setSelectedName("");
    setSelectedEmail("");
    setSelectedPhone("");
  };

  // move to the next step
  const goToDateTime = () => {
    setStep(2);
  };

  // Reset booking flow
  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedSubService(null);
    setSelectedName("");
    setSelectedEmail("");
    setSelectedPhone("");
    setSelectedDate(null);
    setSelectedTime(null);
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

  // Go back to previous step
  const goToPreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div>
      {/* only show the serviceSelection when in step 1 */}
      {step === 1 && (
        <Services
          services={services}
          selectedService={selectedService}
          selectedSubService={selectedSubService}
          onSelectedService={handleSelectService}
          onSelectedSubService={setSelectedSubService}
          onContinue={goToDateTime}
          onBack={resetBooking}
        />
      )}
      {/* only show the DateTimeSelection + customer details when in step 2 */}
      {step === 2 && (
        <DateTimeSelection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          selectedName={selectedName}
          selectedEmail={selectedEmail}
          selectedPhone={selectedPhone}
          onSelectName={handleNameChange}
          onSelectEmail={handleEmailChange}
          onSelectPhone={handlePhoneChange}
          onSelectDate={handleDateSelection}
          onSelectTime={handleTimeSelection}
          onContinue={goToDetails}
          onBack={goToPreviousStep}
        />
      )}
      {/* only show customer details, date/time in step 3*/}
      {step === 3 && (
        <Reviews
          selectedService={selectedService}
          selectedSubService={selectedSubService}
          selectedName={selectedName}
          selectedEmail={selectedEmail}
          selectedPhone={selectedPhone}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBack={goToPreviousStep}
        />
      )}
    </div>
  );
}
