import { Navbar } from "../Navbar/Navbar";
import { Features } from "./Features";
import { Img } from "./heroImg";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section>
      <Navbar />
      <div className="min-h-screen bg-white md:pt-35 pt-19 text-center">
        <main className="flex md:flex-row flex-col md:gap-30 gap-10 justify-center">
          <div
            className="font-inter px-5 mt-10 md:text-left text-center"
          >
            <p className="md:text-sm md:block text-xs text-gray-400 mb-2 hidden font-semibold">
              Happy Customer with our services
            </p>
            <h1 className="text-4xl md:text-5xl md:mt-4 font-bold text-black md:mb-4 mb-4">
              A Smarter Way for Brands <br /> to Handle{" "}
              <span className="text-purple-500">Appointments.</span>
            </h1>
            <p className="text-md text-gray-400 mb-6 md:text-lg px-6 md:px-0">
              A clean, step-by-step booking flow that lets clients choose a service, <br /> 
              pick a date, and confirm — all in seconds.
            </p>
            <Link to="/services">
              <button
                className="bg-purple-600 text-white px-6 py-3 rounded-md text-lg 
          font-semibold hover:bg-purple-700 transition duration-300 mb-3 cursor-pointer"
              >
                Book a Demo
              </button>
            </Link>
          </div>
          <Img />
        </main>
      </div>
      <Features />
    </section>
  );
}
