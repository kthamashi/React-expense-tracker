import React, { useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../../auth/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TransactionTable from "../TransactionTable.jsx";
import UserApi from "../../services/user.api.js";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTransactions = async () => {
    try {
      const res = await UserApi.getUserDetails(user._id);
      const transactions = res.data.data.transactions;

      return transactions.sort((a, b) =>
        a.created_at > b.created_at ? -1 : 1
      );
    } catch (error) {
      console.log("pushing error");
      throw Error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const transactionResponse = await getTransactions();
      setTransactions(transactionResponse);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const currentBalance = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === "income") {
        acc = acc + Number(curr.amount);
      } else {
        acc = acc - Number(curr.amount);
      }

      return acc;
    }, 0);
  }, [transactions]);

  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl mt-2 mx-auto">
        <div
          className={`card-body rounded-md text-white ${
            currentBalance >= 0 ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <h2 className="card-title mx-auto">Current Balance</h2>
          <p className="text-center text-3xl font-medium">
            {currentBalance.toLocaleString()} CAD
          </p>
        </div>
      </div>
      <div className="py-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold leading-tight">Transactions</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-transaction")}
          >
            Add Transaction
          </button>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <TransactionTable
              transactions={transactions}
              fetchTransactions={fetchTransactions}
              tableLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
