import React from "react";

const FlightForm = ({ flight, onSave, onCancel, isViewOnly }) => {
  const [formData, setFormData] = React.useState(flight || {
    flightCode: "",
    airline: "",
    symbol: "",
    takeoffTime: "",
    landingTime: "",
    totalPrice: "",
    seatClass: "",
    departureProvince: "",
    destinationProvince: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="flight-form-overlay">
      <div className="flight-form-container">
        <h3>{isViewOnly ? "View Flight" : flight ? "Edit Flight" : "Add New Flight"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Flight Code</label>
            <input
              type="text"
              name="flightCode"
              value={formData.flightCode}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Airline</label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Symbol</label>
            <input
              type="text"
              name="symbol"
              value={formData.symbol}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Takeoff Time</label>
            <input
              type="datetime-local"
              name="takeoffTime"
              value={formData.takeoffTime}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Landing Time</label>
            <input
              type="datetime-local"
              name="landingTime"
              value={formData.landingTime}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Total Price</label>
            <input
              type="number"
              name="totalPrice"
              value={formData.totalPrice}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Seat Class</label>
            <select
              name="seatClass"
              value={formData.seatClass}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            >
              <option value="">Select Seat Class</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
          <div className="form-group">
            <label>Departure Province</label>
            <input
              type="text"
              name="departureProvince"
              value={formData.departureProvince}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          <div className="form-group">
            <label>Destination Province</label>
            <input
              type="text"
              name="destinationProvince"
              value={formData.destinationProvince}
              onChange={handleChange}
              disabled={isViewOnly}
              required
            />
          </div>
          {!isViewOnly && (
            <button type="submit" className="save-btn">
              Save
            </button>
          )}
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightForm;