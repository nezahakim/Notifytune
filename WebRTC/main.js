const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle signaling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data); // Forward offer to other peers
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data); // Forward answer to the offerer
  });

  socket.on('ice-candidate', (data) => {
    socket.broadcast.emit('ice-candidate', data); // Forward ICE candidates
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('Server listening on http://localhost:3000');
});
