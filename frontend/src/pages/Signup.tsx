import { SignupSchema } from "@aryankohli/moneymate-common";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export function Signup() {
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postInputs: SignupSchema = {
    name,
    email,
    password,
  };
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-4 font-poppins text-blue-600">
          Money Mate
        </h1>
        <h2 className="text-3xl font-bold text-center mb-6 font-poppins text-gray-800">
          Sign Up
        </h2>
        
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);

            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/signup`,
                postInputs
              );
              localStorage.setItem("token", `Bearer ${response.data.token}`);
              navigate("/home");
            } catch (error) {
              if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ msg: string }>;
                setWarning(
                  axiosError.response?.data?.msg ||
                    "An error occurred. Please try again."
                );
              } else {
                setWarning("An unexpected error occurred. Please try again.");
              }
            } finally {
              setLoading(false);
            }
          }}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
              
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              autoComplete="on"
              minLength={6}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-full hover:bg-blue-700 transition duration-300">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <button
            className="text-green-500 font-bold ml-1 hover:underline"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
