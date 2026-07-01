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

  const addTransaction = () => {
    if (text.trim() === "" || amount === "") return;

    const newTransaction = {
      id: Date.now(),
      text,
      amount: Number(amount),
      date,
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

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
/>
    </div>
  );
}

export default App;