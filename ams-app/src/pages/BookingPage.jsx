import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import FlightDetailModal from "../components/result/FlightDetailModal";
import { FaSuitcaseRolling } from "react-icons/fa";
import { MdOutlineLuggage } from "react-icons/md";
import { BsLuggage } from "react-icons/bs";



const BookingPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const departure = query.get("departure") || "Ho Chi Minh City (SGN)";
  const destination = query.get("destination") || "Hanoi (HAN)";
  const date = query.get("date") || "Jun 21 - Jun 28";
  const adult = query.get("adult") || "1";

  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const flightDetails = {
    outbound: {
      departureTime: "9:00 PM",
      departureAirport: "SGN Tan Son Nhat International Airport",
      arrivalTime: "11:05 PM",
      arrivalAirport: "HAN Noi Bai International Airport",
      duration: "2h 05m",
      airline: "Vietnam Airlines",
      flightCode: "VN260",
      date: "Sat, Jun 21",
    },
    return: {
      departureTime: "11:30 PM",
      departureAirport: "HAN Noi Bai International Airport",
      arrivalTime: "1:40 AM",
      arrivalAirport: "SGN Tan Son Nhat International Airport",
      duration: "2h 10m",
      airline: "Vietnam Airlines",
      flightCode: "VN7255",
      date: "Sat, Jun 28 - Sun, Jun 29",
    },
    price: "7345520",
    departureCity: "Ho Chi Minh City",
    destinationCity: "Hanoi",
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight || flightDetails);
  };

  const closeModal = () => {
    setSelectedFlight(null);
  };

  return (
    <div className="booking-page">
      <Navbar />
      <div className="booking-container">
        <div className="left-panel">
          <h1>Check and pay</h1>
          <div className="flight-info">
            <div className="flight-item">
              <div className="flight-icon"></div>
              <div className="flight-details">
                <p>{departure} (SGN) to {destination} (HAN)</p>
                <p>{flightDetails.outbound.date}</p>
                <p>Direct · {flightDetails.outbound.duration} · Economy</p>
                <p>{flightDetails.outbound.airline} - {flightDetails.outbound.flightCode}</p>
              </div>
              <a href="#" className="view-details-btn" onClick={() => handleViewDetails()}>
                View flight details
              </a>
            </div>
            <div className="flight-item">
              <div className="flight-icon"></div>
              <div className="flight-details">
                <p>{destination} (HAN) to {departure} (SGN)</p>
                <p>{flightDetails.return.date}</p>
                <p>Direct · {flightDetails.return.duration} · Economy</p>
                <p>{flightDetails.return.airline} - {flightDetails.return.flightCode}</p>
              </div>
              <a href="#" className="view-details-btn" onClick={() => handleViewDetails()}>
                View flight details
              </a>
            </div>
          </div>
          <div className="contact-details">
            <h3>Contact details</h3>
            <p>+840988816530</p>
            <p>asdasd@gmail.com</p>
          </div>
          <div className="traveler-details">
            <h3>Traveler details</h3>
            <p>AB CD</p>
            <p>Adult, Male</p>
          </div>
          <div className="baggage-section">
            <h2>Baggage</h2>
            <p>Total number of bags included for all travelers</p>
            <div className="baggage-details">
              <div className="flight-baggage">
                <h3>Flight to Hanoi</h3>
                <ul>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/> </span> 1 personal item</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/> </span> Fits under the seat in front of you</li>
                  <li><span className="baggage-icon"> <MdOutlineLuggage/> </span> 1 carry-on bag</li>
                  <li><span className="baggage-icon"> <MdOutlineLuggage/> </span> 23 x 36 x 56 cm · Max weight 10 kg</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/></span> 1 checked bag</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/></span> Max weight 23 kg</li>
                </ul>
                <a href="#" className="view-baggage-btn">View baggage per traveler</a>
              </div>
              <div className="flight-baggage">
                <h3>Flight to Ho Chi Minh City</h3>
                <ul>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/> </span> 1 personal item</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/> </span> Fits under the seat in front of you</li>
                  <li><span className="baggage-icon"> <MdOutlineLuggage/> </span> 1 carry-on bag</li>
                  <li><span className="baggage-icon"> <MdOutlineLuggage/> </span> 23 x 36 x 56 cm · Max weight 10 kg</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/></span> 1 checked bag</li>
                  <li><span className="baggage-icon"> <FaSuitcaseRolling/></span> Max weight 23 kg</li>
                </ul>
                <a href="#" className="view-baggage-btn">View baggage per traveler</a>
              </div>
            </div>
            <p className="baggage-note">
              For more detailed baggage info and options, check airline baggage policies:
              <a href="#">Vietnam Airlines</a>
            </p>
          </div>
          <div className="payment-section">
            <h2>Your payment</h2>
            <p>Simple, safe, and secure.</p>
            <div className="payment-options">
              <span>How do you want to pay?</span>
              <div className="card-logos">
                <img src="/src/assets/mastercard.png" alt="AMEX" className="card-logo" />
                <img src="/src/assets/visa.webp" alt="Visa" className="card-logo" />
                <img src="/src/assets/momo.webp" alt="MasterCard" className="card-logo" />
              </div>
            </div>
            <div className="payment-form">
              <label>Cardholder's name *</label>
              <input type="text" placeholder="AB CD" />
              <label>Card number *</label>
              <input type="text" placeholder="•••• •••• •••• ••••" />
              <div className="expiration-cvc">
                <div>
                  <label>Expiration date *</label>
                  <input type="text" placeholder="MM/YY" />
                </div>
                <div>
                  <label>CVC *</label>
                  <input type="text" placeholder="•••" />
                </div>
              </div>
            </div>
          </div>
          <div className="terms-and-conditions">
            <p className="terms">
                    By clicking "pay now" you agree with the terms and conditions and privacy policies of Booking.com, Gotogate
                    International AB, Vietnam Airlines, and with the fare rules.
            </p>
            <div className="payment-buttons">
                <button className="back-btn">← Back</button>
                <button className="pay-now-btn">Pay now</button>
              </div>
            </div>
        </div>
        <div className="right-panel">
          <div className="price-details">
            <h3>Price details</h3>
            <div className="price-item">
              <span>Flight</span>
              <span>Adult (1)</span>
              <span>VND7,345,520.00</span>
            </div>
            <button
              className={`toggle-breakdown-btn ${showPriceBreakdown ? "expanded" : ""}`}
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            >
              Details
            </button>
            <div className={`price-breakdown ${showPriceBreakdown ? "show" : ""}`}>
              <div className="breakdown-item">
                <span>Total taxes and fees</span>
                <span>VND845,520.00</span>
              </div>
            </div>
            <div className="total">
              <span>Total</span>
              <span>VND7,345,520.00</span>
              <span>Includes taxes and fees</span>
              <span>No hidden fees - here's what you'll pay</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {selectedFlight && <FlightDetailModal flight={selectedFlight} onClose={closeModal} />}
    </div>
  );
};

export default BookingPage;