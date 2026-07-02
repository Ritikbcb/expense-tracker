function TransactionList({
  transactions,
  deleteTransaction,
  editTransaction,
}) {
  return (
    <>
      <h2>Transactions</h2>

      <ul className="list">
        {transactions.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.text}</strong>
              <br />
              <small>Category: {item.category}</small>
              <br />
              ₹{item.amount}
              <br />
              <small>{item.date}</small>
            </div>

            <div className="action-buttons">
              <button
                className="edit-btn"
                onClick={() => editTransaction(item)}
              >
                ✏ Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTransaction(item.id)}
              >
                🗑 Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;