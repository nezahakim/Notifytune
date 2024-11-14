import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  message: string;
}

const ChatBubble: React.FC<Props> = ({ message }) => {
  return (
    <motion.div
      className="absolute bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-2 text-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
      }}
    >
      {message}
    </motion.div>
  );
};

export default ChatBubble;
