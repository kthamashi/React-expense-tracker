import { Link } from "react-router-dom";
import LoadingButton from "../ui/LoadingButton";
import { useState } from "react";
import Label from "../ui/Label";
import { loginUser } from "../../auth";
import toast from "react-hot-toast";
import { useAuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setAuthDetails } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await loginUser(loginDetails);
      if (user) {
        setAuthDetails(user);
        toast.success("Logged In!");
        navigate("/");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-xl py-6 px-10 rounded-md">
        <div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label name="Email address" />
              <div className="mt-1">
                <input
                  name="email"
                  value={loginDetails.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div>
              <Label name="Password" />
              <div className="mt-1">
                <input
                  name="password"
                  value={loginDetails.password}
                  onChange={handleChange}
                  type="password"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div>
              <LoadingButton isLoading={isLoading}>Login</LoadingButton>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/register"
              className="ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
