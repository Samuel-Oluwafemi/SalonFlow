import { Navbar } from "../Navbar/Navbar";
import { Img } from "./heroImg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white pt-28 text-center">
        <h1 className="text-4xl md:text-6xl md:mt-4 font-bold text-black mb-6 px-14 md:px-23">
          A Smarter Way for Brands to Manage Appointments
        </h1>
        <p className="text-lg text-gray-700 mb-6 md:text-xl px-5 md:px-0">
          Designed to help brands manage bookings, save time, and never miss
          appointments.
        </p>
        <Link to="/services">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg 
          font-semibold hover:bg-purple-700 transition duration-300 mb-3">
            Book a Demo
          </button>
        </Link>
        <Img />
      </div>
    </section>
  );
}
