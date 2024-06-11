import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import './index.css'
import Dashboard from './pages/Dashboard'
import CreatePost from './pages/CreatePost'
import Post from './pages/Slug'
import Details from './pages/Details'

const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <Dashboard />
  },
  // {
  //   path: '/create-article',
  //   element: <CreatePost />
  // },
  {
    path: '/article/:id',
    element: <Details />,
  },  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)