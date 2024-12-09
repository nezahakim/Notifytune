import React, { useEffect, useState, useRef } from 'react';
import ChatServices from '../../services/ChatService';
import MessageActions from './MessageActions';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  user: string;
  profilePic: string;
  time: string;
}

interface LiveChatProps {
  roomId: string;
}

const texts: Message[] = [
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

const LiveChat: React.FC<LiveChatProps> = ({ roomId }) => {
  const userId = localStorage.getItem('user_id') || '';

  const [messages, setMessages] = useState<Message[]>([]);
  const chatServices = ChatServices.getInstance();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Load initial messages
    setMessages(texts);

    // Join the room when component mounts
    chatServices.joinRoom(roomId, "currentUserId").then((response) => {
      console.log("Room joined:", response);
    });

    // Subscribe to new messages
    const cleanup = chatServices.onMessage((data) => {
      console.log("Received message:", data);
      if (data?.type === 'pin' && data?.roomId === roomId) {
        const pinnedMsg = messages.find(m => m.id === data?.messageId);
        if (pinnedMsg) {
          setPinnedMessage(pinnedMsg);
          // Add pinned animation
          const element = document.getElementById(`message-${data.messageId}`);
          element?.classList.add('pinned-animation');
        }
      }

      if (data.chatId === roomId) {
        const newMessage: Message = {
          id: Date.now(),
          text: data.message,
          user: data.userId,
          profilePic: "/images/default-profile.jpg",
          time: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, newMessage]);
      }
    });

    return () => {
      cleanup(); // Cleanup subscription
    };
  }, [roomId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [pinnedMessage, setPinnedMessage] = useState<Message | null>(null);
  
  // Add long press handler
  const handleLongPress = (message: Message) => {
    setSelectedMessage(message);
  };

  const handlePin = async () => {
    if (selectedMessage) {
      const response = await chatServices.pinMessage(selectedMessage.id, roomId, "currentUserId");
      if (response.status === "success") {
        setPinnedMessage(selectedMessage);
      }
      setSelectedMessage(null);
    }
  };

  const handleDelete = async () => {
    if (selectedMessage) {
      const response = await chatServices.deleteMessage(selectedMessage.id, roomId, "currentUserId");
      if (response.status === "success") {
        setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
      }
      setSelectedMessage(null);
    }
  };


  return (
    <div className="flex flex-col h-full relative">
      {/* Pinned Message Banner */}
      <AnimatePresence>
        {pinnedMessage && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="sticky top-0 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 z-10"
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">📌</span>
              <div className="flex-1">
                <p className="text-sm font-medium">Pinned Message</p>
                <p className="text-sm text-gray-500">{pinnedMessage.text}</p>
              </div>
              <button
                onClick={() => setPinnedMessage(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col p-4 space-y-4 overflow-auto">
        {messages.map((message, id) => (
          <motion.div
          id={`message-${message.id}`}
          key={id}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start space-x-3 relative"
          onContextMenu={(e) => {
            e.preventDefault();
            handleLongPress(message);
          }}
          onTouchStart={() => {
            const timer = setTimeout(() => handleLongPress(message), 500);
            return () => clearTimeout(timer);
          }}
        >
            <div className="flex-shrink-0 w-8 h-8">
              <img
                src={message.profilePic}
                alt={`${message.user}'s profile`}
                className="w-full h-full rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {(message.id).toString() === userId ? 'Me': message.user} • {message.time}
              </span>
              <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-lg rounded-tl-none max-w-xs">
                {message.text}
              </div>
            </div>
          </motion.div>
        ))} 
        <div ref={messagesEndRef} />
      </div>

      {/* Message Actions */}
      {selectedMessage && (
        <MessageActions
          message={selectedMessage}
          onPin={handlePin}
          onDelete={handleDelete}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
};

export default LiveChat;
