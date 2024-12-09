import express from 'express';
import { body, param, validationResult } from 'express-validator';
import {
  createChat,
  getUserChats,
  sendMessage,
  pinMessage,
  addUserToChat,
  removeUserFromChat,
  getChatParticipants,
  getChatMessages,
  deleteMessage,getChatIdWithCheck
} from '../controllers/chatController.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Middleware for error handling
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.error(`Validation Error: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to create a new chat
router.post(
  '/createChat',
  body('type').isString().notEmpty(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { type, participants } = req.body;
      const newChat = await createChat(type, participants);
      if (newChat) {
        logger.info(`New chat created with ID: ${newChat.id}`);
        res.status(201).json(newChat);
      } else {
        throw new Error('Failed to create chat.');
      }
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Server error while creating chat.' });
    }
  }
);

// Route to get user chats
router.get('/getChats/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const userChats = await getUserChats(userId);
      res.status(200).json(userChats);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to retrieve user chats.' });
    }
  }
);

// Route to send a text message
router.post('/sendText', async (req, res) => {
    try {
      const { chatId, userId, text } = req.body;
      const newMessage = await sendMessage(chatId, userId, text);
      res.status(201).json(newMessage);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to send text message.' });
    }
  }
);

// Route to pin a text message
router.post(
  '/pinText',
  body('msgId').isString().notEmpty(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { msgId } = req.body;
      const pinnedMessage = await pinMessage(msgId);
      res.status(200).json(pinnedMessage);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to pin text message.' });
    }
  }
);

// Route to join a chat
router.post('/joinChat/:chatId/:userId',
  [param('chatId').isString().notEmpty(), param('userId').isString().notEmpty()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { chatId, userId } = req.params;
      const joinChatResult = await addUserToChat(chatId, userId);
      res.status(200).json(joinChatResult);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to join chat.' });
    }
  }
);

// Route to leave a chat
router.delete(
  '/leaveChat/:chatId/:userId',
  [param('chatId').isString().notEmpty(), param('userId').isString().notEmpty()],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { chatId, userId } = req.params;
      const leaveChatResult = await removeUserFromChat(chatId, userId);
      res.status(200).json(leaveChatResult);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to leave chat.' });
    }
  }
);

// Route to get chat participants
router.get(
  '/chatParticipants/:chatId',
  param('chatId').isString().notEmpty(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { chatId } = req.params;
      const participants = await getChatParticipants(chatId);
      res.status(200).json(participants);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to retrieve chat participants.' });
    }
  }
);

router.post('/getChatIdWithCheck', async (req, res)=>{
   
    try{
        const {userId, currentUserId} = req.body
        const get_ChatIdWithCheck = await getChatIdWithCheck(userId, currentUserId);
        res.status(200).json(get_ChatIdWithCheck)
    }catch(error){
        logger.error(error.message);
        res.status(500).json({ error: 'Failed to check chat.' });
    }

})

// Route to get chat messages
router.get(
  '/chatMessages/:chatId',
  param('chatId').isString().notEmpty(),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { chatId } = req.params;
      const messages = await getChatMessages(chatId);
      res.status(200).json(messages);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to retrieve chat messages.' });
    }
  }
);

// Route to delete a text message
router.delete(
  '/deleteText/:chatId/:msgId',
  [
    param('chatId').isString().notEmpty(),
    param('msgId').isString().notEmpty(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { chatId, msgId } = req.params;
      const deleteResult = await deleteMessage(chatId, msgId);
      res.status(200).json(deleteResult);
    } catch (error) {
      logger.error(error.message);
      res.status(500).json({ error: 'Failed to delete text message.' });
    }
  }
);

export default router;
