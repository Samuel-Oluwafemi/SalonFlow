import Hero from "./hero/Hero";
import BookingFlow from "./BookingFlow/BookingFlow";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
function App() {
  // Auth state to manage user login status
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //  Stores auth state globally and sets loading to false once auth state is determined
      setUser(currentUser);
      setAuthLoading(false); // Set loading to false after auth state is determined
    });
    return () => unsubscribe();
  }, []);
  
  const location = useLocation();
  
  if (authLoading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <div className="max-w-7xl font-poppins bg-white mx-auto ">
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

            <Route
              path="/dashboard"
              element={
                user ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Dashboard />
                  </motion.div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
