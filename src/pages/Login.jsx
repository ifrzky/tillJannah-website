import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Navbar";
import FlashMessage from "../components/FlashMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      setFlashMessage({ message: "Logged in successfully", type: "error" });
      navigate("/profile");
      // Redirect after 3 seconds
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );

      sessionStorage.setItem("accessToken", data.token);
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      setFlashMessage({ message: data.flash_message, type: "success" });
      setTimeout(() => {
        navigate("/profile");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      setError("Invalid email or password");
      setFlashMessage({ message: "Invalid email or password", type: "error" });
      // setFlashMessage({ message: error, type: "error" });
    }
  };

  return (
    <>
      <Nav />
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          clearMessage={() => setFlashMessage(null)}
        />
      )}
      <div className="flex items-center justify-center h-screen">
        <div className="__wrapper shadow-md px-5 py-5 rounded-md w-[400px]">
          <section>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                  Login
                </button>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-700 text-xl"
                >
                  Register
                </Link>
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
