import { Navbar } from "../Navbar/Navbar";
import { Img } from "./heroImg";

export default function Hero() {
  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white pt-28  text-center">
        <h1 className="text-4xl font-bold text-black mb-4 md:text-5xl px-14 md:px-8">
          A Smarter Way for Salons to Manage Appointments
        </h1>
        <p className="text-lg text-gray-700 mb-6 md:text-xl px-5 md:px-0">
          Designed to help salons manage bookings, save time, and never miss appointments.
        </p>
        <a
          href="#services"
          className="inline-block bg-purple-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-purple-700 transition-colors duration-300"
        >
          Explore Our Services
        </a>
        <Img />
      </div>
    </section>
  );
}
