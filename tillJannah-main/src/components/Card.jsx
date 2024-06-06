import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

const Cards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/article/")
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="__wrapper items-center">
      <div className="__card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center space-between">
        {articles.map((article) => (
          <div key={article.id} className="__card_item">
            <div className="__card_item_thumbnail">
              <img
                src={article.thumbnail}
                alt="thumbnail"
                className="w-full rounded-t-md h-min-56 object-cover"
              />
            </div>
            <div className="__card_item_content h-xl shadow-md rounded-b-md px-10 py-10">
              <h2 className="__card_item_title font-bold mb-10">
                {article.title}
              </h2>
              <p className="__card_item_author">{article.author}</p>
              <p className="__card_item_date">{article.date}</p>
              <Button to={`/article/${article.id}`}>Read More</Button>
            </div>
          </div>
        ))}
      </div>
      <div className="__view_more flex mx10 my-10 justify-center items-center">
        <Button>View More</Button>
      </div>
    </div>
  );
};

export default Cards;
