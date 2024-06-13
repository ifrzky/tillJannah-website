import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Nav from "../components/Navbar";

const Feed = () => {
  const [articles, setArticles] = useState([]);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
  }, [userInfo, navigate]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("userInfo");
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/article/");
      const sortedArticles = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArticles(sortedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="__wrapper flex justify-center m-20">
        <div className="user-info w-1/5 shadow-md rounded-md p-10 sticky top-20 h-fit">
          <div className="flex flex-col items-center justify-center">
            {userInfo ? (
              <>
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
              </>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Link to="/login">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mt-4">
                    Login
                  </button>
                </Link>
                <Link to="/register" className="mt-2">
                  <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mt-4">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="__card w-4/5 grid grid-cols-1 gap-6 justify-center bg-gray-100 mx-10 rounded-md p-10 backdrop-blur">
          {articles.map((article) => (
            <div key={article.id} className="__card_item w-full max-w-lg mx-auto">
              <div className="__card_item_thumbnail">
                <img
                  src={article.thumbnail}
                  alt="thumbnail"
                  className="w-full rounded-t-md h-60 object-cover"
                />
              </div>
              <div className="__card_item_content bg-gradient-to-r from-green-400 to-green-700 h-72 shadow-md rounded-b-md p-6 flex flex-col justify-between">
                <div>
                  <h2 className="__card_item_title font-bold mb-4 text-white text-xl">
                    {article.title}
                  </h2>
                  <p className="__card_item_author text-white">{article.author}</p>
                </div>
                <Link to={`/article/${article.id}`} className="self-end mt-auto">
                  <Button className="bg-white text-green-700 px-4 py-2 rounded-md">Read More</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
