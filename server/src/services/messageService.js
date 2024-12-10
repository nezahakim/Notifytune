import { Message, Chat } from '../models/Chat.js';

class MessageService {
  async saveMessage(chatId, userId, message) {
    try {
      const newMessage = await Message.create({
        chatId,
        userId,
        message
      });
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async deleteMessage(messageId) {
    try {
      await Message.findByIdAndUpdate(messageId, { deleted: true });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async pinMessage(messageId) {
    try {
      await Message.findByIdAndUpdate(messageId, { pinned: true });
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default new MessageService();
