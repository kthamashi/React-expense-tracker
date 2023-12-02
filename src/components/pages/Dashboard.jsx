import React, {useEffect, useState} from "react";
import {useAuthContext} from "../../auth/AuthProvider";
import {getExpenses} from "../../services/utilities/helper.js";
import toast from "react-hot-toast";
import API from "../../services/index.js";
import { useNavigate} from "react-router-dom";

export default function DashboardPage() {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getExpenses(user._id).then(res => setExpenses(res));
    }, [user]);

    const handleRemove = async (id) => {
        try {
            setIsLoading(true);
            const res = await API.common.removeDocument(id);
            if (res && res.status === 200) {
                getExpenses(user._id).then(res => setExpenses(res));
                toast.success("Expense was successfully removed");
            }
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    const getDetails = async (id) => {
        try {
            setIsLoading(true);
            const res = await API.common.getDocumentDetails(id);
            if (res && res.status === 200) {
                console.log(res.data.data, "details")
            }
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold leading-tight">Expenses</h2>
                        <button
                            className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none mr-4"
                            onClick={() => navigate('/expense/add')}
                        >Add Transaction
                        </button>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created at
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    expenses?.map((expense, index) => (
                                        <tr key={index}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {expense.name}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{expense.amount}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {new Date(expense.created_at * 1000).toLocaleString()}
                                                </p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    {expense.category}
                                                </p>
                                            </td>
                                            <td className="py-2 border-b border-gray-200 bg-white text-sm">
                                                <button
                                                    className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none mr-4"
                                                    onClick={() => getDetails(expense._id)}
                                                >View
                                                    Details
                                                </button>
                                                <button
                                                    className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                                                    onClick={() => handleRemove(expense._id)}
                                                >Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                }
                                {/*<tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                                <img className="w-full h-full rounded-full"
                                                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                     alt=""/>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-900 whitespace-no-wrap">
                                                    Vera Carpenter
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            Jan 21, 2020
                                        </p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">Activo</span>
                                    </span>
                                    </td>
                                </tr>*/}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={} Name="max-w-md mx-auto border rounded-md p-6 mt-10 shadow-md grid gap-2">
        <h2 className={} Name="text-center text-2xl font-medium text-gray-900">
          User Information
        </h2>
        <InfoBox label="First Name" value={user.firstName} />
        <InfoBox label="Last Name" value={user.lastName} />
        <InfoBox label="Age" value={user.age} />
        <InfoBox label="Email" value={user.email} />
        <InfoBox label="Address" value={user.address} />
        <InfoBox label="Telephone" value={user.telephone} />
        <InfoBox label="University" value={user.university} />
        <InfoBox label="Zip code" value={user.zipCode} />
      </div>*/}
        </>
    );
}
