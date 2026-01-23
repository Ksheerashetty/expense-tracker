import type { Transaction } from "../../types";
import deleteIcon from "../../delete.png"
import editIcon from "../../edit.png";
import { categoryOptions } from "./TransactionForm";
type Props = {
  transactions: Transaction[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TransactionList = ({ transactions, onEdit, onDelete }: Props) => {
  if (transactions.length === 0) return <p>No transactions yet.</p>;

  return (
    <table className="transactions-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((ts) => (
          <tr key={ts.id}>
            <td > {ts.date}</td>
            <td>
              <span className="category-icon">
                {categoryOptions.find(c => c.name === ts.category)?.icon}
              </span>
              {ts.category}
            </td>
            <td> {ts.description}</td>
            <td>  {ts.amount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}</td>
            <td className="action-btn">
              <div className="edit-delete">
                <button onClick={() => onEdit(ts.id)}>
                  <img src={editIcon} alt="Edit" />
                </button>
                <button onClick={() => onDelete(ts.id)}>
                  <img src={deleteIcon} alt="Delete" />
                </button>
              </div>
            </td>
          </tr>
        ))
        }
      </tbody>
    </table >
  );
};
