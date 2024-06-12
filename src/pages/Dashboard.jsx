import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";
import axios from "axios";
import CreatePost from "./CreatePost";
import Button from "../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [userArticles, setUserArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }

    const fetchUserArticles = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:5000/api/users/userArticles",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setUserArticles(response.data);
      } catch (error) {
        setError("Failed to fetch user articles");
      }
    };

    fetchUserArticles();
  }, [navigate, userInfo]);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <>
      <Nav />
      <div className="flex flex-row m-5 gap-3">
        <div className="w-1/5 shadow-md rounded-md p-5">
          <div className="flex flex-col items-center justify-center">
            <img
              src={userInfo.pic}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="text-center">
              <p className="mb-2 text-2xl font-bold">{userInfo.name}</p>
              <p className="mb-2">{userInfo.email}</p>
            </div>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-4/5 h-full rounded-md shadow-md p-5 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Welcome, {userInfo.name}!</h1>
          <h2 className="text-xl mb-2">Your Articles</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {userArticles.map((article) => (
                <div
                  key={article.id}
                  className="border p-4 rounded-md shadow-md"
                >
                  <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                  <Button to={`/article/${article.id}`}>Read More</Button>
                </div>
              ))}
            </div>
          )}
          <Link
            to="/create-article"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mt-8"
          >
            Create Article
          </Link>
        </div>
        <div className="flex flex-col">
          <CreatePost />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
