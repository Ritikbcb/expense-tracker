function TransactionForm({
  text,
  setText,
  amount,
  setAmount,
  date,
  setDate,
  category,
  setCategory,
  addTransaction,
  editId,
}) {
  return (
    <div className="form">

      <input
        type="text"
        placeholder="Description"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount (+Income / -Expense)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>General</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Salary</option>
        <option>Bills</option>
      </select>

      <button onClick={addTransaction}>
        {editId ? "Update" : "Add"}
      </button>

    </div>
  );
}

export default TransactionForm;