import { useState, useEffect } from "react";
import { Navbar } from "../Navbar/Navbar";
import { db } from "../firebase"; // my database
import { collection, getDocs } from "firebase/firestore"; // collection -> where data is stored, getDocs-> function to retrieve data.

// AdminBookings component to display all bookings in the Firestore database
const Dashboard = () => {
  const [bookings, setBookings] = useState([]);

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
    <section className="min-h-screen mx-auto py-10 md:pt-28 pt-28">
      <Navbar />
      <div className="p-20">
        <h1>Admin Bookings</h1>
        <p>This is the admin bookings page.</p>
        <div>
          {bookings.map((booking, index) => (
            <div key={index}>
              <p>
                <strong>Service:</strong> {booking.service}
              </p>
              <p>
                <strong>Name:</strong> {booking.name}
              </p>
              <p>
                <strong>Email:</strong> {booking.email}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Time:</strong> {booking.time}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {booking.createdAt?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
