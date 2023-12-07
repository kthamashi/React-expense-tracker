import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingButton from "../../ui/LoadingButton";
import Label from "../../ui/Label";
import UserApi from "../../../services/user.api";

export default function AddUserPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (!searchParams.get("id")) return;

    async function fetchUserData() {
      try {
        setInitialLoading(true);
        const res = await UserApi.getUserDetails(searchParams.get("id"));
        setUser(res.data.data);
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setInitialLoading(false);
      }
    }

    fetchUserData();
  }, [searchParams]);

  const handleChange = (evt) => {
    const { value, name } = evt.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirm_password)
      return toast.error("Passwords does not match!");
    setIsLoading(true);
    try {
      const res = await UserApi.register(user);
      if (res && res.status === 200) {
        toast.success("User was successfully added");
        navigate("/admin/users");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await UserApi.addAndUpdateTransactions(user, searchParams.get("id"));
      toast.success("User was successfully updated");
      navigate("/admin/users");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-3xl shadow-xl py-6 px-10 rounded-md">
      <div>
        <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
          {searchParams.get("id") ? "Update User" : "Add User"}
        </h2>
      </div>
      {initialLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : (
        <form
          onSubmit={!searchParams.get("id") ? handleSubmit : updateUserDetails}
        >
          <div className="grid gap-4 grid-cols-2">
            <div className="form-control w-full">
              <Label name="First Name" />
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
              <Label name="Last Name" />
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
              <Label name="Email" />
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
              <Label name="Address" />
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

            {!searchParams.get("id") && (
              <>
                <div className="form-control w-full">
                  <Label name="Password" />
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
                  <Label name="Confirm Password" />
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
              </>
            )}
          </div>
          <LoadingButton isLoading={isLoading}>Submit</LoadingButton>
        </form>
      )}
    </div>
  );
}
