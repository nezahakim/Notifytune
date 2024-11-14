import { io, Socket } from 'socket.io-client';
import { EventEmitter, type EventEmitter as EventEmitterType } from 'events';

interface Message {
  _id: string;
  chatId: string;
  userId: string;
  message: string;
  pinned: boolean;
  createdAt: string;
  user: {
    username: string;
    profilePicture: string;
  };
}

interface ChatEvents {
  connected: () => void;
  newMessage: (message: Message) => void;
  messageDeleted: (messageId: string) => void;
  messagePinned: (message: Message) => void;
  userJoinedChat: (data: { user: any; chatId: string }) => void;
  userLeftChat: (data: { user: any; chatId: string }) => void;
  error: (error: { message: string }) => void;
}

class ChatService {
  private socket: Socket;
  private eventEmitter: EventEmitterType;

  constructor(token: string) {
    this.eventEmitter = new EventEmitter();
    this.socket = io('http://localhost:3000', {
      auth: { token }
    });
    this.setupListeners();
  }

  private setupListeners(): void {
    this.socket.on('connect', () => {
      this.eventEmitter.emit('connected');
    });

    this.socket.on('newMessage', (message: Message) => {
      this.eventEmitter.emit('newMessage', message);
    });

    this.socket.on('getChats', (userId: any)=>{
      this.eventEmitter.emit('getChats', userId)
    })

    this.socket.on('messageDeleted', (data: { messageId: string }) => {
      this.eventEmitter.emit('messageDeleted', data.messageId);
    });

    this.socket.on('messagePinned', (message: Message) => {
      this.eventEmitter.emit('messagePinned', message);
    });

    this.socket.on('userJoinedChat', (data: { user: any; chatId: string }) => {
      this.eventEmitter.emit('userJoinedChat', data);
    });

    this.socket.on('userLeftChat', (data: { user: any; chatId: string }) => {
      this.eventEmitter.emit('userLeftChat', data);
    });

    this.socket.on('error', (error: { message: string }) => {
      this.eventEmitter.emit('error', error);
    });
  }

  on<K extends keyof ChatEvents>(event: K, listener: ChatEvents[K]): void {
    this.eventEmitter.on(event, listener);
  }

  off<K extends keyof ChatEvents>(event: K, listener: ChatEvents[K]): void {
    this.eventEmitter.off(event, listener);
  }

  getAllMessages(chatId: string): Promise<Message[]> {
    return new Promise((resolve) => {
      this.socket.emit('getAllMessages', { chatId });
      this.socket.once('getAllMessages', (messages: Message[]) => {
        resolve(messages);
      });
    });
  }

  sendMessage(chatId: string, message: string): void {
    this.socket.emit('sendMessage', { chatId, message });
  }

  deleteMessage(chatId: string, messageId: string): void {
    this.socket.emit('deleteMessage', { chatId, messageId });
  }

  pinMessage(messageId: string): void {
    this.socket.emit('pinMessage', { messageId });
  }

  joinChat(chatId: string): void {
    this.socket.emit('joinChat', { chatId });
  }

  leaveChat(chatId: string): void {
    this.socket.emit('leaveChat', { chatId });
  }

  disconnect(): void {
    this.socket.disconnect();
  }
}

export default ChatService;