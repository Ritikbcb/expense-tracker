function Summary({ balance, income, expense }) {
  return (
    <div className="summary">
      <div className="card">
        <h3>Balance</h3>
        <p>₹{balance}</p>
      </div>

      <div className="card income">
        <h3>Income</h3>
        <p>₹{income}</p>
      </div>

      <div className="card expense">
        <h3>Expense</h3>
        <p>₹{Math.abs(expense)}</p>
      </div>
    </div>
  );
}

export default Summary;