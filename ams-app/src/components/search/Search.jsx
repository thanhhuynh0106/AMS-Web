import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const Search = () => {
  React.useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const [departure, setDeparture] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [date, setDate] = React.useState("");
  const [guest, setGuest] = React.useState("");
  const [flights, setFlights] = useState([]);

  const handleSearch = () => {
    if (!date) return alert("Please enter a date.");
    fetch(`http://localhost:8080/api/flights?flightDate=${date}`)
      .then((res) => res.json())
      .then((data) => setFlights(data))
      .catch((err) => console.error("Error fetching flights:", err));
  };

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div>
          <h2 className="sectionTitle">Compare and book cheap flights with ease!</h2>
        </div>
        {/* <div className="btns flex">
          <div className="singleBtn">
            <span>Economy class</span>
          </div>
          <div className="singleBtn">
            <span>Business class</span>
          </div>
          <div className="singleBtn">
            <span>First class</span>
          </div>
        </div> */}

        <div className="searchInputs flex">
          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Departure</h4>
              <input
                type="text"
                placeholder="Where are you from?"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className="icon" />
            </div>
            <div className="texts">
              <h4>Destination</h4>
              <input
                type="text"
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className="icon" />
            </div>
            <div className="texts">
              <h4>Date</h4>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className="icon" />
            </div>
            <div className="texts">
              <h4>Guest</h4>
              <input
                type="text"
                placeholder="Add guest"
                value={guest}
                onChange={(e) => setGuest(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btnBlock flex" onClick={handleSearch}>
            Search Flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;