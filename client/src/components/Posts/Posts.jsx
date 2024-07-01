import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/sistemas/posts/', {
          withCredentials: true, 
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, [cookies]);

  const handleLike = async (opinionId) => {
  
    try {
      const response = await axios.put(
        `http://localhost:8800/api/posts/${opinionId}/like`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`
          }
        }
      );
      // Manejar la respuesta aquí
    } catch (error) {
      console.error('Error al dar like:', error);
      // Manejar el error aquí
    }
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
            <img src={post.user_pfp} />
            <h3>{post.carrera}</h3>
            <p>{post.opinion_text}</p>
            <p>{post.created_at}</p>
            <p>likes: {post.num_likes}</p>
            <p>comentarios: {post.num_comments}</p>
  
            <button onClick={() => handleLike(post.opinion_id)}>like</button>
            <button>comentar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Posts;
