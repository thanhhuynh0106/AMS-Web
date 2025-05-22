import React from "react";

const Filters = () => {
  return (
    <div className="filters">
      <h3>Filter your results</h3>
      <p>Showing 1076 flights</p>
      {/* <div className="filter-section">
        <h4>Stops</h4>
        <label>
          <input type="radio" name="stops" defaultChecked /> Any
        </label>
        <p>From VND6,073,081.00 - 1076</p>
        <label>
          <input type="radio" name="stops" /> Direct only
        </label>
        <p>From VND7,345,520.00 - 182</p>
        <label>
          <input type="radio" name="stops" /> 1 stop max
        </label>
        <p>From VND6,073,081.00 - 1076</p>
      </div> */}
        <div className="filter-section">
            <h4>Airlines</h4>
            <label>
            <input type="checkbox" /> VietJet Air
            </label>
            <label>
            <input type="checkbox" /> Vietnam Airlines
            </label>
            <label>
            <input type="checkbox" /> Bamboo Airways
            </label>
        </div>
        <div className="filter-section">
            <h4>Duration</h4>
            <label>
            <input type="checkbox" /> 0-2 hours
            </label>
            <label>
            <input type="checkbox" /> 2-4 hours
            </label>
            <label>
            <input type="checkbox" /> 4-6 hours
            </label>
        </div>
    </div>
  );
};

export default Filters;