import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./posts.css";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav"

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies] = useCookies(["accessToken"]);
  const [showCommentInput, setShowCommentInput] = useState({});
  const [comments, setComments] = useState({});
  let { carrera } = useParams();

  if (carrera === undefined) {
    carrera = "general";
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/${carrera}/posts/`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${cookies.accessToken}`,
            },
          }
        );
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
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      // Handle response here
    } catch (error) {
      console.error("Error al dar like:", error);
      // Handle error here
    }
  };

  const toggleCommentInput = (opinionId) => {
    setShowCommentInput((prevState) => ({
      ...prevState,
      [opinionId]: !prevState[opinionId],
    }));
  };

  const handleCommentChange = (opinionId, text) => {
    setComments((prevState) => ({
      ...prevState,
      [opinionId]: text,
    }));
  };

  const handleCommentSubmit = async (opinionId) => {
    try {
      const commentText = comments[opinionId].trim(); // Trim whitespace
      if (!commentText) {
        console.error("Comment cannot be empty");
        return;
      }

      console.log("Sending comment:", commentText); // Verifica si se está enviando correctamente el texto del comentario

      const response = await axios.post(
        `http://localhost:8800/api/posts/${opinionId}/comment`,
        { comentario_text: commentText },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
      console.log("Comment submitted successfully:", response.data);

      // Clear the comment input after successful submission
      setComments((prevState) => ({
        ...prevState,
        [opinionId]: "",
      }));
      // Optionally, update the post's comments count or fetch updated comments
    } catch (error) {
      console.error("Error al enviar comentario:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      // Handle error here
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <Nav />
    <div className="contenedor-posts">
      <ul className="contenedor-post">
        {posts.map((post) => (
          <li className="contenedor-un-post" key={post.opinion_id}>
            <div className="post-header">
              <img
                className="pfp-usuario"
                src={post.user_pfp}
                alt="Perfil del usuario"
              />
              <div className="info-container">
                <p className="user-handle">@{post.user_handle}</p>
                <h3 className="user-carrera">-{post.carrera}</h3>
              </div>
            </div>
            <p className="opinion-text">{post.opinion_text}</p>
            <p className="created-at">{post.created_at}</p>
            <p className="likes">likes: {post.num_likes}</p>
            <p className="comments">comentarios: {post.num_comments}</p>

            <button
              className="like-button"
              onClick={() => handleLike(post.opinion_id)}
            >
              like
            </button>
            <button
              className="comment-button"
              onClick={() => toggleCommentInput(post.opinion_id)}
            >
              comentar
            </button>

            {showCommentInput[post.opinion_id] && (
              <div className="comment-input-container">
                <input
                  type="text"
                  placeholder="Escribe tu comentario"
                  value={comments[post.opinion_id] || ""}
                  onChange={(e) =>
                    handleCommentChange(post.opinion_id, e.target.value)
                  }
                  className="comment-input"
                />
                <button
                  className="submit-comment-button"
                  onClick={() => handleCommentSubmit(post.opinion_id)}
                >
                  Enviar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Posts;
