import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [userArticles, setUserArticles] = useState([]);
  const [error, setError] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

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

  const handleSelectArticle = (id) => {
    setSelectedArticles((prev) =>
      prev.includes(id)
        ? prev.filter((articleId) => articleId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedArticles.length === userArticles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(userArticles.map((article) => article.id));
    }
  };

  const handleDelete = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      await axios.delete("http://localhost:5000/api/article/delete", {
        data: { ids: selectedArticles },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserArticles((prev) =>
        prev.filter((article) => !selectedArticles.includes(article.id))
      );
      setSelectedArticles([]);
      setIsDeleteMode(false);
      setShowConfirmPopup(false);
    } catch (error) {
      console.error("Failed to delete articles:", error);
      setError("Failed to delete articles. Please try again.");
    }
  };

  return (
    <>
      <Nav />
      <div className="flex flex-row m-5 gap-3">
        <div className="w-1/5 shadow-md rounded-md p-5 sticky top-0">
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
                  className="border p-4 rounded-md shadow-md flex flex-col justify-between relative"
                >
                  <div>
                    <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                    <p className="overflow-hidden overflow-ellipsis whitespace-nowrap mb-10">
                      {article.content}
                    </p>
                    <Button to={`/article/${article.id}`}>Read More</Button>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Link to={`/edit-article/${article.id}`}>
                      <FaEdit className="text-xl text-blue-500 hover:text-blue-600 transition-colors" />
                    </Link>
                    <div
                      className={`h-8 w-8 rounded-full border-2 ${
                        selectedArticles.includes(article.id)
                          ? "bg-blue-500 border-blue-500"
                          : "bg-white border-gray-300"
                      } flex items-center justify-center ml-2 cursor-pointer`}
                      onClick={() => handleSelectArticle(article.id)}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex m-10 gap-5">
            {isDeleteMode && (
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                onClick={() => setShowConfirmPopup(true)}
              >
                Confirm Delete
              </button>
            )}
            <Link
              to="/create-article"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
            >
              Create Article
            </Link>
            <button
              className={`text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
                isDeleteMode ? "bg-gray-500" : "bg-blue-500"
              }`}
              onClick={() => setIsDeleteMode((prev) => !prev)}
            >
              {isDeleteMode ? "Cancel" : "Delete Articles"}
            </button>
          </div>
        </div>
      </div>

      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <p className="mb-4">
              Are you sure you want to delete the selected articles?
            </p>
            <div className="flex justify-around">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                OK
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                onClick={() => setShowConfirmPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
