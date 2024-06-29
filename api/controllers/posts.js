import {db} from "../connect.js"

export const getPosts = (req, res) => {
    const carrera = req.params.carrera;
    const query = `
        SELECT opiniones.*, usuarios.user_handle 
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

    const query = `select * from opiniones where carrera = '${carrera}' and opinion_id = ?`
    console.log(query)
    
    db.query(query, [opinion_id], (err, result) => {
        if (err) throw err
        return res.status(200).json(result)
    })   

}

export const createPosts = (req, res) => {
    const carrera = req.params.carrera;

    const query = "INSERT INTO opiniones (`user_id`, `carrera`, `opinion_text`) VALUES (?)";
    
    const values = [
        req.body.user_id,
        carrera,
        req.body.opinion_text
    ];

    db.query(query, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Post creado exitosamente");
    });
};

export const likePost = (req, res) => {
    const opinion_id = req.params.opinion_id;

    const query = "UPDATE opiniones SET num_likes = num_likes + 1 WHERE opinion_id = ?";

    db.query(query, [opinion_id], (err, result) => {
        if (err) throw err;
        return res.status(200).json("se ha dado el like con exito");
    });
};
