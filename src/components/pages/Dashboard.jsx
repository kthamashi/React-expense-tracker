import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../auth/AuthProvider";
import { getTransactions } from "../../services/utilities/helper.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Table from "../Table.jsx";

export default function DashboardPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const transactionResponse = await getTransactions(user._id);
      setTransactions(transactionResponse);
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">
              Transactions
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/add-transaction")}
            >
              Add Transaction
            </button>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <Table
                transactions={transactions}
                fetchTransactions={fetchTransactions}
                tableLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
