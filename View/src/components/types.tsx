// export interface ChatFace {
//     id: number;
//     name: string;
//     lastMessage: string;
//     time: string;
//     unread: number;
//     online: boolean;
//     avatar: string;
//     pinned: boolean;
//     muted: boolean;
//     group: boolean;
//     archived?: boolean;
//   }

  // types.ts

export interface ChatFace {
  id: number;
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
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
  isGlobal: boolean;
}

// export interface Message {
//   id: number;
//   text: string;
//   sender: string;
//   timestamp: Date;
// }