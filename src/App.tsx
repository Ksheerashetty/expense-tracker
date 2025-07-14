import "./App.css";

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
  ];

  const total = transactions.reduce((sum, transactions) => sum + transactions.amount, 0);
  return (
    <main>
      <h1>Expense Tracker</h1>
      <h3>Total spent</h3>
      <input type="text" placeholder="Total spent" value={total} readOnly />
      <br />
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
    </main>
  );
}

export default App;
