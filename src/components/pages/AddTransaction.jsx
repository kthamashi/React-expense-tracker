import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton.jsx";
import Label from "../ui/Label.jsx";
import { useAuthContext } from "../../auth/AuthProvider.jsx";
import { getTransactions } from "../../services/utilities/helper.js";
import API from "../../services/index.js";

const CATEGORIES = [
  {
    name: "Income",
    value: "income",
  },
  {
    name: "Expense",
    value: "expense",
  },
];

export default function AddTransactionPage() {
  const { user } = useAuthContext();

  useEffect(() => {
    getTransactions(user._id).then(setTransactions);
  }, [user]);

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    transaction_name: "",
    amount: "",
    category: "income",
    created_at: Math.floor(Date.now() / 1000),
  });

  const handleChange = (evt) => {
    const { value, name } = evt.target;

    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      transactions: [...transactions, transaction],
    };

    try {
      const res = await API.user.addAndUpdateTransactions(payload, user._id);
      toast.success("Transaction was successfully added.");
      navigate("/");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
      <div className="sm:mx-auto sm:w-full sm:max-w-3xl shadow-xl py-6 px-10 rounded-md">
        <div>
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
            Add Transaction
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 grid-cols-2">
            <div className="form-control w-full col-span-2">
              <Label name="Name" />
              <input
                value={transaction.transaction_name}
                name="transaction_name"
                onChange={handleChange}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full">
              <Label name="Amount" />
              <input
                value={transaction.amount}
                name="amount"
                onChange={handleChange}
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control w-full">
              <Label name="Category" />
              <select
                value={transaction.category}
                name="category"
                onChange={handleChange}
                className="select select-bordered w-full max-w-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
        </form>
      </div>
  );
}
