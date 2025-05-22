import React, { useState } from "react";

const SearchSummary = ({ departure, destination, date, adult }) => {
  const [showSummary, setShowSummary] = useState(false);

  const handleViewSummary = () => {
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  return (
    <div className="search-summary">
      <h3>Search summary</h3>
      <p>Get a quick overview of how the number of stops affects prices for your search</p>
      <button className="view-summary-btn" onClick={handleViewSummary}>
        View summary
      </button>

      {showSummary && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseSummary}>×</button>
            <h3>Automated search summary</h3>
            {/* <p><strong>Departure:</strong> {departure}</p>
            <p><strong>Destination:</strong> {destination}</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Adults:</strong> {adult}</p> */}
            <p>You have 170 direct flights available starting from VND 7,345,520.00, making it the most convenient option with no stops. For a wider selection, there are 1,029 flights with 1 stop max, with prices starting from VND 6,071,525.00. While the flights with 1 stop max are cheaper, they do involve an additional stop, which may be less desirable. If time and convenience are key, the direct flights are worth considering despite the higher price.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSummary;
