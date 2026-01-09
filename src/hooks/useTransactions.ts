import { useState, useEffect, useMemo } from "react";
import type { Transaction, TransactionInput } from "../types";

//custom hook to manage transactions
export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  }); //lazy initialization

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(transactions));
  }, [transactions]);

  const total = useMemo(() => {
    return transactions.reduce((acc, val) => acc + val.amount, 0);
  }, [transactions]);

  const categoryTotal = useMemo<{ [key: string]: number }>(() => {
    return transactions.reduce((sum, val) => {
      sum[val.category] = (sum[val.category] || 0) + val.amount;
      return sum;
    }, {} as { [key: string]: number });
  }, [transactions]);

  const addTransaction = (newTx: TransactionInput) => {
    const transaction: Transaction = {
      ...newTx,
      id: Date.now(),
    };
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id: number) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    }
  };

  const editTransaction = (id: number, updatedTx: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? { ...tx, ...updatedTx } : tx))
    );
  };

  const averageTransaction = useMemo(() => {
    if (transactions.length == 0) return 0;
    else return total / transactions.length;
  }, [transactions]);

  return {
    transactions,
    total,
    categoryTotal,
    addTransaction,
    deleteTransaction,
    editTransaction,
    averageTransaction,
  };
};