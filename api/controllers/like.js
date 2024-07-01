import { db } from "../connect.js"
import jwt from "jsonwebtoken"

export const likePost = (req, res) => {
    const opinion_id = req.params.opinion_id;
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const user_handle = userInfo.user_handle;

        // Obtener user_id desde la base de datos usando user_handle
        const userQuery = "SELECT user_id FROM usuarios WHERE user_handle = ?";
        db.query(userQuery, [user_handle], (err, userResult) => {
            if (err) {
                console.error('Error al obtener user_id:', err);
                return res.status(500).json(err);
            }

            if (userResult.length === 0) {
                return res.status(404).json("Usuario no encontrado");
            }

            const user_id = userResult[0].user_id;

            // Verificar si el usuario ya ha dado like a la publicación
            const likeQuery = "SELECT * FROM likes WHERE user_id = ? AND opinion_id = ?";
            db.query(likeQuery, [user_id, opinion_id], (err, likeResult) => {
                if (err) {
                    console.error('Error al verificar like:', err);
                    return res.status(500).json(err);
                }

                if (likeResult.length > 0) {
                    return res.status(400).json("Ya has dado like a esta publicación");
                }

                // Incrementar el contador de likes en la tabla opiniones
                const updateQuery = "UPDATE opiniones SET num_likes = num_likes + 1 WHERE opinion_id = ?";
                db.query(updateQuery, [opinion_id], (err, updateResult) => {
                    if (err) {
                        console.error('Error al actualizar likes:', err);
                        return res.status(500).json(err);
                    }

                    // Registrar el like en la tabla likes
                    const insertLikeQuery = "INSERT INTO likes (user_id, opinion_id) VALUES (?, ?)";
                    db.query(insertLikeQuery, [user_id, opinion_id], (err, insertLikeResult) => {
                        if (err) {
                            console.error('Error al registrar like:', err);
                            return res.status(500).json(err);
                        }

                        return res.status(200).json("Se ha dado el like con éxito");
                    });
                });
            });
        });
    });
};