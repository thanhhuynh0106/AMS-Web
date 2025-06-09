import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiService from "../service/apiService";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Modal from "../components/recommend/Modal"; // Import Modal component
import "./RecommendationsPage.scss";

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [cheapestFlights, setCheapestFlights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [attractionsCost, setAttractionsCost] = useState(0);
  const [numDays, setNumDays] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [departureProvinceId, setDepartureProvinceId] = useState("");
  const [destinationProvinceIds, setDestinationProvinceIds] = useState([]);
  const [ticketQuantity, setTicketQuantity] = useState(2);
  const [userId, setUserId] = useState(null);
  // State cho modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // Parse query string and extract detailed location data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setDepartureProvinceId(params.get("departureProvinceId") || "HCM");
    setDestinationProvinceIds(params.get("destinationProvinceIds")?.split(",") || []);
    setStartDate(params.get("takeoffDate") || "");
    setEndDate(params.get("endDate") || "");
    setNumDays(parseInt(params.get("numDays")) || 1);
    setAttractionsCost(parseInt(params.get("price")) || 0);
    const locationsStr = params.get("locations") || "";
    try {
      const parsedLocations = JSON.parse(locationsStr);
      console.log("Parsed selectedLocations from query:", parsedLocations);
      setSelectedLocations(parsedLocations);
    } catch (err) {
      console.error("Error parsing locations from query:", err);
      setError("Failed to parse selected locations. Please try again.");
      setSelectedLocations([]);
    }
  }, [location.search]);

  // Fetch provinces from API
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await apiService.getAllProvinces();
        console.log("Provinces data from API:", data);
        setProvinces(data.provinceList || []);
      } catch (err) {
        console.error("Error fetching provinces:", err);
        setError("Failed to load province data. Please try again later.");
      }
    };
    fetchProvinces();
  }, []);

  // Fetch user profile to get userId
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiService.getUserProfile();
        console.log("User profile response:", response);
        if (response && response.usersDTO.userId) {
          setUserId(response.usersDTO.userId);
        } else {
          setError("Failed to retrieve user information. Please log in again.");
          navigate("/sign-in");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please log in again.");
        navigate("/sign-in");
      }
    };
    fetchUserProfile();
  }, [navigate]);

  // Fetch cheapest flights, wait for provinces to load
  useEffect(() => {
    const fetchCheapestFlights = async () => {
      if (destinationProvinceIds.length === 0 || !startDate || !endDate) {
        setError("Invalid trip parameters.");
        setLoading(false);
        return;
      }
      if (provinces.length === 0) {
        console.log("Waiting for provinces data to load...");
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.findCheapestFlightsForTrip(
          departureProvinceId,
          destinationProvinceIds,
          numDays,
          startDate,
          endDate
        );
        console.log("Cheapest flights response:", response);
        if (response.statusCode === 200) {
          setCheapestFlights(response);
        } else if (response.statusCode === 403) {
          setError("Access forbidden. Please check your permissions or log in again.");
          navigate("/sign-in");
        } else {
          setError(response.message || "Failed to fetch flight data.");
          setCheapestFlights(null);
        }
      } catch (err) {
        console.error("Error fetching cheapest flights:", err);
        if (err.response?.status === 403) {
          setError("Access forbidden. Please check your permissions or log in again.");
          navigate("/sign-in");
        } else {
          setError("Failed to fetch flight data. Please try again.");
          setCheapestFlights(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCheapestFlights();
  }, [departureProvinceId, destinationProvinceIds, numDays, startDate, endDate, provinces, navigate]);

  // Handle booking multiple flights
  const handleBookFlights = async () => {
    if (!cheapestFlights || !cheapestFlights.flightList || cheapestFlights.flightList.length === 0) {
      setModalTitle("Error");
      setModalMessage("No valid flights available to book.");
      setIsModalOpen(true);
      return;
    }
    if (ticketQuantity < 1) {
      setModalTitle("Error");
      setModalMessage("Please enter a valid ticket quantity (at least 1).");
      setIsModalOpen(true);
      return;
    }
    if (!userId) {
      setModalTitle("Authentication Error");
      setModalMessage("User information not available. Please log in again.");
      setIsModalOpen(true);
      navigate("/sign-in");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const bookingList = cheapestFlights.flightList.map((flight) => ({
        flightId: flight.flightId,
        ticketQuantity: parseInt(ticketQuantity),
      }));
      console.log("Booking list to be sent:", bookingList);
      const response = await apiService.bookMultipleFlights(userId, bookingList);
      console.log("Booking response:", response);
      if (response.statusCode === 200) {
        setModalTitle("Booking Successful");
        setModalMessage(
          "You have booked a ticket but have not paid yet\nPlease go to Profile -> Booking History to pay for your tickets."
        );
        setIsModalOpen(true);
        setTimeout(() => {
          navigate("/profile", { state: { tab: "timeline" } });
        }, 1000);
      } else {
        setModalTitle("Booking Failed");
        setModalMessage(response.message || "Failed to book flights.");
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error("Error booking flights:", err);
      setModalTitle("Booking Failed");
      setModalMessage("Failed to book flights. Please try again.");
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
    setModalMessage("");
  };

  if (loading) {
    return (
      <div className="recommendations-page section">
        <Navbar />
        <div className="container">
          <div className="loading">Loading recommendations...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="recommendations-page section">
        <Navbar />
        <div className="container">
          <div className="error">{error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="recommendations-page section">
      <Navbar />
      <div className="container">
        <h2 className="recommendations-page__title">Your Trip Recommendations</h2>
        <div className="recommendations-page__content">
          <div className="recommendations-page__summary">
            <h3 className="recommendations-page__subtitle">Trip Summary</h3>
            <p><strong>Start Date:</strong> {startDate}</p>
            <p><strong>End Date:</strong> {endDate}</p>
            <p><strong>Number of Days:</strong> {numDays}</p>
            <p><strong>Attractions Cost:</strong> {attractionsCost} VND</p>
            <p>
            <strong>Flights Cost:</strong>{" "}
            {cheapestFlights && cheapestFlights.flightList
                ? cheapestFlights.flightList.reduce((total, flight) => total + (flight.totalPrice * ticketQuantity), 0)
                : 0} VND
             </p>
            <div className="recommendations-page__ticket-input">
              <label htmlFor="ticket-quantity">Ticket Quantity:</label>
              <input
                id="ticket-quantity"
                type="number"
                value={ticketQuantity}
                onChange={(e) => setTicketQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                aria-label="Number of tickets"
              />
            </div>
            <h4>Selected Attractions</h4>
            {selectedLocations.length > 0 ? (
              selectedLocations.map((item, index) => (
                <div key={index} className="recommendations-page__province-group">
                  <p>
                    <strong>Province:</strong> {item.provinceName || `Unknown (ID: ${item.provinceId})`}
                  </p>
                  <ul className="recommendations-page__location-list">
                    {item.locations.map((location) => (
                      <li key={location.locationId}>
                        {location.locationName || `Unknown Location (ID: ${location.locationId})`}
                        <br />
                        <span>Description: {location.locationDescription || "N/A"}</span>
                        <br />
                        <span>Price per Day: {location.pricePerDay || "N/A"} VND</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="recommendations-page__empty">No attractions selected.</p>
            )}
          </div>
          <div className="recommendations-page__flights">
            <h3 className="recommendations-page__subtitle">Recommended Flights</h3>
            {cheapestFlights && cheapestFlights.flightList && cheapestFlights.flightList.length > 0 ? (
              cheapestFlights.flightList.map((flight, index) => (
                <div key={index} className="recommendations-page__flight-item">
                  <p>
                    <strong>Flight {flight.flightCode} ({flight.airline}):</strong>
                  </p>
                  <p>From: {flight.departureProvinceId} To: {flight.destinationProvinceId}</p>
                  <p>Date: {flight.takeoffDate}</p>
                  <p>Takeoff: {flight.takeoffTime}</p>
                  <p>Landing: {flight.landingTime}</p>
                  <p>Price: {flight.totalPrice} VND / ticket</p>
                  {flight.daysAtDestination > 0 && (
                    <p>Stay: {flight.daysAtDestination} day(s)</p>
                  )}
                </div>
              ))
            ) : (
              <p className="recommendations-page__empty">No flights available for the selected criteria.</p>
            )}
          </div>
          <div className="recommendations-page__actions">
            <button
              className="btn recommendations-page__back-btn"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
            <button
              className="btn recommendations-page__ok-btn"
              onClick={handleBookFlights}
              disabled={!cheapestFlights || !cheapestFlights.flightList || cheapestFlights.flightList.length === 0}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalTitle}
        message={modalMessage}
      />
    </div>
  );
};

export default RecommendationsPage;