import React from 'react';

interface Message {
  id: number;
  text: string;
  user: string;
  profilePic: string;
  time: string;
}

const messages: Message[] = [
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 1,
    text: "Hello, how are you?",
    user: "Alice",
    profilePic: "/images/alice-profile.jpg",
    time: "10:30 AM"
  },
  {
    id: 2,
    text: "I'm good, thanks! How about you?",
    user: "Bob",
    profilePic: "/images/bob-profile.jpg",
    time: "10:31 AM"
  },
  // More messages...
];

const LiveChat: React.FC = () => {
  return (
    <div className="flex flex-col-reverse p-4 space-y-reverse space-y-4 overflow-auto h-full">
      {messages.map((message) => (
        <div key={message.id} className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8">
            <img
              src={message.profilePic}
              alt={`${message.user}'s profile`}
              className="w-full h-full rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              {message.user} • {message.time}
            </span>
            <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-lg rounded-tl-none max-w-xs">
              {message.text}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LiveChat;
