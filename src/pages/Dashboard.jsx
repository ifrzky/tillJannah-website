import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../components/Navbar";
import axios from "axios";
import Button from "../components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import ZakatCalc from "./ZakatCalc";
import FlashMessage from "../components/FlashMessage";
import Footer from "../components/Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [userArticles, setUserArticles] = useState([]);
  const [error, setError] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [flashMessage, setFlashMessage] = useState(null);

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

  const [userData, setUserData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    gender: userInfo.gender,
    dateOfBirth: userInfo.dateOfBirth,
  });

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setUserData({
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      dateOfBirth: userInfo.dateOfBirth,
    });
  };

  const handleEditProfile = () => {
    setIsEditMode(true);
  };

  const handleSaveProfile = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await axios.put(
        "http://localhost:5000/api/users/update",
        userData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update userInfo with the new data from the server
      const updatedUserInfo = response.data;

      // Save the updated user data to session storage
      sessionStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      setFlashMessage({
        message: "Profile updated successfully.",
        type: "success",
      });

      // Clear flash message after 3 seconds
      setTimeout(() => {
        setFlashMessage(null);
      }, 3000);

      // Reset edit mode
      setIsEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      setFlashMessage({
        message: "Failed to update profile. Please try again.",
        type: "error",
      });

      // Clear flash message after 3 seconds
      setTimeout(() => {
        setFlashMessage(null);
      }, 3000);
    }
  };

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
    <div className="flex flex-row">
      {flashMessage && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          clearMessage={() => setFlashMessage(null)}
        />
      )}
      <div className="flex flex-col lg:flex-row m-5 gap-3">
        <div className="w-full lg:w-1/3 shadow-md rounded-md p-5 top-0">
          <div className="flex flex-col items-center justify-center">
            <img
              src={userInfo.pic}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="text-center">
              <p className="mb-2 text-2xl font-bold">{userInfo.name}</p>
            </div>
            <div className="text-lg font-bold">My Info</div>
            {isEditMode ? (
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-xl mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
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
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-row gap-2 my-5">
                  <div className="">
                    <label htmlFor="gender" className="block">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full px-3 py-2 border rounded-md"
                      value={userData.gender}
                      onChange={(e) =>
                        setUserData({ ...userData, gender: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div className="">
                    <label htmlFor="dateOfBirth" className="block">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      className="w-full px-3 py-2 border rounded-md"
                      value={userData.dateOfBirth}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-row mb-4 gap-2">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-5">
                <div className="flex flex-col mb-4">
                  <span className="font-bold">Name</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex flex-col mb-4">
                  <p className="font-bold">Email</p>
                  <p>{userInfo.email}</p>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="font-bold">Gender</span>
                  <span>{userInfo.gender}</span>
                </div>
                <div className="flex flex-col mb-4">
                  <span className="font-bold">Date of Birth</span>
                  <span>{userInfo.dateOfBirth}</span>
                </div>
                <div className="flex flex-row gap-2 my-5">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-[1200px] h-full rounded-md shadow-md p-5 flex flex-col">
          <h2 className="text-xl mb-2 left-0 m-5 font-bold bg-gradient-to-r from-green-400 to-green-700 w-full p-5 m-5 border-2 border-gold rounded-xl text-white">My Articles</h2>
          {userArticles.length === 0 ? (
            <div className="flex items-center justify-center">
              <p className="text-red-500 items-center justify-center m-10">No article created...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 m-5">
              {userArticles.map((article) => (
                <div
                  key={article.id}
                  className="border p-4 rounded-md bg-white shadow-md flex flex-col justify-between relative"
                >
                  <div>
                    <h3 className="font-bold text-xl mb-2">{article.title}</h3>
                    <div
                      className="overflow-hidden truncate whitespace-nowrap mb-10"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </div>
                  <div className="flex flex-col justify-end mt-4">
                    <div className="flex justify-end justify-between">
                      <Link to={`/edit-article/${article.id}`}>
                        <FaEdit className="text-xl text-blue-500 hover:text-blue-600 transition-colors" />
                      </Link>
                    <Button to={`/article/${article.id}`}>Read More</Button>
                    </div>
                    {isDeleteMode && (
                      <div
                        className={`h-8 w-8 rounded-full border-2 justify-end ${
                          selectedArticles.includes(article.id)
                            ? "bg-blue-500 border-blue-500"
                            : "bg-white border-gray-300"
                        } flex items-center justify-center ml-2 cursor-pointer`}
                        onClick={() => handleSelectArticle(article.id)}
                      ></div>
                    )}
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
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
