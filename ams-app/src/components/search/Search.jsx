import React from 'react'

import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { useState } from 'react';

import Aos from 'aos';
import 'aos/dist/aos.css';


const Search = () => {
  React.useEffect(() => {
    Aos.init({duration: 2000})
  }, [])

  const [location, setLocation] = React.useState('')
  const [guest, setGuest] = React.useState('')
  const [date, setDate] = React.useState('')
  const [date2, setDate2] = React.useState('')
  const [flights, setFlights] = useState([]);

  const handleSearch = () => {
    if (!date) return alert("Please enter a date.");
    fetch(`http://localhost:8080/api/flights?flightDate=${date}`)
      .then(res => res.json())
      .then(data => setFlights(data))
      .catch(err => console.error("Error fetching flights:", err));
  }

  return (

    <div className='search container section'>
      <div data-aos='fade-up' data-aos-duration='2500'  className="sectionContainer grid">

        <div className="btns flex">

          <div className="singleBtn">
            <span>Economy class</span>
          </div>

          <div className="singleBtn">
            <span>Business class</span>
          </div>

          <div className="singleBtn">
            <span>First class</span>
          </div>

        </div>

        <div data-aos='fade-up' data-aos-duration='2000' className="searchInputs flex">

          <div className="singleInput flex">
            <div className="iconDiv">
              <HiOutlineLocationMarker className='icon'/>
            </div>

            <div className="texts">
              <h4>Location</h4>
              <input type="text" placeholder='Where do you want to go?' 
                      value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RiAccountPinCircleLine className='icon'/>
            </div>

            <div className="texts">
              <h4>Travelers</h4>
              <input type="text" placeholder='Add guest' 
                      value={guest} onChange={(e) => setGuest(e.target.value)} />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className='icon'/>
            </div>

            <div className="texts">
              <h4>Check-in</h4>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="singleInput flex">
            <div className="iconDiv">
              <RxCalendar className='icon'/>
            </div>

            <div className="texts">
              <h4>Check-out</h4>
              <input type="text" placeholder='Add date'/>
            </div>
          </div>

          <button className='btn btnBlock flex' onClick={handleSearch}>Search Flight</button>

        </div>

          {/* Results */}
          {flights.length > 0 && (
          <div className="flightResults">
            <h3>Flight Results for {date}:</h3>
            <table className="flightTable">
              <thead>
                <tr>
                  <th>Flight Code</th>
                  <th>Route</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map(flight => (
                  <tr key={flight.id}>
                    <td>{flight.flightCode}</td>
                    <td>{flight.route}</td>
                    <td>{flight.scheduleTime}</td>
                    <td>{flight.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  )
}

export default Search;