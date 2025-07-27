import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePersistedState } from "../Hooks/usePersistedState";

const SignUpPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [, setStoredFirstname] = usePersistedState("firstname", "");
  const [, setStoredLastname] = usePersistedState("lastname", "");
  const [, setStoredEmail] = usePersistedState("email", "");
  const [, setStoredPassword] = usePersistedState("password", "");
  const [, setIsSignedUp] = usePersistedState("isSignedUp", false);
  const [, setIsSignedIn] = usePersistedState("isSignedIn", false);

  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    setStoredFirstname(firstname);
    setStoredLastname(lastname);
    setStoredEmail(email);
    setStoredPassword(password);
    setIsSignedUp(true);
    setIsSignedIn(true);

    alert("Signup successful!");
    navigate("/admin-dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>

        <label className="block mb-2">First Name:</label>
        <input
          type="text"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <label className="block mb-2">Last Name:</label>
        <input
          type="text"
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

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
          Sign Up
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
