const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT | 8000;

// Setting up Routes
const userRoutes = require('./api/routes/users');
const reviewRoutes = require('./api/routes/reviews');
const gamesRoutes = require('./api/routes/games');
const adminRoutes = require('./api/routes/admin');

// Allows Parsing of Bodys
app.use(bodyParser.json());

// Sets up Debug
app.use(morgan('dev'));

// ALL Routes Used
app.use('/user', userRoutes);
app.use('/review', reviewRoutes)
app.use('/game', gamesRoutes);
app.use('/admin', adminRoutes);

// Server Listening on Port
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});