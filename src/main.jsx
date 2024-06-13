import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Slug";
import Quran from "./pages/Quran";  
import Details from "./pages/Details";
import PrivateRoute from "./components/PrivateRoutes";
import { ImOpera } from "react-icons/im";
import Feed from "./pages/Feed";
import EditPost from "./pages/EditPost";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<Dashboard />} />, // Gunakan PrivateRoute
  },
  {
    path: "/create-article",
    element: <PrivateRoute element={<CreatePost />} />, // Gunakan PrivateRoute
  },
  {
    path: "/article/:id",
    element: <Details />,
  },
  {
    path: "/quran",
    element: <Quran />,
  },
  {
    path: "/feeds",
    element: <Feed />,
  },
  {
    path: "/edit-article/:id",
    element: <PrivateRoute element={<EditPost />} />, // Gunakan PrivateRoute
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter} />
  </React.StrictMode>
);
