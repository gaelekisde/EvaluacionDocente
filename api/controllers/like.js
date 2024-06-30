import { db } from "../connect.js"

export const likePost = (req, res) => {
    const opinion_id = req.params.opinion_id;

    const query = "UPDATE opiniones SET num_likes = num_likes + 1 WHERE opinion_id = ?";

    db.query(query, [opinion_id], (err, result) => {
        if (err) throw err;
        return res.status(200).json("se ha dado el like con exito");
    });
};