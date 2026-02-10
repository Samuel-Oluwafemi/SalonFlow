import Hero from "./hero/Hero";
import BookingFlow from "./BookingFlow/BookingFlow";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
function App() {
   const location = useLocation()
  return (
    <>
      <div className="max-w-7xl bg-white mx-auto ">
        <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Hero />
              </motion.div>
            }
          />

          <Route
            path="/services"
            element={
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <BookingFlow />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      </div>
    </>
  );
}

export default App;
