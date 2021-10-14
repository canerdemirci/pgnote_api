require('dotenv').config();

const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/note', require('./routes/note'), (req, res) => res.status(500).send('Internal server error'));

if (process.env.PRODUCTION) {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));