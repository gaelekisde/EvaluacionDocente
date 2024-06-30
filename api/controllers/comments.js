import {db} from '../connect.js';
import jwt from "jsonwebtoken"

export const getComments = (req, res) => {
    //router.get('/:carrera/posts/:opinion_id/comments', getComments)

    const opinion_id = req.params.opinion_id;

    const query = `select comentarios.*, 
    usuarios.user_handle from comentarios join usuarios on comentarios.user_id = usuarios.user_id 
    where comentarios.opinion_id = ?`
    db.query(query, [opinion_id], (err, result) => {
        if (err) throw err
        return res.status(200).json(result)
    })   
}
export const putComment = (req, res) => {
    const opinion_id = req.params.opinion_id;

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        // Obtener user_id desde la base de datos usando user_handle
        const q = "SELECT user_id FROM usuarios WHERE user_handle = ?";
        db.query(q, [userInfo.user_handle], (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            if (result.length === 0) {
                return res.status(404).json("Usuario no encontrado");
            }

            const user_id = result[0].user_id;

            // Insertar comentario en la tabla comentarios
            const insertQuery = "INSERT INTO comentarios (`opinion_id`, `user_id`, `comentario_text`) VALUES (?, ?, ?)";
            const insertValues = [opinion_id, user_id, req.body.comentario_text];
            
            db.query(insertQuery, insertValues, (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json("Comment has been created.");
            });
        });
    });
};

