import React, { useState } from "react";
import BookingForm from "./BookingForm";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      bookingId: "B001",
      userNameId: "U001",
      flightId: "F001",
      ticketQuantity: 2,
      status: "Confirmed",
    },
    {
      id: 2,
      bookingId: "B002",
      userNameId: "U002",
      flightId: "F002",
      ticketQuantity: 1,
      status: "Pending",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleAddBooking = () => {
    setSelectedBooking(null);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsViewOnly(true);
    setShowForm(true);
  };

  const handleSaveBooking = (formData) => {
    if (selectedBooking) {
      setBookings(bookings.map((booking) => (booking.id === selectedBooking.id ? { ...booking, ...formData } : booking)));
    } else {
      setBookings([...bookings, { id: bookings.length + 1, ...formData }]);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (id) => {
    setBookings(bookings.filter((booking) => booking.id !== id));
  };

  return (
    <div className="booking-management">
      <div className="booking-management-header">
        <h2>Booking Management</h2>
        <button className="new-btn" onClick={handleAddBooking}>New</button>
      </div>
      <table className="booking-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User Name (ID)</th>
            <th>Flight ID</th>
            <th>Ticket Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.bookingId}</td>
              <td>{booking.userNameId}</td>
              <td>{booking.flightId}</td>
              <td>{booking.ticketQuantity}</td>
              <td>{booking.status}</td>
              <td>
                <button className="action-btn view-btn" onClick={() => handleViewBooking(booking)}>View</button>
                <button className="action-btn edit-btn" onClick={() => handleEditBooking(booking)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <BookingForm
          booking={selectedBooking}
          onSave={handleSaveBooking}
          onCancel={handleCancel}
          isViewOnly={isViewOnly}
        />
      )}
    </div>
  );
};

export default BookingManagement;