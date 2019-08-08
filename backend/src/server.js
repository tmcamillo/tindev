const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const server = express();

mongoose.connect('mongodb+srv://admintest:admintest@cluster0-khqfy.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
server.use(express.json());
server.use(routes);
server.listen(8888);