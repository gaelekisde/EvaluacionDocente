// import db from "../connect.js"
import { db } from "../connect.js";

export const getUsers = (req, res) =>{

    const query = `select * from usuarios`
    
    db.query(query, (err, result) => {
        if (err) throw err
        return res.status(200).json(result)
    })
}

export const getUser = (req, res) => {
    const user_handle = req.params.user_handle;
    console.log(`nombre de usuario: ${user_handle}` )
    const queryuser = `SELECT * FROM usuarios WHERE user_handle = ?;`;

    db.query(queryuser, [user_handle], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        // Send the result as the response
        return res.status(200).json(result);
    });
}
