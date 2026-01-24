import Hero from "./hero/Hero";
import { Services } from "./BookingFlow/Services";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div classname="bg-white max-w-md mx-auto ">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/services" element={<Services />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
