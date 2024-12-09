import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
   chatType: { type: String, required: true },  // e.g., 'group', 'private'
   participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // Array of User IDs
   ],
   createdAt: { type: Date, default: Date.now }
});

// Define the Message schema
const MessageSchema = new mongoose.Schema({
   chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   message: { type: String, required: true },
   pinned: { type: Boolean, default: false },
   createdAt: { type: Date, default: Date.now }
});


const Chat = mongoose.model("Chat", ChatSchema);
const Message = mongoose.model("Message", MessageSchema);

// Export models
export { Chat, Message };