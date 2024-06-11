import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../components/Navbar';
import axios from 'axios';

const Dashboard = () => {
    const article = [
        {
            title: 'Article 1',
        },
    ]
    const navigate = useNavigate();

    // Ambil informasi pengguna dari localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const [newName, setNewName] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Logika untuk mengambil daftar artikel milik pengguna
        const fetchUserArticles = async () => {
        try {
            const response = await axios.get(`/api/articles/user/${userInfo._id}`);
            setArticles(response.data);
        } catch (error) {
            console.e('Failed to fetch user articles:', error);
        }
        };

        fetchUserArticles();
    }, [userInfo._id]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

  return (
    <>
    <Nav />
    <div className="flex flex-row">
      <div className="w-1/5">
        <div className="flex flex-col items-center justify-center">
          <img src={userInfo.pic} alt="Profile Picture" className="w-24 h-24 rounded-full mb-4" />
          <div className="text-center">
            <p className="mb-2">{userInfo.name}</p>
            <p className="mb-2">{userInfo.email}</p>
            {/* <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New Name"
              className="mb-2 px-3 py-2 border rounded-md"
            />
            <button onClick={handleChangeName} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors mb-2">Change Name</button>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="mb-2 px-3 py-2 border rounded-md"
            />
            <button onClick={handleChangePassword} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">Change Password</button>
            {error && <p className="text-red-500 mt-2">{error}</p>} */}
          </div>
          <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors mt-4"
                onClick={handleLogout}
                >
                Logout
            </button>
        </div>
      </div>
      <div className="w-4/5 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, {userInfo.name}!</h1>
        <h2 className="text-xl mb-2">Your Articles</h2>
        <ul className="list-disc">
          {/* users articles */}isinya artikel si user ini
        </ul>
        <Link to="/create-article" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors mt-8">Create Article</Link>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
