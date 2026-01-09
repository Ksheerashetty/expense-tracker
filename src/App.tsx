import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import type { TransactionInput } from "./types";
import { TransactionList } from "./components/Dashboard/TransactionList";
import { TransactionForm } from "./components/Dashboard/TransactionForm";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const {
    transactions,
    total,
    categoryTotal,
    addTransaction,
    deleteTransaction,
    editTransaction,
    averageTransaction,
  } = useTransactions();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRecent, setIsRecent] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const colorPalette = [
    "#590f9a97",
    "#98098cff",
    "#9106919e",
    "#690ff0ff",
    "#0f5ac2ff",
    "#74089bff",
    "#3ff4f1ff",
    "#16a085",
    "#8e44ad",
    "#22e6abff",
    "#2e4eccff",
    "#1abc9c",
    "#1500d3ff",
    "#a72bc0ff",
    "#490569ff",
  ];

  const chartData = {
    labels: Object.keys(categoryTotal),
    datasets: [
      {
        data: Object.values(categoryTotal),
        backgroundColor: colorPalette.slice(
          0,
          Object.keys(categoryTotal).length
        ),
        borderColor: "#000000",
        borderWidth: 1,
        hoverOffset: 10,
        hoverBorderWidth: 2,
        color: "white",
      },
    ],
  };

  const handleEditClick = (id: number) => {
    setEditId(id);
    setIsOpenModal(true);
  };

  const handleAddClick = () => {
    setEditId(null);
    setIsOpenModal(true);
  };

  const editingTransaction = transactions.find((tx) => tx.id === editId);

  const handleFormSubmit = (data: TransactionInput) => {
    if (editId) {
      editTransaction(editId, data);
    } else {
      addTransaction(data);
    }
    setIsOpenModal(false);
  };

  const filteredTransactions = transactions.filter((tx) => {
    return (
      tx.description
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase()) ||
      tx.category.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
  });

  return (
    <main>
      <h1>Expense Tracker</h1>
      <h3>Total spent</h3>
      <p className="total">
        {total.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </p>
      <br />

      <button onClick={handleAddClick}>Add Expense</button>

      <TransactionForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTransaction}
      />

      <p className="recent-transactions" onClick={() => setIsRecent(!isRecent)}>
        Recent transactions
      </p>

      {isRecent && (
        <>
          <div>
            <input
              className="searchInput"
              type="text"
              name={searchTerm}
              placeholder="🔍 Search transactions....."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEditClick}
            onDelete={deleteTransaction}
          />
        </>
      )}
      <h4>Average Transaction</h4>
      <p className="total">
        {averageTransaction.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </p>
      <div className="chart-container">
        <Doughnut
          data={chartData}
          options={{ plugins: { legend: { labels: { color: "white" } } } }}
        />
      </div>
    </main>
  );
}

export default App;
