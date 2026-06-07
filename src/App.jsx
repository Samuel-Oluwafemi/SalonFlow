import { Navbar } from "./Navbar/Navbar";
import Hero from "./hero/Hero";
import BookingFlow from "./BookingFlow/BookingFlow";
import Dashboard from "./admin/Dashboard";
import Login from "./admin/Login";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { useState, useEffect } from "react";
function App() {
  // Auth state to manage user login status
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      //  Stores auth state globally and sets loading to false once auth state is determined
      if (!currentUser) {
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        // get user role fom firebase
        const userDocRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDocRef);

        let role = "user"; // default role

        // if user document exists and has a role field, use it
        if (userSnap.exists()) {
          role = userSnap.data().role || "user";
        }

        // build RBAC user object
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role,
        });
      } catch (error) {
        console.error("Error fetching user role:", error);

        // fallback to basic user object if role fetch fails
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          role: "user",
        });
        console.log("User is logged in:", currentUser.email);
      }
      setAuthLoading(false); // Set loading to false after auth state is determined
    });
    return () => unsubscribe();
  }, []);

  const location = useLocation();

  if (authLoading) {
    return <div className="loading-screen">Checking session...</div>;
  }

  return (
    <>
      <div className="max-w-7xl font-poppins bg-white mx-auto ">
        <Navbar user={user} />
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
                  <Hero user={user} />
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
                // RBAC: Only allow access to dashboard if user is logged in and has admin role,
                // otherwise redirect to login
                user?.role === "admin" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Dashboard user={user} />
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
