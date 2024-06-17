import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "../pages/Slug";
import Footer from "../components/Footer";

const Details = () => {
  const { id } = useParams(); // Menggunakan useParams untuk mendapatkan ID dari URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/article/${id}`
        );
        setArticle(response.data);
      } catch (error) {
        setError("Failed to fetch article.");
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="article-detail">
      <Post
        title={article.title}
        content={article.content}
        thumbnail={article.thumbnail}
      />
      <Footer />
    </div>
  );
};

export default Details;
