import { useState, useEffect } from "react";
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

  // function to confirm a booking by updating its status to "confirmed" in Firestore
  const confirmBooking = async (id) => {
    // update the booking document with the given ID to set status to "confirmed"
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "confirmed" });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "confirmed" } : booking,
      ),
    );
  };

  const cancelBooking = async (id) => {
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "cancelled" });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking,
      ),
    );
  };
  const completeBooking = async (id) => {
    const bookingRef = doc(db, "bookings", id);

    await updateDoc(bookingRef, { status: "completed" });

    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "completed" } : booking,
      ),
    );
  };

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

  useEffect(() => {
    const fetchBookings = async () => {
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
    };

    fetchBookings();
  }, []);

  return (
    <section className="min-h-screen mx-auto py-6 md:py-10 pt-24 md:pt-28 bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Manage all customer bookings</p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-6">
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
              filter === "all"
                ? "bg-blue-500 text-white ring-2 ring-offset-2 ring-blue-400"
                 : "bg-blue-500 text-white"
            }`}
            onClick={() => setFilter("all")}
          >
            All
            <span className="bg-white text-blue-500 rounded-full px-2 py-0.5 text-xs font-bold">
              {bookings.length}
            </span>
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
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
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
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
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
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
          <button
            className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
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

        {bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No bookings yet</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No bookings found with the selected filter
            </p>
          </div>
        ) : (
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
                        onClick={() => confirmBooking(booking.id)}
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
    </section>
  );
};
export default Dashboard;
