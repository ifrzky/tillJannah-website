import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.post('http://localhost:5000/api/article/create', {
                title,
                content,
                thumbnail
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}` // token otentikasi dalam header
                }
            });
            console.log('Article created successfully:', response.data);
            setTitle('');
            setContent('');
            setThumbnail('');
            setError(null);
            setSuccessMessage('Article created successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } catch (error) {
            console.error('Failed to create article:', error);
            setError('Failed to create article. Please try again.');
        }
    };

    return (
        <div className="__wrapper items-center justify-center m-5">
            <h1 className="text-3xl font-bold mb-4">Create New Article</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-xl mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-xl mb-2">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        className="w-full px-3 py-2 border rounded-md resize-none"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block text-xl mb-2">Thumbnail URL</label>
                    <input
                        type="text"
                        id="thumbnail"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                    Create Article
                </button>
            </form>
        </div>
    );
};

export default CreatePost;