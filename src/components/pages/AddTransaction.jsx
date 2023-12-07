/**
 * This component is responsible for adding a new transaction
 * Since we update the user itself, we have to make sure that we have the previous transactions
 *
 * For an example
 * const currentUserTransactions = [trans1Obj, trans1Obj]
 * We have to make sure to add the new transaction to this currentUserTransactions array and then update use with that array
 * So it is something like
 * API.user.addAndUpdateTransactions[...currentUserTransactions, newTransaction] [refer to handleSubmit method]
 */

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton.jsx";
import Label from "../ui/Label.jsx";
import { useAuthContext } from "../../auth/AuthProvider.jsx";
import UserApi from "../../services/user.api.js";

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
  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState({
    transaction_name: "",
    amount: "",
    type: "income",
    created_at: Math.floor(Date.now() / 1000),
  });

  const getTransactions = async () => {
    try {
      const res = await UserApi.getUserDetails(user._id);

      return res.data.data.transactions;
    } catch (error) {
      throw Error("Something went wrong");
    }
  };

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, [user]);

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
      await UserApi.addAndUpdateTransactions(payload, user._id);
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
            <Label name="Type" />
            <select
              value={transaction.type}
              name="type"
              onChange={handleChange}
              className="select select-bordered w-full max-w-xs"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
      </form>
    </div>
  );
}
