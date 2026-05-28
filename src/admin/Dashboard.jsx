import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Power } from "lucide-react";
import { Navbar } from "../Navbar/Navbar";
import { db } from "../firebase"; // my database
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // collection -> where data is stored, getDocs-> function to retrieve data.


// AdminBookings component to display all bookings in the Firestore database
const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // state to manage the current filter (e.g., all, confirmed, pending, cancelled)
  const [loading, setLoading] = useState(true); // state to manage loading state
  const [confirmedBooking, setConfirmedBooking] = useState(null); // state for confirmation modal
  // useNavigate hook from react-router-dom to programmatically navigate between routes
  const navigate = useNavigate();

// function to handle user logout by signing out from Firebase Authentication and navigating back to the home page
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  // function to confirm a booking by updating its status to "confirmed" in Firestore
  const confirmBooking = async (id, booking) => {
    // update the booking document with the given ID to set status to "confirmed"
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "confirmed" });

    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === id ? { ...b, status: "confirmed" } : b,
      ),
    );

    // Show confirmation modal
    setConfirmedBooking(booking);
    setTimeout(() => setConfirmedBooking(null), 3000); // Auto close after 3 seconds
  };

  // function to cancel a booking by updating its status to "cancelled" in Firestore
  const cancelBooking = async (id) => {
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "cancelled" });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking,
      ),
    );
  };

  // function to mark a booking as completed by updating its status in Firestore
  const completeBooking = async (id) => {
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "completed" });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "completed" } : booking,
      ),
    );
  };
  // function to delete a booking by removing its document from Firestore
  const deleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      const bookingRef = doc(db, "bookings", id);
      await deleteDoc(bookingRef);

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== id),
      );
    }
  };

  // filter bookings based on the selected filter (e.g., all, confirmed, pending, cancelled)
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filter);

  // sort the filtered bookings by creation date in descending order (newest first) before rendering them in the UI
  // we use the spread operator to manipulate the filteredBookings array without mutating the original state, ensuring that the sorting does not affect the underlying data structure.

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const bookingsCollection = collection(db, "bookings");
        const bookingsSnapshot = await getDocs(bookingsCollection);
        //   map through the snapshot to create an array of booking objects with their data and ID
        const bookingsList = bookingsSnapshot.docs.map((doc) => ({
          id: doc.id, // include document ID for potential future use (e.g., deletion, updates)
          ...doc.data(), // spread the document data into the booking object
        }));

        bookingsList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
        setBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <section className="min-h-screen mx-auto py-6 md:py-10 pt-24 md:pt-28 bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage all customer bookings</p>
          </div>
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 
            text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 
            transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Power size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Filter buttons */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          {/* All button */}
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all 
              duration-200 flex items-center justify-center gap-2 ${
                filter === "all"
                  ? "bg-blue-500 text-white ring-2 ring-offset-2 ring-blue-400"
                  : "bg-blue-500 text-white"
              }`}
            onClick={() => setFilter("all")}
          >
            All
            <span
              className="bg-white text-blue-500 rounded-full px-2 py-0.5
             text-xs font-bold"
            >
              {bookings.length}
            </span>
          </button>

          {/* Confirmed button */}
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 
              flex items-center justify-center gap-2 ${
                filter === "confirmed"
                  ? "bg-green-500 text-white ring-2 ring-offset-2 ring-green-400"
                  : "bg-green-500 text-white"
              }`}
            onClick={() => setFilter("confirmed")}
          >
            Confirmed
            <span className="bg-white text-green-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {bookings.filter((b) => b.status === "confirmed").length}
            </span>
          </button>

          {/* Completed button */}
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 
              flex items-center justify-center gap-2 ${
                filter === "completed"
                  ? "bg-purple-500 text-white ring-2 ring-offset-2 ring-purple-400"
                  : "bg-purple-500 text-white"
              }`}
            onClick={() => setFilter("completed")}
          >
            Completed
            <span className="bg-white text-purple-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {bookings.filter((b) => b.status === "completed").length}
            </span>
          </button>

          {/* Pending button */}
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 
              flex items-center justify-center gap-2 ${
                filter === "pending"
                  ? "bg-yellow-500 text-white ring-2 ring-offset-2 ring-yellow-400"
                  : "bg-yellow-500 text-white"
              }`}
            onClick={() => setFilter("pending")}
          >
            Pending
            <span className="bg-white text-yellow-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {bookings.filter((b) => b.status === "pending").length}
            </span>
          </button>

          {/* Cancelled button */}
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 
              flex items-center justify-center gap-2 ${
                filter === "cancelled"
                  ? "bg-red-500 text-white ring-2 ring-offset-2 ring-red-400"
                  : "bg-red-500 text-white"
              }`}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
            <span className="bg-white text-red-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {bookings.filter((b) => b.status === "cancelled").length}
            </span>
          </button>
        </div>
        
        {/* Sort button */}
        <div className="mb-6 flex justify-start">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-bold
            hover:bg-gray-900 transition duration-300 flex items-center gap-2"
            onClick={() =>
              setBookings(
                [...bookings].sort(
                  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                ),
              )
            }
          >
            ↓ Sort by Latest
          </button>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-flex justify-center items-center">
                <div
                  className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 
                rounded-full animate-spin"
                ></div>
              </div>
              <p className="text-gray-600 mt-4">Loading bookings...</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings yet</p>
          </div>
        ) : // if there are bookings but none match the selected filter,
        // show a message indicating no bookings found for that filter
        filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No bookings found with the selected filter
            </p>
          </div>
        ) : (
          // if there are bookings that match the selected filter,
          // display them in a grid layout with details and action buttons for each booking
          <div className="space-y-4 md:space-y-6">
            {filteredBookings.map((booking) => {
              const status = booking.status || "pending";
              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
                >
                  <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {/* Service */}
                    <div className="border-b md:border-b-0 md:border-r md:pr-4 pb-4 md:pb-0">
                      <p className="text-gray-600 text-sm mb-1">Service</p>
                      <h2 className="text-lg md:text-xl font-bold text-gray-800">
                        {booking.service}
                      </h2>
                      {booking.subService && (
                        <p className="text-gray-600 text-sm mt-1">
                          <span className="font-medium">Option:</span>{" "}
                          {booking.subService} ({booking.subServicePrice})
                        </p>
                      )}
                    </div>

                    {/* Customer Info */}
                    <div className="border-b md:border-b-0 md:border-r md:pr-4 pb-4 md:pb-0">
                      <p className="text-gray-600 text-sm mb-2">
                        Customer Details
                      </p>
                      <p className="text-gray-800 font-medium">
                        {booking.name}
                      </p>
                      <p className="text-gray-600 text-sm">{booking.email}</p>
                      <p className="text-gray-600 text-sm">{booking.phone}</p>
                    </div>

                    {/* Date & Time */}
                    <div className="border-b md:border-b-0 md:border-r md:pr-4 pb-4 md:pb-0">
                      <p className="text-gray-600 text-sm mb-2">Appointment</p>
                      <p className="text-gray-800 font-medium">
                        <span className="font-medium">Selected Date:</span>{" "}
                        {booking.date}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Selected time:</span>{" "}
                        {booking.time}
                      </p>
                      <p className="text-gray-600 text-xs mt-2">
                        <span className="font-medium mr-1">
                          Time of booking:
                        </span>
                        {booking.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>

                    {/* Status */}
                    <div>
                      <p className="text-gray-600 text-sm mb-2">Status</p>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-bold
                          ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {/* Status text */}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-gray-50 px-4 md:px-6 py-4 flex flex-col sm:flex-row gap-3 md:gap-4">
                    {status === "pending" && (
                      <button
                        className="flex-1 bg-purple-500 py-2 px-4 rounded-lg text-white text-sm font-bold
                        cursor-pointer hover:bg-purple-600 transition duration-300"
                        onClick={() => confirmBooking(booking.id, booking)}
                      >
                        Confirm
                      </button>
                    )}
                    {status === "confirmed" && (
                      <button
                        className="flex-1 bg-green-500 py-2 px-4 rounded-lg text-white text-sm font-bold
                        cursor-pointer hover:bg-green-600 transition duration-300"
                        onClick={() => completeBooking(booking.id)}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      className="flex-1 bg-red-500 py-2 px-4 rounded-lg text-white text-sm font-bold
                      cursor-pointer hover:bg-red-600 transition duration-300"
                      onClick={() => deleteBooking(booking.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 bg-gray-500 py-2 px-4 rounded-lg text-white text-sm font-bold
                      cursor-pointer hover:bg-gray-600 transition duration-300"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-bounce">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <span className="text-3xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-4">
                Booking from {confirmedBooking.name} has been confirmed
                successfully.
              </p>
              <p className="text-sm text-gray-500">
                {confirmedBooking.service} - {confirmedBooking.date} at{" "}
                {confirmedBooking.time}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default Dashboard;
