import mysql from 'mysql2';

// Crear conexión a la base de datos
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "root",
  database: "evaluaciondocente_db"
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('error al conectarse a la bd:', err.stack);
    return;
  }
  console.log('Connectado correctamente a la base de datos el id es:', db.threadId);
});

