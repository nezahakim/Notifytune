import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Dice1, Gift, Gamepad } from 'lucide-react';

const LiveChatSendText: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
      setIsExpanded(false);
    }
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-2 rounded-lg transition-all duration-300">
      <div className="flex items-center space-x-2">
        <div className={`flex-grow transition-all duration-300 ${isExpanded ? 'w-full' : 'w-100vh'}`}>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onClick={handleInputClick}
            onKeyPress={handleKeyPress}
            placeholder="Send a message"
            className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {isExpanded ? (
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            <Send size={20} />
          </button>
        ) : (
          <>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <Dice1 size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <Gift size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <Gamepad size={20} />
            </button>
            <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <Mic size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LiveChatSendText;
