// interface Message {
//     id: number;
//     text: string;
//     user: string;
//     profilePic: string;
//     time: string;
// }

// interface MessageActionsProps {
//     message: Message;
//     onPin: () => void;
//     onDelete: () => void;
//     onClose: () => void;
//   }
  
//   const MessageActions: React.FC<MessageActionsProps> = ({ message, onPin, onDelete, onClose }) => {
//     return (
//       <div className="absolute bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-50">
//         <button 
//           onClick={onPin}
//           className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
//         >
//           Pin Message
//         </button>
//         <button 
//           onClick={onDelete}
//           className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
//         >
//           Delete Message
//         </button>
//       </div>
//     );
//   };
  
//   export default MessageActions;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    user: string;
    profilePic: string;
    time: string;
}

interface MessageActionsProps {
  message: Message;
  onPin: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({ message, onPin, onDelete, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        />
        
        {/* Action Sheet */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="absolute bottom-0 w-full bg-white dark:bg-gray-800 rounded-t-2xl"
        >
          <div className="p-2 flex justify-center">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>
          
          <div className="p-4 space-y-4">
            <button
              onClick={onPin}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-xl">📌</span>
              <span>Pin Message</span>
            </button>
            
            <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700" />
            
            <button
              onClick={onDelete}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
            >
              <span className="text-xl">🗑️</span>
              <span>Delete Message</span>
            </button>
          </div>
          
          <div className="p-4">
            <button
              onClick={onClose}
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MessageActions;
