import Hero from "./hero/Hero";
import BookingFlow from "./BookingFlow/BookingFlow";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div className="bg-white mx-auto ">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/services" element={<BookingFlow />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
