import React, { useEffect } from "react";

const FlightDetailModal = ({ flight, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flight-detail-modal" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <h2>Your flight to {flight.destinationCity}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-content-scroll">
          <div className="flight-section">
            <h4>Flight to {flight.destinationCity}, Vietnam</h4>
            <p>Direct · {flight.outbound.duration}</p>
            <div className="flight-times">
              <p>{flight.outbound.departureTime} – {flight.outbound.departureAirport}</p>
              <p>{flight.outbound.arrivalTime} – {flight.outbound.arrivalAirport}</p>
            </div>
          </div>

          <div className="flight-section">
            <h4>Flight to {flight.departureCity}, Vietnam</h4>
            <p>Direct · {flight.return.duration}</p>
            <div className="flight-times">
              <p>{flight.return.departureTime} – {flight.return.departureAirport}</p>
              <p>{flight.return.arrivalTime} – {flight.return.arrivalAirport}</p>
            </div>
          </div>

          <div className="info-section">
            <h4>Baggage</h4>
            <ul>
              <li>1 personal item – Included</li>
              <li>1 carry-on bag (max 10 kg) – Included</li>
              <li>1 checked bag (max 23 kg) – Included</li>
            </ul>
          </div>

          <div className="info-section">
            <h4>Fare rules</h4>
            <ul>
              <li>You’re allowed to change this flight for a fee</li>
              <li>You’re allowed to cancel this flight for a fee</li>
            </ul>
          </div>

          <div className="info-section">
            <h4>Extras you might like</h4>
            <p>Flexible ticket – Available in the next steps</p>
            <p>+VND954,917.60 for all travelers</p>
          </div>
        </div>

        <div className="footer">
          <div className="price">VND{Number(flight.price).toLocaleString()}</div>
          <button className="select-btn">Select</button>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailModal;