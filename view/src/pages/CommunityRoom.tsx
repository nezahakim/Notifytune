import React, { useState, useEffect } from 'react';
// import { Mic, Users, Plus, Minus, Send, Gift, Gamepad, Search } from 'lucide-react';
import LiveHeader from './CommunityRoom/CommunityHeader';
import LiveChat from './CommunityRoom/CommunityChat';
import LiveChatSendText from './CommunityRoom/ChatSendText';



const CommunityRoom: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col bg-white dark:bg-gray-900 overflow-hidden z-50">
      <LiveHeader isScrolled={isScrolled} />

      <div className="flex-1 flex overflow-hidden mt-0 relative z-9">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                <LiveChat />
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 w-full border-t border-gray-200 dark:border-gray-700">
            <LiveChatSendText />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityRoom;
