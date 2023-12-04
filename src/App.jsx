import * as React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import DashboardPage from "./components/pages/Dashboard";
import LoginPage from "./components/pages/Login";
import RegisterPage from "./components/pages/Register";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./auth/AuthProvider";
import AddTransactionPage from "./components/pages/AddTransaction";
import Users from "./components/pages/Admin/Users";
import AddUserPage from "./components/pages/Admin/AddUser.jsx";

export default function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <RequireAuth>
                <AddTransactionPage />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/users"
            element={
              <RequireAuth>
                <Users />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/users/add"
            element={
              <RequireAuth>
                <AddUserPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

function Layout() {
  const { logout, user } = useAuthContext();
  return (
    <div>
      <ul className="flex px-5 py-3 shadow-lg gap-10 justify-end">
        {user ? (
          <>
            <li className="font-medium">
              {user.first_name} {user.last_name}
            </li>
            <li>
              <button
                className="btn btn-xs btn-error rounded-sm"
                onClick={logout}
              >
                Sign out
              </button>
            </li>
          </>
        ) : null}
      </ul>
      <div className="container mx-auto px-4 sm:px-8">
        <Outlet />
      </div>
    </div>
  );
}
