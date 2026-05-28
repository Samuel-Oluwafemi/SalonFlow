import { Navbar } from "../Navbar/Navbar";
import { Features } from "./Features";
import { Testimonials } from "./Testimonials";
import { Stats } from "./Stats";
import { HowItWorks } from "./HowItWorks";
import { FAQs } from "./FAQs";
import { Footer } from "./Footer";
import { Img } from "./heroImg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ user }) {
  return (
    <section>
      <Navbar />

      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 md:pt-35 pt-19">
        <main className="flex md:flex-row flex-col md:gap-30 gap-10 justify-center items-center max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="font-inter mt-10 md:text-left text-center md:flex-1"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="md:text-sm md:block text-xs text-purple-600 mb-2 font-semibold tracking-widest"
            >
              TRUSTED BY BEAUTY PROFESSIONALS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-black md:mb-6 mb-4 leading-tight font-playfair"
            >
              The Smarter Way to Manage{" "}
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r 
              from-purple-600 to-blue-600"
              >
                Appointments
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 mb-8 md:text-xl leading-relaxed"
            >
              Say goodbye to chaos. Bookify streamlines your booking process
              with an intuitive interface that clients love. From service
              selection to confirmation — all in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col md:flex-row gap-4 md:gap-6"
            >
              <Link to={user ? "/dashboard" : "/login"} className="flex-1 md:flex-none">
                <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-600 
                text-white px-8 py-4 rounded-lg text-lg font-bold hover:shadow-lg hover:scale-105 
                transition duration-300 flex items-center justify-center gap-2 group">
                  Get Started{" "}
                  <ArrowRight
                    className="group-hover:translate-x-1 transition"
                    size={20}
                  />
                </button>
              </Link>
              <button className="w-full md:w-auto border-2 border-purple-600 text-purple-600 
              px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-50 transition duration-300">
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-start gap-8 mt-10 md:mb-10 md:flex-row flex-col"
            >
              <div>
                <p className="text-3xl font-bold text-purple-600">500+</p>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">10K+</p>
                <p className="text-gray-600">Bookings/Month</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">4.9★</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:flex-1"
          >
            <Img />
          </motion.div>
        </main>
      </div>

      {/* Additional Sections */}
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQs />
      <Footer />
    </section>
  );
}
