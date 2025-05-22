import React from "react";

const FlightResults = ({ flights, sortOption, onViewDetails }) => {
  const sampleFlights = [
    {
      id: 1,
      time: "2:45 PM",
      duration: "4h 30m",
      arrival: "7:15 PM",
      price: "VND6,071,525.00",
      airline: "VietJet Aviation",
      date: "Jun 21 - Jun 28",
      stops: "1 stop",
    },
    {
      id: 2,
      time: "7:10 PM",
      duration: "12h 50m",
      arrival: "8:00 AM",
      price: "VND6,071,525.00",
      airline: "VietJet Aviation",
      date: "Jun 21 - Jun 29",
      stops: "1 stop",
    },
  ];

  const sortedFlights = [...(flights.length ? flights : sampleFlights)].sort((a, b) => {
    if (sortOption === "Cheapest") return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
    if (sortOption === "Fastest") return parseInt(a.duration.split("h")[0]) - parseInt(b.duration.split("h")[0]);
    return 0;
  });

  return (
    <div className="flight-results">
      {sortedFlights.map((flight) => (
        <div key={flight.id} className="flight-card">
          <div className="badges">
            <span className="badge green">Cheapest</span>
            <span className="badge lightgreen">Flexible ticket upgrade available</span>
          </div>

          <div className="flight-content">
            <div className="flight-info">
              <div className="time-info">
                <strong>{flight.time}</strong>
                <span>SGN • {flight.date.split(" - ")[0]}</span>
              </div>
              <div className="stop-info">
                <div className="line"></div>
                <span className="stops">{flight.stops}</span>
                <div className="line"></div>
                <span className="duration">{flight.duration}</span>
              </div>
              <div className="time-info">
                <strong>{flight.arrival}</strong>
                <span>HAN • {flight.date.split(" - ")[0]}</span>
              </div>
            </div>

            <div className="flight-price">
              <div className="price">{flight.price}</div>
              <button className="view-details" onClick={() => onViewDetails(flight)}>
                View details
              </button>
            </div>
          </div>

          <div className="airline-name">{flight.airline}</div>
        </div>
      ))}

      <div className="better-prices">
        <div className="better-prices-text">
          <strong>We found better prices! Compare nearby dates.</strong>
          <p>Latest prices found for your search – actual prices shown in next step</p>
        </div>
        <div className="date-options">
          <button>Jun 18 – Jun 25<br /><strong>VND3,682,292</strong></button>
          <button>Jun 19 – Jun 26<br /><strong>VND3,990,161</strong></button>
          <button>Jun 20 – Jun 27<br /><strong>VND4,187,913</strong></button>
          <button>Jun 22 – Jun 29<br /><strong>VND3,713,320</strong></button>
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
