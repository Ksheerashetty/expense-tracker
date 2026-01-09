import { useState, useEffect } from "react";
import type { TransactionInput } from "../../types";

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
  description: "",
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
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <br/>
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
          <br/>
          <input
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
          <br/>
          <input
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
