// our main server file
const express = require('express');
const app = express();
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/cats_api');


app.use(bodyParser.json())


app.use(function (req, res, next) {
    console.log('Hello');
    next();
});

app.use('/api', apiRouter);


app.use('/*', function (req, res) {
    res.status(404).send({reason: 'ROUTE NOT FOUND'})
})

app.listen(3000, function (error) {
    if (error) {
        return console.log(error);
    }
    console.log('App listening on port 3000');
});