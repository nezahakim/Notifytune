import { Chat, Message } from "../models/Chat.js";
// import  from "../models/Message.js";
import User from "../models/User.js";
import logger from "../utils/logger.js";

// Function to create a new chat
export const createChat = async (chatType, participants) => {
    try {
        const newChat = await Chat.create({ chatType, participants });
        return newChat;
    } catch (error) {
        logger.error("Error creating chat:", error);
        throw new Error("Failed to create chat.");
    }
};

// Function to get chats for a specific user
export const getUserChats = async (userId) => {
    try {
        const chats = await Chat.find({ participants: userId }).populate({
            path: 'participants',
            model: 'User',
            select: 'fullName avatar username'
        });

        const formattedChats = await Promise.all(
            chats.map(async (chat) => {
                const lastMessage = await Message.findOne({ chatId: chat._id }).sort({ createdAt: -1 });
                return {
                    id: chat.participants[0]._id != userId ? chat.participants[0]._id : chat.participants[1]._id,
                    chatId:  chat._id,
                    name: chat.participants[0]._id != userId ? chat.participants[0].fullName : chat.participants[1].fullName,
                    lastMessage: lastMessage.message || '',
                    time: lastMessage.createdAt || chat.createdAt,
                    unread: await Message.countDocuments({
                        chatId: chat._id,
                        userId: { $ne: userId },
                        readBy: { $nin: [userId] }
                    }),
                    online: false, // Replace with actual online status if available
                    avatar: chat.participants[0].avatar || '👤',
                    pinned: lastMessage.pinned || false,
                    muted: false, // Add mute option in Chat schema if needed
                    group: chat.chatType === 'group'
                };
            })
        );

        return formattedChats;
    } catch (error) {
        logger.error("Error fetching user chats:", error);
        throw new Error("Failed to retrieve chats.");
    }
};

export const getChatIdWithCheck = async (userId, currentUserId) => {


    try {
        const a = await User.find()
        // console.log(a)
        // First verify both user IDs exist
        const user = await User.findById(userId);
        if (!user) {
            return {
                status: false,
                message: 'User not found'
            };
        }

        // Find chat with both participants
        const chat = await Chat.findOne({
            participants: {
                $all: [userId, currentUserId]
            }
        }).populate('participants', 'fullName avatar username');

        // Prepare user data
        const userData = {
            userId: user._id,
            avatar: user.avatar || '😐',
            name: user.fullName,
            username: user.username,
            online: 'recently seen'
        };

        // Return appropriate response based on chat existence
        return {
            status: !!chat,
            chatId: chat ? chat._id : null,
            ...userData
        };

    } catch (error) {
        logger.error("Error checking users in chat:", error);
        throw new Error("Failed to verify users in chat.");
    }

}

// Function to send a text message in a chat
export const sendMessage = async (chatId, userId, text) => {
    try {
        const message = await Message.create({ chatId, userId, message: text });
        return message;
    } catch (error) {
        logger.error("Error sending message:", error);
        throw new Error("Failed to send message.");
    }
};

// Function to pin a message
export const pinMessage = async (msgId) => {
    try {
        const message = await Message.findByIdAndUpdate(msgId, { pinned: true }, { new: true });
        return message;
    } catch (error) {
        logger.error("Error pinning message:", error);
        throw new Error("Failed to pin message.");
    }
};

// Function to add a user to a chat
export const addUserToChat = async (chatId, userId) => {
    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $addToSet: { participants: userId } },
            { new: true }
        ).populate('participants');
        return chat;
    } catch (error) {
        logger.error("Error adding user to chat:", error);
        throw new Error("Failed to join chat.");
    }
};

// Function to remove a user from a chat
export const removeUserFromChat = async (chatId, userId) => {
    try {
        const chat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { participants: userId } },
            { new: true }
        );
        return chat;
    } catch (error) {
        logger.error("Error removing user from chat:", error);
        throw new Error("Failed to leave chat.");
    }
};

// Function to get all participants in a chat
export const getChatParticipants = async (chatId) => {
    try {
        const chat = await Chat.findById(chatId).populate('participants', 'fullName avatar username');
        return chat.participants || [];
    } catch (error) {
        logger.error("Error fetching chat participants:", error);
        throw new Error("Failed to list chat participants.");
    }
};

// Function to get all messages in a chat
export const getChatMessages = async (chatId) => {
    try {
        const messages = await Message.find({ chatId }).sort({ createdAt: -1 });
        return messages;
    } catch (error) {
        logger.error("Error fetching chat messages:", error);
        throw new Error("Failed to retrieve messages.");
    }
};

// Function to delete a message
export const deleteMessage = async (msgId) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(msgId);
        return deletedMessage;
    } catch (error) {
        logger.error("Error deleting message:", error);
        throw new Error("Failed to delete message.");
    }
};
