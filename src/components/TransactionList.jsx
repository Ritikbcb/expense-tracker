function TransactionList({ transactions, deleteTransaction }) {
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

            <button
              className="delete-btn"
              onClick={() => deleteTransaction(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;