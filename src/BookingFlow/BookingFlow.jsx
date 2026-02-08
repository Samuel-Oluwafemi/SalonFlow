import { useState, useEffect } from "react";
import Services from "./Services";
import DateTimeSelection from "./DateTimeSelection";
import Reviews from "./Reviews";
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
    id: 3,
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

  useEffect(() => {
    const savedStep = localStorage.getItem("bookingStep");
    const savedData = localStorage.getItem("bookingData");

    console.log("BookingFlow: restoring from localStorage", { savedStep, savedData });

    if (savedStep) {
      const n = Number(savedStep);
      if (Number.isFinite(n) && n >= 1 && n <= 3) setStep(n);
    }

    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setSelectedService(data.selectedService || null);
        setSelectedName(data.selectedName || '');
        setSelectedEmail(data.selectedEmail || '');
        setSelectedPhone(data.selectedPhone || '');
        setSelectedDate(data.selectedDate || null);
        setSelectedTime(data.selectedTime || null);
      } catch (err) {
        console.error('BookingFlow: failed to parse bookingData, clearing corrupt value', err);
        localStorage.removeItem('bookingData');
      }
    }
  }, []);


  // Persist booking step and data(selectedService, date/time, phone, email...) in localStorage to prevent loss on page refresh
  useEffect(() => {
    localStorage.setItem("bookingStep", step.toString());
  }, [step]);

  useEffect(() => {
    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        selectedService,
        selectedName,
        selectedEmail,
        selectedPhone,
        selectedDate,
        selectedTime,
      }),
    );
  }, [
    selectedService,
    selectedName,
    selectedEmail,
    selectedPhone,
    selectedDate,
    selectedTime,
  ]);

  // Handle service selection and update the selected service
  const handleSelectService = (service) => {
    setSelectedService(service);

    // clear all form data when a new service is selected
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedName("");
    setSelectedEmail("");
    setSelectedPhone("");
  };

  // move to the next step
  const goToDateTime = () => {
    setStep(2);
  };

  // Reset booking flow and clear persisted data
  const resetBooking = () => {
    localStorage.removeItem("bookingStep");
    localStorage.removeItem("bookingData");
    setStep(1);
    setSelectedService(null);
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
          onSelectedService={handleSelectService}
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
