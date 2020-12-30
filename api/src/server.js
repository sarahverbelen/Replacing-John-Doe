const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const Helpers = require('./utils/helpers.js')

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/test', (req, res) => {
    console.log("test");
    res.status(200).send();
});




module.exports = app;
