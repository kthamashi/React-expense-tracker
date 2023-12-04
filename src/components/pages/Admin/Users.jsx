import UserTable from "./components/UserTable";
import React, { useEffect, useState } from "react";
import API from "../../../services";
import toast from "react-hot-toast";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const usersResponse = await API.user.getAllUsers();
      setUsers(usersResponse.data.data.filter((user) => user.role === "user"));
    } catch (e) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-8">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold leading-tight">Users</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-transaction")}
        >
          Add User
        </button>
      </div>
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <UserTable tableLoading={isLoading} users={users} />
        </div>
      </div>
    </div>
  );
}