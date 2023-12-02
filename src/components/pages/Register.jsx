import React, {useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import Label from "../ui/Label";
import {EnumType} from "../../services/utilities/enum.js";
import API from "../../services/index.js";

export default function RegisterPage() {
    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        email: "",
        address: "",
        password: "",
        confirm_password: "",
        type: EnumType.USER,
    })

    const handleChange = (evt) => {
        const {value, name} = evt.target;

        setUser({
            ...user,
            [name]: value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirm_password)
            return toast.error("Passwords does not match!");
        setIsLoading(true);
        try {
            const res = await API.user.register(user);
            if (res && res.status === 200) {
                toast.success("Registration Successful!");
                navigate("/login");
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
                        Register
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 grid-cols-2">
                        <div className="form-control w-full">
                            <Label name="First Name"/>
                            <input
                                value={user.first_name}
                                name="first_name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Last Name"/>
                            <input
                                value={user.last_name}
                                name="last_name"
                                onChange={handleChange}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Email"/>
                            <input
                                value={user.email}
                                name="email"
                                onChange={handleChange}
                                type="email"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Address"/>
                            <input
                                value={user.address}
                                name="address"
                                onChange={handleChange}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <Label name="Password"/>
                            <input
                                value={user.password}
                                name="password"
                                onChange={handleChange}
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className="form-control w-full">
                            <Label name="Confirm Password"/>
                            <input
                                value={user.confirm_password}
                                name="confirm_password"
                                onChange={handleChange}
                                type="password"
                                placeholder="Type here"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                    </div>
                    <LoadingButton isLoading={isLoading}>Register</LoadingButton>
                </form>
            </div>
        </div>
    );
}
