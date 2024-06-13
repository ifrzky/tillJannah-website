import React from 'react';
import Nav from '../components/Navbar';

const Post = ({ title, content, thumbnail }) => {
    return (
        <>
            <Nav />
            <div className="max-w-2xl mx-auto my-8 p-4 font-serif text-gray-900 leading-relaxed">
                <h1 className="text-4xl font-bold mb-6">{title}</h1>
                {thumbnail && <img src={thumbnail} alt="Thumbnail" className="w-full h-auto mb-6 rounded-md" />}
                <p className="text-lg">{content}</p>
            </div>
        </>
    );
};

export default Post;
