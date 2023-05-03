const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const PORT = process.env.PORT || require('./keys.json').DEFAULT_PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI || require('./keys.json').MONGO_DB_URI;

mongoose.connect(MONGO_DB_URI)
    .then((response) => {
        console.log('Connected to MongoDB.');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB.');
        process.exit(1);
    });

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.PRODUCTION ? 'https://tasks.zacharyjbaldwin.com' : '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Wish, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/task', require('./routes/task.routes'));
app.use((req, res) => {
    res.status(200).json({
        ping: 'pong'
    });
});

app.listen(PORT, () => {
    console.log(`Express API listening on port ${PORT}...`);
});