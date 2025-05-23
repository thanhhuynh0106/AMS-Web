import React from "react";

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      bookingId: "B001",
      flight: "Ho Chi Minh City to Bangkok",
      date: "2025-05-20",
      amount: "$200",
      status: "Completed",
    },
    {
      id: 2,
      bookingId: "B002",
      flight: "Hanoi to Singapore",
      date: "2025-05-15",
      amount: "$300",
      status: "Completed",
    },
  ];

  return (
    <div className="transaction-history">
      <h2>Booking History</h2>
      {transactions.length > 0 ? (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Flight</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.bookingId}</td>
                <td>{transaction.flight}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionHistory;