import {db} from "../connect.js"

export const getPostsistemas = (req, res) => {
    const opinion_id = req.params.opinion_id;

    const q = `select * from opiniones where carrera = 'sistemas' and opinion_id = ?`
    db.query(q, [opinion_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        // Send the result as the response
        return res.status(200).json(result);
    });
}