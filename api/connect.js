import mysql from 'mysql2';

// Crear conexión a la base de datos
export const db = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  port: 27683,
  password: "AOKhHcQUpRNSsEUetDqKXjFMUNbdfCxt",
  database: "railway"
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('error al conectarse a la bd:', err.stack);
    return;
  }
  console.log('Connectado correctamente a la base de datos el id es:', db.threadId);
});

// const consulta = "SELECT * FROM USUARIOS;"

// db.query(consulta, (err, results) => {
//   if (err) {
//     console.error('Error executing query:', err.stack);
//     return;
//   }
//   console.log('Query results:', results);
// });

