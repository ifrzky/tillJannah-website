import React from 'react';

const Post = ({ title, content, thumbnail }) => {
    return (
        <div className="post items-center justify-center">
            <h1 className="post-title">{title}</h1>
            <img src={thumbnail} alt="Thumbnail" className="post-thumbnail" />
            <p className="post-content">{content}</p>
        </div>
    );
};

export default Post;