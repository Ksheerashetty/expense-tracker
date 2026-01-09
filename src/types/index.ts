export type Category =
  | "Food"
  | "Bill"
  | "Entertainment"
  | "Shopping"
  | "Others";
export type Transaction = {
  id: number;
  date: string;
  category: Category | string;
  amount: number;
  description: string;
};

export type TransactionInput = Omit<Transaction, "id">