import { Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend } from "chart.js";
import "./App.css";
import { useState } from "react";
import { useTransactions } from "./hooks/useTransactions";
import type { TransactionInput } from "./types";
import { TransactionList } from "./components/Dashboard/TransactionList";
import { TransactionForm } from "./components/Dashboard/TransactionForm";
import CashIcon from "./cash.png"
import AverageIcon from './average.png'
import titleWallet from './title.png'
import TransactionsIcon from './transactions.png'
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);
//import { CategoryInsights } from "./components/Dashboard/CategoryInsights";
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
  const [editId, setEditId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  // const colorPalette = [
  //   "#590f9a97",
  //   "#98098cff",
  //   "#9106919e",
  //   "#690ff0ff",
  //   "#0f5ac2ff",
  //   "#74089bff",
  //   "#3ff4f1ff",
  //   "#16a085",
  //   "#8e44ad",
  //   "#22e6abff",
  //   "#2e4eccff",
  //   "#1abc9c",
  //   "#1500d3ff",
  //   "#a72bc0ff",
  //   "#490569ff",
  // ];

  const colors = [
    "rgb(245, 63, 103)",
    "rgb(255, 159, 64)",
    "rgb(255, 205, 86)",
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)"
  ];


  const chartData = {
    labels: Object.keys(categoryTotal),
    datasets: [
      {
        data: Object.values(categoryTotal),
        backgroundColor: colors.slice(
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
  const barLabels = Object.keys(categoryTotal); // ["Food", "Home", ...]
  const barValues = Object.values(categoryTotal);
  const barData = {
    labels: barLabels,
    datasets: [
      {
        axis: "y",
        label: "Spending by Category",
        data: barValues,
        fill: false,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 206, 207)",
        ],
        borderWidth: 1,
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
      <div className="title"><img className="cash" src={titleWallet} alt="" />
        <h1 className="app-title"> Expense Tracker</h1>
      </div>

      <div className="trans-total">
        <div className="total-card">
          <div> <h3>Total spent</h3>
            <p>
              {total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p></div>
          <div>
            <img className="cash" src={CashIcon} alt="cash" />
          </div>
        </div>
        <div className="total-card">
          <div> <h3>Avg Transaction</h3>
            <p>
              {averageTransaction.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </p></div>
          <div>
            <img className="cash" src={AverageIcon} alt="cash" />
          </div>
        </div>
        <div className="total-card">
          <div>
            <h3>No. of Transactions</h3>
            <p>
              {transactions.length}
            </p>
          </div>
          <div>
            <img className="cash" src={TransactionsIcon} alt="cash" />
          </div>
        </div>
      </div>

      <TransactionForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTransaction}
      />

      <div className="chart-container">
        <div className="chart-card">
          <h3>Doughnut Chart</h3>
          <div className="chart-wrapper"><Doughnut
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: { color: "white" }
                }
              }
            }}
          /></div>

        </div>
        <div className="chart-card"> <h3>Bar Graph</h3>
          <div className="chart-wrapper">
            <Bar data={barData}
              options={
                {
                  indexAxis: "y",
                  responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: "white",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                    y: {
                      ticks: {
                        color: "white",
                      },
                      grid: {
                        color: "rgba(255,255,255,0.1)",
                      },
                    },
                  },
                }
              }
            />

          </div>
        </div>
      </div>
      <div className="recent-transaction">
        <div className="recent">
          <p className="recent-transactions">
            Recent transactions
          </p>
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
      </div>
      <button className="add-expense-btn" onClick={handleAddClick}>Add Expense</button>

    </main>
  );
}

export default App;
