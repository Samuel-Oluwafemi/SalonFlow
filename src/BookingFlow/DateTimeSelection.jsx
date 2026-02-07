import { Navbar } from "../Navbar/Navbar";
const DateTimeSelection = ({
  // props
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
}) => {
  const canContinue = selectedDate && selectedTime;
  return (
    <section className="min-h-screen mx-auto md:py-20 py-6 md:pt-28 pt-22">
      <Navbar />
      <main className="md:px-40 md:py-5 px-7 py-6 max-w-6xl mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Complete Your Booking Details
          </h1>
          <p className="font-medium text-gray-500">
            Please fill in your details to complete the booking process
          </p>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-7 gap-5 mx-auto mb-2">
          {/* Name */}
          <label className="font-medium text-sm text-left">
            Your name
            <input
              type="text"
              placeholder="Enter your name"
              value={selectedName || ""}
              onChange={(e) => onSelectName(e.target.value)}
              className="px-3 w-full py-4 rounded-lg bg-gray-200 mt-3"
            />
          </label>

          {/* Email */}
          <label className="font-medium text-sm text-left">
            Email Address
            <input
              type="email"
              placeholder="your@example.com"
              value={selectedEmail || ""}
              onChange={(e) => onSelectEmail(e.target.value)}
              className="px-3 w-full py-4 rounded-lg bg-gray-200 mt-3"
            />
          </label>

          {/* Phone */}
          <label className="font-medium text-sm text-left">
            Phone Number
            <input
              type="tel"
              placeholder="Your phone number"
              value={selectedPhone || ""}
              onChange={(e) => onSelectPhone(e.target.value)}
              className="px-3 w-full py-4 rounded-lg bg-gray-200 mt-3"
            />
          </label>

          {/* date */}
          <label className="font-medium text-sm text-left">
            Select Date
            <input
              className="w-full rounded-lg bg-gray-200 cursor-pointer px-3 py-4 mt-3"
              type="date" placeholder=""
              value={selectedDate || ""}
              onChange={(e) => onSelectDate(e.target.value)}
            />
          </label>

          {/* time */}
          <label className="font-medium text-sm text-left">
            Select Time
            <select
              value={selectedTime || ""}
              onChange={(e) => onSelectTime(e.target.value)}
              className="px-3 w-full py-4 rounded-lg bg-gray-200 mt-3"
            >
              <option value="" className="font-medium text-sm">
                Select Time
              </option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="1:00 PM">1:00 PM</option>
              <option value="2:00 PM">2:00 PM</option>
              <option value="3:00 PM">3:00 PM</option>
            </select>
          </label>
        </div>

        <div>
          <button
            disabled={!canContinue}
            onClick={onContinue}
            className={`mt-7 w-full py-3 text-lg font-medium rounded-lg font-semibold text-lg
            ${
              canContinue
                ? "bg-purple-500 text-white cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </main>
    </section>
  );
};
export default DateTimeSelection;
