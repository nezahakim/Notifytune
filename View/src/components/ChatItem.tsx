import React from 'react';
import { ChatFace } from './types';

interface ChatItemProps {
  chat: ChatFace;
}

const ChatItem: React.FC<ChatItemProps> = ({ chat }) => {
  return (
    <div className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${chat.pinned ? 'bg-yellow-50 dark:bg-yellow-900/20' : ''}`}>
      <div className="relative mr-4">
        <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center text-white text-xl font-semibold ${chat.online ? 'bg-green-500' : 'bg-blue-500'}`}>
          {chat.avatar}
        </div>
        {chat.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
        )}
      </div>
      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h2 className="text-lg font-semibold truncate">{chat.name}</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {chat.pinned && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v2H5V5zM2 9h16v9a2 2 0 01-2 2H4a2 2 0 01-2-2V9z" />
              </svg>
            )}
            {chat.muted && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
            <span>{chat.time}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 truncate max-w-[70%]">{chat.lastMessage}</p>
          {chat.unread > 0 && (
            <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">{chat.unread}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;