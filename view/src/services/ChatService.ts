import { io, Socket } from 'socket.io-client';

interface MessageData {
  chatId: string;
  userId: string;
  message: string;
}

interface SocketResponse {
  status: string | boolean;
  message: string;
  type: any;
  messageId: any;
}

class ChatServices {
  private static instance: ChatServices;
  private socket: Socket;
  private messageCallbacks: ((data: any) => void)[] = [];

  private constructor() {
    this.socket = io('http://localhost:3000');
    this.initializeSocket();
  }

  static getInstance(): ChatServices {
    if (!ChatServices.instance) {
      ChatServices.instance = new ChatServices();
    }
    return ChatServices.instance;
  }

  private initializeSocket() {
    this.socket.on('connect', () => {
      console.log('Connected to the Server with id: ' + this.socket.id);
    });

    this.socket.on('receive-message', (data: any) => {
      console.log(data)
      this.messageCallbacks.forEach(callback => callback(data));
    });

    this.socket.on('message-deleted', (data: any) => {
      this.messageCallbacks.forEach(callback => callback({
        type: 'delete',
        ...data
      }));
    });

    this.socket.on('message-pinned', (data: any) => {
      this.messageCallbacks.forEach(callback => callback({
        type: 'pin',
        ...data
      }));
    });

    this.socket.on('user-left', (data: any) => {
      this.messageCallbacks.forEach(callback => callback({
        type: 'user-left',
        ...data
      }));
    });

  }

  sendMessage(chatId: string, userId: string, message: string): Promise<SocketResponse> {
    return new Promise((resolve) => {
      const data: MessageData = { chatId, userId, message };
      this.socket.emit('send-message', data, (response: SocketResponse) => {
        resolve(response);
      });
    });
  }

  joinRoom(roomId: string, userId: string): Promise<SocketResponse> {
    return new Promise((resolve) => {
      const data = { roomId, userId };
      this.socket.emit('join-room', data, (response: SocketResponse) => {
        resolve(response);
      });
    });
  }
  
  onMessage(callback: (data: MessageData) => void) {
    this.messageCallbacks.push(callback);
    return () => {
      this.messageCallbacks = this.messageCallbacks.filter(cb => cb !== callback);
    };
  }

  deleteMessage(messageId: number, roomId: string, userId: string): Promise<SocketResponse> {
    return new Promise((resolve) => {
      this.socket.emit('delete-message', { messageId, roomId, userId }, (response: any) => {
        resolve(response);
      });
    });
  }

  pinMessage(messageId: number, roomId: string, userId: string): Promise<SocketResponse> {
    return new Promise((resolve) => {
      this.socket.emit('pin-message', { messageId, roomId, userId }, (response: any) => {
        resolve(response);
      });
    });
  }

  leaveRoom(roomId: string, userId: string) {
    return new Promise((resolve) => {
      this.socket.emit('leave-room', { roomId, userId }, (response: any) => {
        resolve(response);
      });
    });
  }

  startVoiceStream(stream: MediaStream) {
    this.socket.emit('voice-stream-started');
    // Handle WebRTC connection setup here
  }

  stopVoiceStream() {
    this.socket.emit('voice-stream-stopped');
  }

  // Make socket public or create a getter
  get Socket() {
    return this.socket;
  }

}

export default ChatServices;