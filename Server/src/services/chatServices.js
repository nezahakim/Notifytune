// import logger from "../utils/logger.js";
// import { 
//   sendMessage, 
//   getChatMessages, 
//   deleteMessage, 
//   pinMessage, 
//   addUserToChat, 
//   removeUserFromChat,
//   getChatParticipants 
// } from "../controllers/chatController.js";
// import { findUserById } from "../controllers/userController.js";

// const chatServices = (io) => {
  
//   io.on("connection", (socket) => {
//     logger.info(`User connected: ${socket.user.userId}`);
//     // Join user to their chat rooms
//     joinUserRooms(socket);

//     // Get all messages for a chat
//     socket.on("getAllMessages", async ({ chatId }) => {
//       try {
//         const messages = await getChatMessages(chatId);
//         const messagesWithUserDetails = await Promise.all(
//           messages.map(async (msg) => {
//             const user = await findUserById(msg.userId);
//             return { ...msg, user };
//           })
//         );
//         io.to(socket.id).emit("getAllMessages", messagesWithUserDetails);
//       } catch (error) {
//         logger.error("Error fetching chat messages:", error);
//         socket.emit("error", { message: "Failed to fetch messages" });
//       }
//     });

//     // Handle new messages
//     socket.on("sendMessage", async ({ chatId, message }) => {
//       try {
//         const userId = socket.user.userId;
//         const newMessage = await sendMessage(chatId, userId, message);
//         const user = await findUserById(userId);
        
//         io.to(chatId).emit("newMessage", {
//           ...newMessage,
//           user
//         });
//       } catch (error) {
//         logger.error("Error sending message:", error);
//         socket.emit("error", { message: "Failed to send message" });
//       }
//     });

//     // Handle message deletion
//     socket.on("deleteMessage", async ({ chatId, messageId }) => {
//       try {
//         const userId = socket.user.userId;
//         const result = await deleteMessage(chatId, messageId);
        
//         if (result) {
//           io.to(chatId).emit("messageDeleted", { messageId });
//         }
//       } catch (error) {
//         logger.error("Error deleting message:", error);
//         socket.emit("error", { message: "Failed to delete message" });
//       }
//     });

//     // Handle message pinning
//     socket.on("pinMessage", async ({ messageId }) => {
//       try {
//         const result = await pinText(messageId);
//         if (result) {
//           const message = await getChatMessages(result.chatId);
//           io.to(result.chatId).emit("messagePinned", message);
//         }
//       } catch (error) {
//         logger.error("Error pinning message:", error);
//         socket.emit("error", { message: "Failed to pin message" });
//       }
//     });

//     // Handle joining community chat
//     socket.on("joinChat", async ({ chatId }) => {
//       try {
//         const userId = socket.user.userId;
//         const result = await addUserToChat(chatId, userId);
        
//         if (result) {
//           socket.join(chatId);
//           const user = await findUserById(userId);
//           io.to(chatId).emit("userJoinedChat", { user, chatId });
//         }
//       } catch (error) {
//         logger.error("Error joining chat:", error);
//         socket.emit("error", { message: "Failed to join chat" });
//       }
//     });

//     // Handle leaving community chat
//     socket.on("leaveChat", async ({ chatId }) => {
//       try {
//         const userId = socket.user.userId;
//         const result = await removeUserFromChat(chatId, userId);
        
//         if (result) {
//           socket.leave(chatId);
//           const user = await findUserById(userId);
//           io.to(chatId).emit("userLeftChat", { user, chatId });
//         }
//       } catch (error) {
//         logger.error("Error leaving chat:", error);
//         socket.emit("error", { message: "Failed to leave chat" });
//       }
//     });

//     socket.on("disconnect", () => {
//       logger.info(`User disconnected: ${socket.user.userId}`);
//     });
     
//   });
// };

