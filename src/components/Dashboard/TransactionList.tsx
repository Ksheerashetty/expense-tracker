import type { Transaction } from "../../types";
import deleteIcon from "../../delete.png"
import editIcon from "../../edit.png";

type Props = {
  transactions: Transaction[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TransactionList = ({ transactions, onEdit, onDelete }: Props) => {
  if (transactions.length === 0) return <p>No transactions yet.</p>;

  return (
    <ul>
      {transactions.map((ts) => (
        <li key={ts.id} className="transaction-item">
          <span className="transaction-details">
            {ts.date} - {ts.category} - {ts.description} -{" "}
            {ts.amount.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </span>
          <div className="edit-delete">
            <button onClick={() => onEdit(ts.id)}>
              <img src={editIcon} alt="Edit" />
            </button>
            <button onClick={() => onDelete(ts.id)}>
              <img src={deleteIcon} alt="Delete" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
