import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FlashMessage from "../components/FlashMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password }
      );
      setFlashMessage({
        message: "Registration successful. Please log in.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setError("User already exists");
      setFlashMessage({ message: "User already exists", type: "error" });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          clearMessage={() => setFlashMessage(null)}
        />
      )}
      <div className="__wrapper shadow-md px-5 py-5 rounded-md w-[400px]">
        <section>
          <h1 className="text-3xl font-bold mb-4">Register</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-xl mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xl mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-xl mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
              >
                Register
              </button>
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 text-xl"
              >
                Login
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
