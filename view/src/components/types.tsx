export interface ChatFace {
  chatId: number;
  id: any;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
  pinned: boolean;
  muted: boolean;
  group: boolean;
  archived?: boolean;
}

export interface LiveRoom {
  id: number;
  title: string;
  host: string;
  participants: number;
  tags: string[];
  isLive: boolean;
  thumbnail: string;
}
export interface LiveRoom {
  id: number;
  title: string;
  host: string;
  participants: number;
  tags: string[];
  isLive: boolean;
  thumbnail: string;
  description?: string;
  maxParticipants?: number;
  rules?: string;
}


export interface User{
  id: number,
    username: string,
    name: string,
    bio: string,
    followers: number,
    following: number,
    avatar: string,
}

export interface LiveRoom {
  id: number;
  title: string;
  host: string;
  participants: number;
  tags: string[];
  isLive: boolean;
  thumbnail: string;
}

export interface Participant {
  id: number;
  name: string;
  isHost: boolean;
  isSpeaking: boolean;
  color: string
}

export interface Message {
  _id: number;
  userId: any;
  message: string;
  createdAt: any;
  isGlobal: boolean;
}

// export interface Message {
//   id: number;
//   text: string;
//   sender: string;
//   timestamp: Date;
// }