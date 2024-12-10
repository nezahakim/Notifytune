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

interface Participant {
  roomId: string;
  userId: string;
  role:[];
  isOnStage: Boolean;
  isSpeaking:Boolean;
}
// const ApiIO = 'http://localhost:3000'
const ApiIO = 'https://reimagined-eureka-r4g64xprrrrpf4g6-3000.app.github.dev';

class ChatServices {
  private static instance: ChatServices;
  private socket: Socket;
  private messageCallbacks: ((data: any) => void)[] = [];

  private constructor() {
    this.socket = io(ApiIO);
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

  sendMessage(data: any): Promise<SocketResponse> {
    return new Promise((resolve) => {
      this.socket.emit('send-message', data, (response: SocketResponse) => {
        resolve(response);
      });
    });
  }

  joinRoom(data: any): Promise<SocketResponse> {
    return new Promise((resolve) => {
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

  deleteMessage(data: any): Promise<SocketResponse> {
    return new Promise((resolve) => {
      this.socket.emit('delete-message',data, (response: any) => {
        resolve(response);
      });
    });
  }

  pinMessage(data: any): Promise<SocketResponse> {
    return new Promise((resolve) => {
      this.socket.emit('pin-message', data, (response: any) => {
        resolve(response);
      });
    });
  }

  leaveRoom(data: any) {
    return new Promise((resolve) => {
      this.socket.emit('leave-room', data, (response: any) => {
        resolve(response);
      });
    });
  }

  getRoomParticipants(data: any): Promise<Participant[]> {
    return new Promise((resolve) => {
      this.socket.emit('get-room-participants', data, (response: any) => {
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