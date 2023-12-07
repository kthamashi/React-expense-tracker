import React, { useState } from "react";
import toast from "react-hot-toast";
import UserApi from "../services/user.api.js";
import { useAuthContext } from "../auth/AuthProvider.jsx";

export default function TransactionTable({
  transactions,
  fetchTransactions,
  tableLoading,
}) {
  const { user } = useAuthContext();
  const [loadingIdx, setLoadingIdx] = useState(false);

  const handleRemove = async (idx) => {
    try {
      setLoadingIdx(idx);
      const currentTransactions = structuredClone(transactions);
      currentTransactions.splice(idx, 1);
      const payload = {
        transactions: currentTransactions,
      };
      await UserApi.addAndUpdateTransactions(payload, user._id);
      await fetchTransactions();
      toast.success("Transaction Deleted Successfully");
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setLoadingIdx(null);
    }
  };

  const rows = transactions.map((transaction, idx) => (
    <tr key={idx}>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {transaction.transaction_name}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{transaction.amount}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {new Date(transaction.created_at * 1000).toLocaleString()}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`whitespace-no-wrap capitalize inline-block text-white px-2 py-0.5 rounded-md
                   ${
                     transaction.type === "income"
                       ? "bg-green-500"
                       : "bg-red-500"
                   }`}
        >
          {transaction.type}
        </p>
      </td>
      <td className="py-2 border-b border-gray-200 bg-white text-sm">
        <button
          className="px-5 py-1 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
          onClick={() => handleRemove(idx)}
        >
          {loadingIdx === idx ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Delete"
          )}
        </button>
      </td>
    </tr>
  ));
  return (
    <table className="min-w-full leading-normal">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Created at
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Category
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
        </tr>
      </thead>
      <tbody>
        {rows.length ? (
          rows
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              {loadingIdx || tableLoading ? "Loading..." : "No Records yet"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
