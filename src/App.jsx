import Hero from "./hero/Hero";
import BookingFlow from "./BookingFlow/BookingFlow";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div classname="bg-white max-w-md mx-auto ">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/services" element={<BookingFlow />} />
          </Routes>

          <BookingFlow />
      </div>
    </>
  );
}

export default App;
