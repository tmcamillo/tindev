const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectdUser = {};

io.on('connection', socket => {
    // console.log('nova conexao', socket.id);
    const { user } = socket.handshake.query;
    // console.log(user, socket.id);
    connectdUser[user] = socket.id;
})

mongoose.connect('mongodb+srv://admintest:admintest@cluster0-khqfy.mongodb.net/oministack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectdUser = connectdUser;
    return next();
})

app.use(cors());
app.use(express.json());
app.use(routes);
server.listen(8888);