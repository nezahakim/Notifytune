import jwt from "jsonwebtoken";
import User  from "../models/User.js";
import { Chat, Message } from "../models/Chat.js";
import  logger  from "../utils/logger.js";

const setupChatSocketIO = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication required"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) throw new Error("User not found");
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Authentication failed"));
    }
  });

  io.on("connection", (socket) => {
    logger.info(`User connected: ${socket.user._id}`);
    joinUserRooms(socket);

    socket.on("listAllChats", async (data) => {
      try {
        const { chatId } = data;
        const chat = await Chat.findById(chatId)
          .populate('participants', 'username profilePicture fullName');
        
        if (!chat.participants.some(p => p._id.equals(socket.user._id))) {
          return socket.emit("error", { message: "Access denied" });
        }

        const messages = await Message.find({ chatId })
          .populate('userId', 'username profilePicture fullName')
          .sort({ createdAt: 1 })
          .limit(50);

        io.to(socket.id).emit("ListAllChats", messages);
      } catch (error) {
        logger.error("Error fetching chats:", error);
        socket.emit("error", { message: "Failed to fetch chats" });
      }
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { chatId, message } = data;
        const chat = await Chat.findById(chatId);
        
        if (!chat.participants.includes(socket.user._id)) {
          return socket.emit("error", { message: "Not a chat participant" });
        }

        const newMessage = await Message.create({
          chatId,
          userId: socket.user._id,
          message
        });

        const populatedMessage = await Message.findById(newMessage._id)
          .populate('userId', 'username profilePicture fullName');

        io.to(chatId).emit("newMessage", populatedMessage);
      } catch (error) {
        logger.error("Message send error:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("deleteMessage", async (data) => {
      try {
        const { chatId, messageId } = data;
        const message = await Message.findById(messageId);
        
        if (!message || !message.userId.equals(socket.user._id)) {
          return socket.emit("error", { message: "Cannot delete message" });
        }

        await Message.findByIdAndDelete(messageId);
        io.to(chatId).emit("messageDeleted", { messageId });
      } catch (error) {
        logger.error("Message deletion error:", error);
        socket.emit("error", { message: "Failed to delete message" });
      }
    });

    socket.on("pinMessage", async (data) => {
      try {
        const { chatId, messageId } = data;
        const message = await Message.findById(messageId);
        
        if (!message) {
          return socket.emit("error", { message: "Message not found" });
        }

        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          { pinned: true },
          { new: true }
        ).populate('userId', 'username profilePicture fullName');

        io.to(chatId).emit("messagePinned", updatedMessage);
      } catch (error) {
        logger.error("Message pin error:", error);
        socket.emit("error", { message: "Failed to pin message" });
      }
    });

    socket.on("disconnect", () => {
      logger.info(`User disconnected: ${socket.user._id}`);
    });
  });
};

const joinUserRooms = async (socket) => {
  try {
    const chats = await Chat.find({
      participants: socket.user._id
    });
    
    chats.forEach(chat => {
      socket.join(chat._id.toString());
    });
  } catch (error) {
    logger.error("Room joining error:", error);ss
  }
};

export default setupChatSocketIO;
