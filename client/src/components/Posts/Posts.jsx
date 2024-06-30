// src/Posts.js
import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8800/api/sistemas/posts/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

const handleLike = (carrera, opinionId) => {
  fetch(`http://localhost:8800/api/${carrera}/posts/${opinionId}/like`, {
    method: 'PUT'
  })
};

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.opinion_id}>
            <h2>{post.user_handle}</h2>
            <h3>{post.carrera}</h3>
            <p>{post.opinion_text}</p>
            <p>{post.created_at}</p>
            <p>likes: {post.num_likes}</p>
            <p>comentarios: {post.num_comments}</p>
            <button onClick={() => handleLike(post.carrera, post.opinion_id)}>like</button> <button>comentar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
