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
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2023-10-01",
      category: "Food",
      amount: 500,
      description: "Groceries",
    },
    {
      id: 2,
      date: "2023-10-02",
      category: "Transport",
      amount: 150,
      description: "Bus fare",
    },
    {
      id: 3,
      date: "2023-10-03",
      category: "Entertainment",
      amount: 300,
      description: "Movie tickets",
    },
  ]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRecent, setIsRecent] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: 0,
    description: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const categories = transactions.reduce<{ [key: string]: number }>(
    (cat, tx) => {
      cat[tx.category] = (cat[tx.category] || 0) + tx.amount;
      return cat;
    },
    {}
  );

  const colorPalette = [
    "#590f9a97",
    "#98098cff",
    "#9106919e",
    "#690ff0ff",
    "#33ff57",
    "#74089bff",
    "#f4d03f",
    "#16a085",
    "#8e44ad",
    "#e67e22",
    "#2ecc71",
    "#1abc9c",
    "#d35400",
    "#c0392b",
    "#2c3e50",
  ];

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: colorPalette.slice(0, Object.keys(categories).length),
        borderColor: "#000000",
        borderWidth: 1,
        hoverOffset: 10,
        hoverBorderWidth: 2,
        color: "white",
      },
    ],
  };

  const transactionList = transactions.map((ts) => (
    <li key={ts.id} className="transaction-item">
      <span className="transaction-details">
        {ts.date} - {ts.category} - {ts.description} -{" "}
        {ts.amount.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
      <div className="edit-delete">
        <button onClick={() => handleEdit(ts.id)}>
          <img src="/src/edit.png" alt="Edit" />
        </button>
        <button onClick={() => handleDelete(ts.id)}>
          <img src="/src/delete.png" alt="Delete" />
        </button>
      </div>
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

  function handleEdit(id: number) {
    console.log("edit", id);
    const editTransaction = transactions.find((tx) => tx.id === id);
    if (editTransaction) {
      setFormData({
        date: editTransaction.date,
        category: editTransaction.category,
        description: editTransaction.description,
        amount: editTransaction.amount,
      });
      setIsOpenModal(true);
      setEditId(id);
    }
  }

  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (editId !== null) {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === editId ? { ...tx, ...formData } : tx))
      );
    } else {
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
        description: (
          form.elements.namedItem("description") as HTMLInputElement
        ).value,
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
    }
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
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                max={new Date().toISOString().split("T")[0]}
                required
              ></input>
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              ></input>
              <input
                type="number"
                placeholder="Amount"
                name="amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
                required
              ></input>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
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

      <p
        className="recent-transactions"
        onClick={() => setIsRecent((prev) => !prev)}
      >
        Recent transactions
      </p>
      {isRecent && (
        <p>
          {transactions.length === 0 ? (
            "No transactions yet"
          ) : (
            <ul>{transactionList}</ul>
          )}
        </p>
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
