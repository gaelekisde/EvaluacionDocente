const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

const port = 5000
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

//sasasa