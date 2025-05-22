import React, { useState } from "react";
import FlightForm from "./Flightform";

const FlightManagement = () => {
  const [flights, setFlights] = useState([
    {
      id: 1,
      flightCode: "VN123",
      airline: "Vietnam Airlines",
      symbol: "VN",
      takeoffTime: "2025-05-22T09:00",
      landingTime: "2025-05-22T11:00",
      totalPrice: 1500000,
      seatClass: "Economy",
      departureProvince: "HCMC",
      destinationProvince: "Hanoi",
    },
    {
      id: 2,
      flightCode: "VN456",
      airline: "Vietnam Airlines",
      symbol: "VN",
      takeoffTime: "2025-05-22T12:00",
      landingTime: "2025-05-22T13:30",
      totalPrice: 2000000,
      seatClass: "Business",
      departureProvince: "Hanoi",
      destinationProvince: "Da Nang",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleAddFlight = () => {
    setSelectedFlight(null);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleEditFlight = (flight) => {
    setSelectedFlight(flight);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleViewFlight = (flight) => {
    setSelectedFlight(flight);
    setIsViewOnly(true);
    setShowForm(true);
  };

  const handleSaveFlight = (formData) => {
    if (selectedFlight) {
      setFlights(flights.map((flight) => (flight.id === selectedFlight.id ? { ...flight, ...formData } : flight)));
    } else {
      setFlights([...flights, { id: flights.length + 1, ...formData }]);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedFlight(null);
  };

  const handleDeleteFlight = (id) => {
    setFlights(flights.filter((flight) => flight.id !== id));
  };

  return (
    <div className="flight-management">
      <div className="flight-management-header">
        <h2>Flight Management</h2>
        <button className="new-btn" onClick={handleAddFlight}>New</button>
      </div>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight ID</th>
            <th>Flight Code</th>
            <th>Airline</th>
            <th>Symbol</th>
            <th>Takeoff Time</th>
            <th>Landing Time</th>
            <th>Total Price</th>
            <th>Seat Class</th>
            <th>Departure Province</th>
            <th>Destination Province</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.flightCode}</td>
              <td>{flight.airline}</td>
              <td>{flight.symbol}</td>
              <td>{new Date(flight.takeoffTime).toLocaleString()}</td>
              <td>{new Date(flight.landingTime).toLocaleString()}</td>
              <td>{flight.totalPrice.toLocaleString()} VND</td>
              <td>{flight.seatClass}</td>
              <td>{flight.departureProvince}</td>
              <td>{flight.destinationProvince}</td>
              <td>
                <button className="action-btn view-btn" onClick={() => handleViewFlight(flight)}>View</button>
                <button className="action-btn edit-btn" onClick={() => handleEditFlight(flight)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <FlightForm
          flight={selectedFlight}
          onSave={handleSaveFlight}
          onCancel={handleCancel}
          isViewOnly={isViewOnly}
        />
      )}
    </div>
  );
};

export default FlightManagement;