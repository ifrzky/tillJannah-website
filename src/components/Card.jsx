import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "./Button";

const Cards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

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
    <div className="__wrapper items-center">
      <div className="__card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center space-between">
        {articles.slice(0, 5).map((article) => (
          <div key={article.id} className="__card_item hover:">
            <div className="__card_item_thumbnail">
              <img
                src={article.thumbnail}
                alt="thumbnail"
                className="w-full rounded-t-md h-32 object-cover"
              />
            </div>
            <div className="__card_item_content bg-gradient-to-r from-green-400 to-green-700 h-48 shadow-md rounded-b-md px-4 py-4 flex flex-col justify-between">
              <div>
                <h2 className="__card_item_title font-bold mb-4 text-white text-sm">
                  {article.title}
                </h2>
                <p className="__card_item_author text-white text-xs">{article.author}</p>
                <p className="__card_item_date text-white text-xs">{article.date}</p>
              </div>
              <Button to={`/article/${article.id}`} className="self-end mt-4 text-xs">
                Read More
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="__view_more flex mx-10 my-10 justify-center items-center">
        <Link to="/feeds">
          <Button>View More</Button>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
