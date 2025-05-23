import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "../components/search/Search";
import SearchSummary from "../components/result/SearchSummary";
import FlightResults from "../components/result/FlightResults";
import Filters from "../components/result/Filters";
import Footer from "../components/footer/Footer";
import FlightDetailModal from "../components/result/FlightDetailModal";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const departure = query.get("departure") || "SGN Tan Son Nhat International";
  const destination = query.get("destination") || "HAN Noi Bai International Airport";
  const date = query.get("date") || "06-21";
  const adult = query.get("adult") || "1";

  const [flights, setFlights] = useState([]);
  const [sortOption, setSortOption] = useState("Cheapest");
  const [loading, setLoading] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    setLoading(true);

    // Dữ liệu mẫu đã được cập nhật để khớp với FlightDetailModal
    const bestFlights = [
      {
        id: 1,
        time: "8:00 AM",
        duration: "5h 00m",
        arrival: "1:00 PM",
        price: "VND 6500000",
        airline: "Vietnam Airlines",
        date: date,
        stops: "Nonstop",
        departureCity: "Ho Chi Minh City",
        destinationCity: "Hanoi",
        outbound: {
          departureTime: "8:00 AM",
          departureAirport: "SGN Tan Son Nhat International",
          arrivalTime: "1:00 PM",
          arrivalAirport: "HAN Noi Bai International Airport",
          duration: "5h 00m",
        },
        return: {
          departureTime: "3:00 PM",
          departureAirport: "HAN Noi Bai International Airport",
          arrivalTime: "8:00 PM",
          arrivalAirport: "SGN Tan Son Nhat International",
          duration: "5h 00m",
        },
      },
    ];

    const cheapestFlights = [
      {
        id: 2,
        time: "2:45 PM",
        duration: "4h 30m",
        arrival: "7:15 PM",
        price: "VND 6071525",
        airline: "VietJet Aviation",
        date: date,
        stops: "1 stop",
        departureCity: "Ho Chi Minh City",
        destinationCity: "Hanoi",
        outbound: {
          departureTime: "2:45 PM",
          departureAirport: "SGN Tan Son Nhat International",
          arrivalTime: "7:15 PM",
          arrivalAirport: "HAN Noi Bai International Airport",
          duration: "4h 30m",
        },
        return: {
          departureTime: "9:00 AM",
          departureAirport: "HAN Noi Bai International Airport",
          arrivalTime: "1:30 PM",
          arrivalAirport: "SGN Tan Son Nhat International",
          duration: "4h 30m",
        },
      },
    ];

    const fastestFlights = [
      {
        id: 3,
        time: "9:00 AM",
        duration: "1h 50m",
        arrival: "10:50 AM",
        price: "VND 7000000",
        airline: "Bamboo Airways",
        date: date,
        stops: "Nonstop",
        departureCity: "Ho Chi Minh City",
        destinationCity: "Hanoi",
        outbound: {
          departureTime: "9:00 AM",
          departureAirport: "SGN Tan Son Nhat International",
          arrivalTime: "10:50 AM",
          arrivalAirport: "HAN Noi Bai International Airport",
          duration: "1h 50m",
        },
        return: {
          departureTime: "12:00 PM",
          departureAirport: "HAN Noi Bai International Airport",
          arrivalTime: "1:50 PM",
          arrivalAirport: "SGN Tan Son Nhat International",
          duration: "1h 50m",
        },
      },
    ];

    let selectedFlights = cheapestFlights;
    if (sortOption === "Best") selectedFlights = bestFlights;
    if (sortOption === "Fastest") selectedFlights = fastestFlights;

    setTimeout(() => {
      setFlights(selectedFlights);
      setLoading(false);
    }, 300);
  }, [departure, destination, date, sortOption]);

  const handleSearch = (newQuery) => {
    navigate(`/search-result?${newQuery.toString()}`);
  };

  const handleViewDetails = (flight) => {
    setSelectedFlight(flight);
  };

  const closeModal = () => {
    setSelectedFlight(null);
  };

  return (
    <>
      <div className="search-result-page">
        <Navbar />
        <SearchBar
          initialDeparture={departure}
          initialDestination={destination}
          initialDate={date.split(" to ")[0]}
          initialReturnDate={date.split(" to ")[1]}
          initialAdult={adult}
          onSearch={handleSearch}
        />
        <div className="result-container">
          <div className="left-panel">
            <SearchSummary
              departure={departure}
              destination={destination}
              date={date}
              adult={adult}
            />
            <Filters />
          </div>
          <div className="right-panel">
            <div className="sort-container">
              <div className="sort-options">
                <button
                  className={sortOption === "Best" ? "active" : ""}
                  onClick={() => setSortOption("Best")}
                >
                  Best
                </button>
                <button
                  className={sortOption === "Cheapest" ? "active" : ""}
                  onClick={() => setSortOption("Cheapest")}
                >
                  Cheapest
                </button>
                <button
                  className={sortOption === "Fastest" ? "active" : ""}
                  onClick={() => setSortOption("Fastest")}
                >
                  Fastest
                </button>
              </div>
            </div>
            {loading ? (
              <div className="loading">Loading flights...</div>
            ) : (
              <FlightResults
                flights={flights}
                sortOption={sortOption}
                onViewDetails={handleViewDetails}
              />
            )}
          </div>
        </div>
        {selectedFlight && (
          <FlightDetailModal flight={selectedFlight} onClose={closeModal} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;