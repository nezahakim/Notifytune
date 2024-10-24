import React, { useState, useRef, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Send, Paperclip, Mic, Smile, MoreVertical, ArrowLeft, Phone, Video } from 'lucide-react';
import { ChatFace, Message } from '../components/types';


const ChatRoom: React.FC = () => {
  const [chat, setChat] = useState<ChatFace>()
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chatId } = useParams()
  console.log(chatId)

  const navigate =  useNavigate()

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), content: message, sender: 'user', timestamp: new Date(), isGlobal:false}]);
      setMessage('');
    }
  };

  const onBack = () =>{
    navigate('/home')
  }
  
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={onBack} className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src={chat?.avatar} alt={chat?.name} className="w-10 h-10 rounded-full" />
                {chat?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{chat?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{chat?.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <Phone size={24} />
            </button>
            {/* <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <Video size={24} />
            </button> */}
            <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}>
              <p>{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center space-x-2">
          {/* <button className="text-gray-500 hover:text-blue-500">
            <Paperclip size={24} />
          </button> */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-500 hover:text-blue-500">
            <Smile size={24} />
          </button>
          {message ? (
            <button onClick={handleSend} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
              <Send size={24} />
            </button>
          ) : (
            <button className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
              <Mic size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