// // Helper function to join user to their chat rooms
// const joinUserRooms = async (socket) => {
//   try {
//     const userId = socket.user.userId;
//     const chatId = socket.chat.chatId;

//     const rooms = await getChatParticipants(chatId);
//     rooms.forEach((room) => {
//       socket.join(room.chatId);
//     });
//   } catch (error) {
//     logger.error("Error joining user rooms:", error);
//   }
// };

// export default chatServices;



import { Server } from 'socket.io';
import { createChat, getUserChats, sendMessage, getChatMessages, pinMessage, deleteMessage } from '../controllers/chatController.js';
import logger from '../utils/logger.js';

let io;

// Store active users
const activeUsers = new Map();

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        },
        pingTimeout: 60000
    });

    io.on('connection', (socket) => {
        logger.info(`New socket connection: ${socket.id}`);

        // User joins with their userId
        socket.on('setup', (userId) => {
            socket.userId = userId;
            socket.join(userId);
            activeUsers.set(userId, socket.id);
            io.emit('user-online', userId);
            
            // Send active users list
            io.emit('active-users', Array.from(activeUsers.keys()));
        });

        // Join chat room
        socket.on('join-chat', (chatId) => {
            socket.join(chatId);
            logger.info(`User ${socket.userId} joined chat: ${chatId}`);
            socket.emit('joined-chat', chatId);
        });

        // Handle new message
        socket.on('new-message', async (data) => {
            try {
                const { chatId, userId, text } = data;
                const message = await sendMessage(chatId, userId, text);
                
                // Get chat participants and emit to all except sender
                const chat = await getChatParticipants(chatId);
                chat.forEach((participant) => {
                    if (participant._id.toString() !== userId) {
                        io.to(participant._id.toString()).emit('message-received', message);
                    }
                });

                // Emit typing stopped
                socket.in(chatId).emit('stop-typing');
            } catch (error) {
                socket.emit('message-error', error.message);
            }
        });

        // Handle typing status
        socket.on('typing', (chatId) => {
            socket.in(chatId).emit('typing', socket.userId);
        });

        socket.on('stop-typing', (chatId) => {
            socket.in(chatId).emit('stop-typing');
        });

        // Handle message read status
        socket.on('mark-read', async (messageId, userId) => {
            try {
                await Message.findByIdAndUpdate(messageId, {
                    $addToSet: { readBy: userId }
                });
                io.to(chatId).emit('message-read', { messageId, userId });
            } catch (error) {
                socket.emit('read-error', error.message);
            }
        });

        // Handle message pin/unpin
        socket.on('toggle-pin-message', async (messageId) => {
            try {
                const pinnedMessage = await pinMessage(messageId);
                io.to(pinnedMessage.chatId).emit('message-pinned', pinnedMessage);
            } catch (error) {
                socket.emit('pin-error', error.message);
            }
        });

        // Handle message deletion
        socket.on('delete-message', async (messageId, chatId) => {
            try {
                await deleteMessage(messageId);
                io.to(chatId).emit('message-deleted', messageId);
            } catch (error) {
                socket.emit('delete-error', error.message);
            }
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            activeUsers.delete(socket.userId);
            io.emit('user-offline', socket.userId);
            io.emit('active-users', Array.from(activeUsers.keys()));
            logger.info(`User disconnected: ${socket.userId}`);
        });
    });

    return io;
};

// Utility functions for external use
export const emitNotification = (userId, notification) => {
    io.to(userId).emit('notification', notification);
};

export const emitChatUpdate = (chatId, updateData) => {
    io.to(chatId).emit('chat-update', updateData);
};

// Real-time chat status updates
export const emitUserStatus = (userId, status) => {
    io.emit('user-status', { userId, status });
};

// Handle file upload progress
export const emitUploadProgress = (chatId, progress) => {
    io.to(chatId).emit('upload-progress', progress);
};

// Real-time error handling
export const emitError = (userId, error) => {
    io.to(userId).emit('error', error);
};
