import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FlashMessage from "../components/FlashMessage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one symbol."
      );
      setFlashMessage({
        message:
          "Password must be at least 8 characters long, contain at least one uppercase letter and one symbol.",
        type: "error",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
          gender,
          dateOfBirth,
        }
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
              <label htmlFor="gender" className="block text-xl mb-2">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="w-full px-3 py-2 border rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="block text-xl mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="w-full px-3 py-2 border rounded-md"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
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
            <div className="mb-4 relative">
              <label htmlFor="password" className="block text-xl mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
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
