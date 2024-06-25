import {db} from "../connect.js"

export const getPosts = (req, res) => {
    const carrera = req.params.carrera;
    const query = 'SELECT * FROM opiniones WHERE carrera = ?';
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