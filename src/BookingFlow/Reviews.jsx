import { Navbar } from "../Navbar/Navbar";
const Reviews = ({
  selectedService,
  selectedName,
  selectedEmail,
  selectedPhone,
  selectedDate,
  selectedTime,
  onBack = () => {},
}) => {
  return (
    <section className="min-h-screen mx-auto py-10 pt-28">
      <Navbar />
      <main className="md:px-30 px-3 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          Review Your Booking Details
        </h1>
        {/* Service details */}
        <div className="max-w-4xl mx-auto bg-gray-100 shadow-md rounded-lg py-8 px-6">
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
          <h2 className="text-xl font-semibold mt-6 mb-4">Your Details</h2>
          <p className="mb-2">
            <span className="font-medium">Name:</span> {selectedName}
          </p>
          <p className="mb-2">
            <span className="font-medium">Email:</span> {selectedEmail}
          </p>
          <p className="mb-2">
            <span className="font-medium">Phone:</span> {selectedPhone}
          </p>
        </div>
        <div className="flex gap-3 justify-center mt-10">
          <button
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-full 
            font-semibold text-lg hover:bg-gray-400 transition duration-300 
            cursor-pointer"
          >
            Back
          </button>
          <button
            onClick={() => alert("Booking Confirmed!")}
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold 
          text-lg hover:bg-green-600 transition duration-300"
          >
            Confirm Booking
          </button>
        </div>
      </main>
    </section>
  );
};
export default Reviews;
