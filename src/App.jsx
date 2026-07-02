import { useState, useEffect } from "react";
import "./App.css";
import ExpenseChart from "./ExpenseChart";
import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SearchBar from "./components/SearchBar";
import ExportCSV from "./components/ExportCSV";
import ExportPDF from "./components/ExportPDF";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("General");
  const [search, setSearch] = useState("");
const [filter, setFilter] = useState("all");
const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});
const [editId, setEditId] = useState(null);

 const addTransaction = () => {
  if (text.trim() === "" || amount === "") return;

  if (editId) {
    setTransactions(
      transactions.map((item) =>
        item.id === editId
          ? {
              ...item,
              text,
              amount: Number(amount),
              date,
              category,
            }
          : item
      )
    );

    setEditId(null);
    toast.info("Transaction Updated Successfully!");
  } else {
    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
      date,
      category,
    };

    setTransactions([...transactions, newTransaction]);
  toast.success("Transaction Added Successfully!");
  }
  setText("");
  setAmount("");
  setDate(new Date().toISOString().split("T")[0]);
  setCategory("General");
};

  const deleteTransaction = (id) => {
  setTransactions(transactions.filter((item) => item.id !== id));
  toast.error("Transaction Deleted Successfully!");
};
  const editTransaction = (item) => {
  setEditId(item.id);
  setText(item.text);
  setAmount(item.amount);
  setDate(item.date);
  setCategory(item.category);
};

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);
  useEffect(() => {
  if (darkMode) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  const income = transactions
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const expense = transactions
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const balance = income + expense;

  return (
    <div className="container">
      <Header />
      <div style={{ textAlign: "right", marginBottom: "15px" }}>
  <button onClick={() => setDarkMode(!darkMode)}>
    {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
  </button>
</div>

      <Summary
  balance={balance}
  income={income}
  expense={expense}
/>
   <TransactionForm
  text={text}
  setText={setText}
  amount={amount}
  setAmount={setAmount}
  date={date}
  setDate={setDate}
  category={category}
  setCategory={setCategory}
  addTransaction={addTransaction}
  editId={editId}
/>
<SearchBar
  search={search}
  setSearch={setSearch}
  filter={filter}
  setFilter={setFilter}
/>
      <ExpenseChart
        income={income}
        expense={expense}
      />
      <ExportCSV transactions={transactions} />
      <ExportPDF transactions={transactions} />



      
<TransactionList
  transactions={transactions.filter((item) => {
    const matchSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "income") {
      return matchSearch && item.amount > 0;
    }

    if (filter === "expense") {
      return matchSearch && item.amount < 0;
    }

    return matchSearch;
  })}
  deleteTransaction={deleteTransaction}
  editTransaction={editTransaction}
/>
<ToastContainer
  position="top-right"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
/>
    </div>
  );
}

export default App;