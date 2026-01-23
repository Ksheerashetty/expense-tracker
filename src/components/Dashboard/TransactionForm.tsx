import { useState, useEffect } from "react";
import type { TransactionInput } from "../../types";

export const categoryOptions = [
  { name: "Food", icon: "🍕", color: "#FF6B6B" },
  { name: "Home", icon: "🏠", color: "#4ECDC4" },
  { name: "Savings", icon: "🪙", color: "#FFE66D" },
  { name: "Education Loan", icon: "📚", color: "#9B5DE5" },
  { name: "Transportation", icon: "🚌", color: "#00BBF9" },
  { name: "Shopping", icon: "🛍️", color: "#F15BB5" },
  { name: "Other", icon: "📌", color: "#A4A4A4" },
]
type Props = {
  onSubmit: (data: TransactionInput) => void;
  onClose: () => void;
  isOpen: boolean;
  initialData?: TransactionInput | null;
};

const defaultState: TransactionInput = {
  date: "",
  category: "",
  amount: 0,
  description: "Description",
};

export const TransactionForm = ({
  onSubmit,
  onClose,
  initialData,
  isOpen,
}: Props) => {
  const [formData, setFormData] = useState<TransactionInput>(
    initialData || defaultState
  );

  useEffect(() => {
    if (isOpen && initialData) {
      setFormData(initialData);
    } else {
      setFormData(defaultState);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <input
            className="form-field"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <br />
          <select
            className="form-field" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
            <option value="" disabled>Category</option>
            {categoryOptions.map((item) => (
              <option key={item.name} value={item.name}>
                {item.icon} {item.name}
              </option>
            ))}
          </select>
          <br />
          <input
            className="form-field"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
          <br />
          <input
            className="form-field"
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <div className="button-group">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
