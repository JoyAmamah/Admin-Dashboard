import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePersistedState } from "../Hooks/usePersistedState";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [savedEmail] = usePersistedState("email", "");
  const [savedPassword] = usePersistedState("password", "");
  const [isSignedUp] = usePersistedState("isSignedUp", false);
  const [savedFirstname] = usePersistedState("firstname", "");
  const [, setStoredFirstname] = usePersistedState("firstname", "");
  const [isSignedIn, setIsSignedIn] = usePersistedState("isSignedIn", false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/admin-dashboard");
    }
  }, [isSignedIn, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedUp) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (email === savedEmail && password === savedPassword) {
      setIsSignedIn(true);
      // optional: setStoredFirstname(savedFirstname); // not needed unless changing it
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Login Page</h1>

        <label className="block mb-2">Email:</label>
        <input
          type="email"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password:</label>
        <input
          type="password"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 p-2 rounded hover:bg-green-600 transition"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
