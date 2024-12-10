// // const io = require("socket.io")(3000, {
// //     cors: {
// //         origin: ["http://localhost:5173"],
// //     },
// // });

// const ChatServiceIO = (io) => {

// const activeSpeakers = new Map(); 

// io.on("connection", (socket) => {
//     console.log(`User connected with ID: ${socket.id}`);

//     socket.on("join-room", (data, cb) => {
//         const { roomId, userId } = data;
        
//         if (roomId && userId) {
//             socket.join(roomId.toString()); // Convert roomId to string
//             console.log(`User ${userId} joined room ${roomId}`);
            
//             // Debug info
//             const roomMembers = io.sockets.adapter.rooms.get(roomId.toString());
//             console.log("Room members:", roomMembers ? Array.from(roomMembers) : []);
            
//             cb({ status: true, message: `Joined room: ${roomId}` });
//         } else {
//             cb({ status: false, message: "Room ID or User ID missing" });
//         }
//     });

//     socket.on("send-message", (data, cb) => {
//         const { chatId, userId, message } = data;
        
//         // Convert chatId to string for consistency
//         const roomId = chatId.toString();
        
//         if (chatId && message.trim()) {
//             const room = io.sockets.adapter.rooms.get(roomId);
            
//             if (room) {
//                 // socket.to(roomId).emit("receive-message", data);
//                 io.in(chatId).emit("receive-message", data);

//                 console.log(`Message from ${userId} to ${chatId}: ${message}`);
//                 console.log("Room members:", Array.from(room));
//                 cb({ status: "success", message: "Delivered" });
//             } else {
//                 cb({ status: "error", message: "Room does not exist" });
//             }
//         } else {
//             cb({ status: "error", message: "No room or empty message" });
//         }
//     });

//     socket.on("delete-message", (data, cb) => {
//         const { messageId, roomId, userId } = data;
        
//         // You might want to add authorization check here
//         io.in(roomId).emit("message-deleted", { messageId, roomId });
//         cb({ status: "success", message: "Message deleted" });
//       });
    
//       socket.on("pin-message", (data, cb) => {
//         const { messageId, roomId, userId } = data;
        
//         io.in(roomId).emit("message-pinned", { messageId, roomId });
//         cb({ status: "success", message: "Message pinned" });
//       });
    
//       socket.on("leave-room", (data, cb) => {
//         const { roomId, userId } = data;
        
//         socket.leave(roomId);
//         io.in(roomId).emit("user-left", { userId, roomId });
//         cb({ status: "success", message: "Left room" });
//       });




//       // Handle WebRTC signaling
//   socket.on('offer', (data) => {
//     socket.broadcast.emit('offer', data);
//   });

//   socket.on('answer', (data) => {
//     socket.broadcast.emit('answer', data);
//   });

//   socket.on('ice-candidate', (data) => {
//     socket.broadcast.emit('ice-candidate', data);
//   });

//   // Handle speaking state
//   socket.on('speaking-started', () => {
//     activeSpeakers.set(socket.id, Date.now());
//     io.emit('speakers-update', Array.from(activeSpeakers.keys()));
//   });

//   socket.on('speaking-ended', () => {
//     activeSpeakers.delete(socket.id);
//     io.emit('speakers-update', Array.from(activeSpeakers.keys()));
//   });

//   socket.on('disconnect', () => {
//     activeSpeakers.delete(socket.id);
//     io.emit('speakers-update', Array.from(activeSpeakers.keys()));
//     console.log('User disconnected:', socket.id);
//   });

// });

// }
//  export default ChatServiceIO

import messageService from './messageService.js';
import User from '../models/User.js';
import RoomParticipants from '../models/Room.js';


const ChatServiceIO = (io) => {
  const activeSpeakers = new Map();

  io.on("connection", async (socket) => {
    console.log(`User connected with ID: ${socket.id}`);

    socket.on("join-room", async (data, cb) => {
      const { roomId, userId } = data;
      
      try {
        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
          return cb({ status: false, message: "User not found" });
        }

        socket.join(roomId.toString());
        cb({ status: true, message: `Joined room: ${roomId}` });
      } catch (error) {
        cb({ status: false, message: error.message });
      }
    });

    socket.on("send-message", async (data, cb) => {
      const { chatId, userId, message } = data;
      
      try {
        // Save message to database
        const savedMessage = await messageService.saveMessage(chatId, userId, message);
        
        // Broadcast to room
        io.in(chatId.toString()).emit("receive-message", {
          ...data,
          messageId: savedMessage._id
        });

        cb({ status: "success", message: "Delivered", messageId: savedMessage._id });
      } catch (error) {
        cb({ status: "error", message: error.message });
      }
    });

    socket.on("delete-message", async (data, cb) => {
      const { messageId, roomId, userId } = data;
      
      try {
        await messageService.deleteMessage(messageId);
        io.in(roomId).emit("message-deleted", { messageId, roomId });
        cb({ status: "success", message: "Message deleted" });
      } catch (error) {
        cb({ status: "error", message: error.message });
      }
    });

    socket.on("pin-message", async (data, cb) => {
      const { messageId, roomId, userId } = data;
      
      try {
        await messageService.pinMessage(messageId);
        io.in(roomId).emit("message-pinned", { messageId, roomId });
        cb({ status: "success", message: "Message pinned" });
      } catch (error) {
        cb({ status: "error", message: error.message });
      }
    });

    socket.on('get-room-participants', async(data, responce) => {
      const { roomId } = data;
      const participants = await RoomParticipants.find({ roomId });
      if(participants){
        responce(participants)
      }else{
        responce(0)
      }
    })

    


    socket.on('join-voice', async (data) => {
      const { roomId, userId } = data;
      const roomUsers = io.sockets.adapter.rooms.get(roomId);
      
      // Notify existing users in room
      socket.to(roomId).emit('user-joined-voice', { userId });
      
      // Send list of existing users to new participant
      if (roomUsers) {
        socket.emit('existing-users', Array.from(roomUsers));
      }
    });

    socket.on('offer', (data) => {
      const { target, offer, roomId } = data;
      socket.to(target).emit('offer', {
        offer,
        from: socket.id,
        roomId
      });
    });

    socket.on('answer', (data) => {
      const { target, answer } = data;
      socket.to(target).emit('answer', {
        answer,
        from: socket.id
      });
    });

    socket.on('ice-candidate', (data) => {
      const { target, candidate } = data;
      socket.to(target).emit('ice-candidate', {
        candidate,
        from: socket.id
      });
    });

    socket.on('mute-audio', (data) => {
      const { roomId } = data;
      socket.to(roomId).emit('user-muted', { userId: socket.id });
    });

    socket.on('unmute-audio', (data) => {
      const { roomId } = data;
      socket.to(roomId).emit('user-unmuted', { userId: socket.id });
    });


    socket.on('disconnect', () => {
          activeSpeakers.delete(socket.id);
          io.emit('speakers-update', Array.from(activeSpeakers.keys()));
          console.log('User disconnected:', socket.id);
        });

  });
};

export default ChatServiceIO;
