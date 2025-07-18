import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import "./App.css";
import { useState } from "react";

type Transaction = {
  id: number;
  date: string;
  category: string;
  amount: number;
  description: string;
};
function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const transactions = [
  //   {
  //     id: 1,
  //     date: "2025-07-01",
  //     category: "Food",
  //     amount: 20.0,
  //     description: "Groceries",
  //   },
  //   {
  //     id: 2,
  //     date: "2025-07-02",
  //     category: "Transport",
  //     amount: 15.0,
  //     description: "Bus Ticket",
  //   },
  //   {
  //     id: 3,
  //     date: "2025-07-03",
  //     category: "Utilities",
  //     amount: 100.0,
  //     description: "Electricity Bill",
  //   },
  //   {
  //     id: 4,
  //     date: "2025-07-04",
  //     category: "Utilities",
  //     amount: 50.0,
  //     description: "Water Bill",
  //   },
  // ];
  //const transactions = [200, 150, 300];

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
        hoverBorderWidth: 2,
        color: "white",
      },
    ],
  };

  const transactionList = transactions.map((ts) => (
    <li key={ts.id}>
      {ts.date} - {ts.category} - ₹{ts.amount.toFixed(2)}
    </li>
  ));

  // function handleClick(event: {
  //   preventDefault: any;
  //   currentTarget: HTMLFormElement | undefined;
  // }) {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const newExpense = formData.get("expense");
  //   const parsed = newExpense ? parseFloat(newExpense as string) : 0;
  //   const newTransaction: Transaction = {
  //   id: Date.now(), // generates a unique ID
  //   date: new Date().toISOString().split("T")[0], // today's date
  //   category: "Misc", // default category
  //   amount: parsed,
  //   description: "Added manually", // default description
  // };

  // setTransactions((prev) => [...prev, newTransaction]);
  //   // setTransactions([...transactions, parsed]);
  // }

  return (
    <main>
      <h1>Expense Tracker</h1>
      <h3>Total spent</h3>
      <form>
        <p className="total">₹{total.toFixed(2)}</p>
        {/* <input type="text" placeholder="Add new expense" /> */}
        <br />
        <button
          onClick={(e) => {
            setIsOpenModal(true);
            e.preventDefault();
          }}
        >
          Add Expense
        </button>
      </form>
      {isOpenModal && (
        <div className="overlay">
          <div className="modal">
            <input type="text" placeholder="Date (YYYY-MM-DD)"></input>
            <input type="text" placeholder="Category"></input>
            <input type="number" placeholder="Amount"></input>
            <input type="text" placeholder="Description"></input>

            <div className="button-group">
              <button>Submit</button>
              <button onClick={() => setIsOpenModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <p>Recent transactions</p>
      <ul>{transactionList}</ul>
      <Doughnut
        className="chart"
        data={data}
        options={{ plugins: { legend: { labels: { color: "white" } } } }}
      />
    </main>
  );
}

export default App;
