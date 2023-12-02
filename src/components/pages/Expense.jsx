import React, {useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import Label from "../ui/Label";
import {EnumType} from "../../services/utilities/enum.js";
import API from "../../services/index.js";
import {useAuthContext} from "../../auth/AuthProvider.jsx";

export default function AddExpensePage() {
    let navigate = useNavigate();
    const {user} = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        category: "",
        user_id: user._id,
        type: EnumType.EXPENSE,
        created_at: Math.floor(Date.now() / 1000)
    })

    const handleChange = (evt) => {
        const {value, name} = evt.target;

        setExpense({
            ...expense,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.transaction.addTransaction(expense);
            if (res && res.status === 200) {
                toast.success("Expense was successfully added.");
                navigate("/");
            }

        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-3xl shadow-xl py-6 px-10 rounded-md">
                <div>
                    <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
                        Add Expense
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="form-control w-full col-span-2">
                            <Label name="Name"/>
                            <input
                                value={expense.name}
                                name="name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Amount"/>
                            <input
                                value={expense.amount}
                                name="amount"
                                onChange={handleChange}
                                type="number"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Category"/>
                            <input
                                value={expense.category}
                                name="category"
                                onChange={handleChange}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                    <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
                </form>
            </div>
        </div>
    );
}
