const express = require('express');
const app = express();

// app.get watches for incoming requests.
// req is Object representing incoming request. res Object represents outgiong response.
app.get('/', (req, res) => {
    res.send({hi: 'there'}); // Sends JSON response.
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);