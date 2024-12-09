// const io = require("socket.io")(3000, {
//     cors: {
//         origin: ["http://localhost:5173"],
//     },
// });

const ChatServiceIO = (io) => {

const activeSpeakers = new Map(); 

io.on("connection", (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on("join-room", (data, cb) => {
        const { roomId, userId } = data;
        
        if (roomId && userId) {
            socket.join(roomId.toString()); // Convert roomId to string
            console.log(`User ${userId} joined room ${roomId}`);
            
            // Debug info
            const roomMembers = io.sockets.adapter.rooms.get(roomId.toString());
            console.log("Room members:", roomMembers ? Array.from(roomMembers) : []);
            
            cb({ status: true, message: `Joined room: ${roomId}` });
        } else {
            cb({ status: false, message: "Room ID or User ID missing" });
        }
    });

    socket.on("send-message", (data, cb) => {
        const { chatId, userId, message } = data;
        
        // Convert chatId to string for consistency
        const roomId = chatId.toString();
        
        if (chatId && message.trim()) {
            const room = io.sockets.adapter.rooms.get(roomId);
            
            if (room) {
                // socket.to(roomId).emit("receive-message", data);
                io.in(chatId).emit("receive-message", data);

                console.log(`Message from ${userId} to ${chatId}: ${message}`);
                console.log("Room members:", Array.from(room));
                cb({ status: "success", message: "Delivered" });
            } else {
                cb({ status: "error", message: "Room does not exist" });
            }
        } else {
            cb({ status: "error", message: "No room or empty message" });
        }
    });

    socket.on("delete-message", (data, cb) => {
        const { messageId, roomId, userId } = data;
        
        // You might want to add authorization check here
        io.in(roomId).emit("message-deleted", { messageId, roomId });
        cb({ status: "success", message: "Message deleted" });
      });
    
      socket.on("pin-message", (data, cb) => {
        const { messageId, roomId, userId } = data;
        
        io.in(roomId).emit("message-pinned", { messageId, roomId });
        cb({ status: "success", message: "Message pinned" });
      });
    
      socket.on("leave-room", (data, cb) => {
        const { roomId, userId } = data;
        
        socket.leave(roomId);
        io.in(roomId).emit("user-left", { userId, roomId });
        cb({ status: "success", message: "Left room" });
      });




      // Handle WebRTC signaling
  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    socket.broadcast.emit('ice-candidate', data);
  });

  // Handle speaking state
  socket.on('speaking-started', () => {
    activeSpeakers.set(socket.id, Date.now());
    io.emit('speakers-update', Array.from(activeSpeakers.keys()));
  });

  socket.on('speaking-ended', () => {
    activeSpeakers.delete(socket.id);
    io.emit('speakers-update', Array.from(activeSpeakers.keys()));
  });

  socket.on('disconnect', () => {
    activeSpeakers.delete(socket.id);
    io.emit('speakers-update', Array.from(activeSpeakers.keys()));
    console.log('User disconnected:', socket.id);
  });

});

}
 export default ChatServiceIO