import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

import "./App.css";
import { color } from "chart.js/helpers";

function App() {
  const transactions = [
    {
      id: 1,
      date: "2025-07-01",
      category: "Food",
      amount: 20.0,
      description: "Groceries",
    },
    {
      id: 2,
      date: "2025-07-02",
      category: "Transport",
      amount: 15.0,
      description: "Bus Ticket",
    },
    {
      id: 3,
      date: "2025-07-03",
      category: "Utilities",
      amount: 100.0,
      description: "Electricity Bill",
    },
    {
      id: 4,
      date: "2025-07-04",
      category: "Utilities",
      amount: 50.0,
      description: "Water Bill",
    },
  ];

  const total = transactions.reduce(
    (sum, transactions) => sum + transactions.amount,
    0
  );

  const categories: { [key: string]: number } = {};
  transactions.forEach((tx) => {
    categories[tx.category] = (categories[tx.category] || 0) + tx.amount;
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ["#590f9a97", "#98098cff", "#9106919e"],
        borderColor: "#000000",
        borderWidth: 1,
        hoverOffset: 10,
        color: "white",
      },
    ],
  };
  return (
    <main>
      <h1>Expense Tracker</h1>
      <h3>Total spent</h3>
      <p className="total">₹{total.toFixed(2)}</p>
      <input type="text" placeholder="Add new expense" />
      <br />
      <button>Add Expense</button>
      <p>Recent transactions</p>
      <ul>
        {transactions.map((ts) => (
          <li key={ts.id}>
            {ts.date} - {ts.category} - ₹{ts.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      <Doughnut data={data} options={{ plugins: { legend: { labels: { color: "white" } } } }} />
    </main>
  );
}

export default App;
