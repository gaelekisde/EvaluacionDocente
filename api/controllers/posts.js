import {db} from "../connect.js"
import jwt from "jsonwebtoken"

export const getPosts = (req, res) => {
    const carrera = req.params.carrera;
    const query = `
        SELECT opiniones.*, usuarios.user_handle, usuarios.user_pfp
        FROM opiniones
        JOIN usuarios ON opiniones.user_id = usuarios.user_id
        WHERE opiniones.carrera = ?`;
    db.query(query, [carrera], (err, results) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Error fetching posts' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'No posts found for this carrera' });
        }
        return res.status(200).json(results);
    });
};


export const getPost = (req, res) => {
    
    const opinion_id = req.params.opinion_id;
    const carrera = req.params.carrera;

    //const query = `select * from opiniones where carrera = '${carrera}' and opinion_id = ?`\
    const query = `select * from opiniones where carrera opinion_id = ?`
    console.log(query)
    
    db.query(query, [opinion_id], (err, result) => {
        if (err) throw err
        return res.status(200).json(result)
    })   
}

export const createPosts = (req, res) => {

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
            const insertQuery = "INSERT INTO opiniones (`user_id`, `carrera`, `opinion_text`) VALUES (?, ?, ?)";
            const insertValues = [user_id, req.params.carrera, req.body.opinion_text];
            
            db.query(insertQuery, insertValues, (err, data) => {
                if (err) {
                    return res.status(500).json(err);
                }
                return res.status(200).json("se ha creado correctamente el post");
            });
        });
    });
};

