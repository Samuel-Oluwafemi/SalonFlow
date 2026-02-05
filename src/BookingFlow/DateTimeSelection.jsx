import { Navbar } from "../Navbar/Navbar";
const DateTimeSelection = ({
  selectedDate = "",
  selectedTime = "",
  onSelectDate = () => {},
  onSelectTime = () => {},
  onContinue = () => {},
}) => {
  const canContinue = selectedDate && selectedTime;
  return (
    <section className="min-h-screen mx-auto py-10 pt-28">
      <Navbar />
      <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
        Select Date and Time
      </h1>
      <main className="md:px-40 md:py-10 px-10 py-6 max-w-6xl mx-auto">
        <div className="flex flex-col mx-auto mb-2">
          {/* date */}
          <input
            className="w-full text-black rounded-full bg-gray-200 cursor-pointer p-3 py-4 mb-4"
            type="date"
            value={selectedDate || ""}
            onChange={(e) => onSelectDate(e.target.value)}
          />
          {/* time */}
          <select
            value={selectedTime || ""}
            onChange={(e) => onSelectTime(e.target.value)}
            className="px-3 w-full py-4 rounded-full bg-gray-200 mt-3"
          >
            <option value="">Select Time</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
          </select>
        </div>
      </main>
      <div className="flex justify-center px-10 md:px-20">
        <button
          disabled={!canContinue}
          onClick={onContinue}
          className={`mt-10 w-full py-3 rounded-full font-semibold text-lg
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
export default DateTimeSelection;
