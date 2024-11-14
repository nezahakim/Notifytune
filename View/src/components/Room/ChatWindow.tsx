import React from 'react';
import { Message } from '../types';

const ChatWindow: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="flex-grow overflow-y-auto">
      {messages.map((message) => (
        <div key={message.id} className="mb-2">
          <span className="font-semibold">{message.sender}: </span>
          <span>{message.content}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
