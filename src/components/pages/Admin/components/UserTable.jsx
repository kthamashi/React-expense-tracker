import React, {useEffect, useState} from "react";
import API from "../../../../services";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function UserTable({users, tableLoading, fetchUsers}) {
    const navigate = useNavigate();
    const [loadingIdx, setLoadingIdx] = useState(false);

    const handleRemove = async (userId, idx) => {
        try {
            setLoadingIdx(idx);
            await API.user.removeUser(userId);
            await fetchUsers();
            toast.success("User was successfully removed");
        } catch (e) {
            toast.error("Something went wrong");
        } finally {
            setLoadingIdx(null);
        }
    };

    const rows = users.map((user, idx) => (
        <tr key={user._id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.first_name} {user.last_name}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.email}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.address}
            </td>
            <td className="py-2 border-b border-gray-200 bg-white text-sm">
                <button
                    className="btn btn-xs btn-info text-white rounded-nd mr-2"
                    onClick={() => navigate(`/admin/users/add?id=${user._id}`)}
                >
                    View Details
                </button>
                <button
                    className="btn btn-xs btn-error text-white rounded-nd mr-2"
                    onClick={() => handleRemove(user._id, idx)}
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
                    Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
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
