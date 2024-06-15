import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [categories, setCategories] = useState(""); // Add state for categories
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const accessToken = sessionStorage.getItem("accessToken");
        const response = await axios.get(
          `http://localhost:5000/api/article/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setTitle(response.data.title);
        setContent(response.data.content);
        setThumbnail(response.data.thumbnail);
        setCategories(response.data.categories); // Set categories state
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setError("Failed to fetch article. Please try again.");
      }
    };

    fetchArticle();
  }, [id]);

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("thumbnail", thumbnail);
      formData.append("categories", categories);

      await axios.put(
        `http://localhost:5000/api/article/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccessMessage("Article updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/profile");
      }, 3000);
    } catch (error) {
      console.error("Failed to update article:", error);
      setError("Failed to update article. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Edit Article</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-xl mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="block text-xl mb-2">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="w-full h-64"
              required
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-xl mt-16 mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={handleThumbnailChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="categories" className="block text-xl mt-16 mb-2">
              Categories
            </label>
            <input
              type="text"
              id="categories"
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors w-full"
          >
            Update Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
