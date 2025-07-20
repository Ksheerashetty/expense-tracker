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
  const [error, setError] = useState<string | null>(null);

  const categories = transactions.reduce<{ [key: string]: number }>(
    (cat, tx) => {
      cat[tx.category] = (cat[tx.category] || 0) + tx.amount;
      return cat;
    },
    {}
  );
  

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
      {ts.date} - {ts.category} - {ts.description} -{" "}
      {ts.amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </li>
  ));

  const total = transactions
    .reduce((sum, transactions) => sum + transactions.amount, 0)
    .toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    //const date = (form.elements.namedItem("date") as HTMLInputElement).value;
    const newExpense: Transaction = {
      id: Date.now(),
      date: new Date(
        (form.elements.namedItem("date") as HTMLInputElement).value
      ).toLocaleDateString(),
      category:
        (form.elements.namedItem("category") as HTMLInputElement).value
          .charAt(0)
          .toUpperCase() +
        (form.elements.namedItem("category") as HTMLInputElement).value
          .slice(1)
          .toLocaleLowerCase(),
      amount: parseFloat(
        (form.elements.namedItem("amount") as HTMLInputElement).value
      ),
      description: (form.elements.namedItem("description") as HTMLInputElement)
        .value,
    };
    // const formattedDate = new Date(date).toLocaleDateString();
    if (
      newExpense.amount <= 0 ||
      isNaN(newExpense.amount) ||
      !newExpense.description ||
      !newExpense.category ||
      !newExpense.date
    ) {
      setError("Please enter valid details");
      return;
    }
    setError(null);

    setTransactions((prev) => [...prev, newExpense]);
    setIsOpenModal((prev) => !prev);
  }

  return (
    <main>
      <h1>Expense Tracker</h1>
      <h3>Total spent</h3>
      <p className="total">{total}</p>
      <br />
      <button
        onClick={(e) => {
          setIsOpenModal(true);
          e.preventDefault();
        }}
      >
        Add Expense
      </button>

      {isOpenModal && (
        <form onSubmit={handleSubmit}>
          <div className="overlay">
            <div className="modal">
              {error && (
                <div className="alert-info" role="alert">
                  {error}
                </div>
              )}
              <input
                type="date"
                placeholder="Date (MM-DD-YYYY)"
                name="date"
                required
              ></input>
              <input
                type="text"
                placeholder="Category"
                name="category"
                required
              ></input>
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                required
              ></input>
              <input
                type="text"
                placeholder="Description"
                name="description"
                required
              ></input>
              <div className="button-group">
                <button type="submit">Submit</button>

                <button type="button" onClick={() => setIsOpenModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      <p className="recent-transactions">Recent transactions</p>
      {transactions.length === 0 ? (
        "No transactions yet"
      ) : (
        <ul>{transactionList}</ul>
      )}

      <Doughnut
        className="chart"
        data={data}
        options={{ plugins: { legend: { labels: { color: "white" } } } }}
      />
    </main>
  );
}

export default App;
