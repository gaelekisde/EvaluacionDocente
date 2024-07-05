import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const { user } = useParams();
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get(`http://localhost:8800/api/${carrera}/posts/`, {
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
    return (
        <h1>el perfil de {user}</h1>
    );
}

export default User;
