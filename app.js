//App.js
const express = require('express');
const app = express();
const server = require('http').Server(app);


app.use(express.static(__dirname + '/public'));

//Socket.io
const io = require('socket.io')(server);

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log(" New user connected! ");
  //(io, socket, onlineUsers) socket listners
  require('./sockets/chat.js')(io, socket, onlineUsers);
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen('3000', () => {
  console.log('Server listening on Port 3000');
})
