const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const todoRoutes = require('./routes/todo');

app.use(bodyParser.json());

app.use(todoRoutes);

app.use((req, res, next) => {
    console.log('Hello World');
    next();
});

app.listen(3000);

