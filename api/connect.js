import mysql from 'mysql2';

// Crear conexión a la base de datos
export const db = mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  port: 27683,
  password: "AOKhHcQUpRNSsEUetDqKXjFMUNbdfCxt",
  database: "railway"
});

db.connect((err) => {
  if (err) {
    console.error('error al conectarse a la bd:', err.stack);
    return;
  }
});
