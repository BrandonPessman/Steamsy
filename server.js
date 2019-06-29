const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.json({"message": "This is the first route"});
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});