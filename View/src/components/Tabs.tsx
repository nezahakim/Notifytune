import { MessageSquare, MicIcon, Camera, User2, Settings } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

function Tabs() {
  return (
    <footer className="flex justify-around items-center p-2 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <FooterButton icon={<MessageSquare size={20} />} label="Chats" active />
        <FooterButton icon={<MicIcon size={20} />} label="Explore" />
        <FooterButton icon={<User2 size={20} />} label="Me" />
    </footer>
  )
}
const To = (label: string) => {
    if(label === "Chats"){
        return '/home'
    }else if(label === "Explore"){
        return '/explore-live'
    }else if(label === "Me") {
        return '/profile'
    }
}

const FooterButton: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
    <Link to={To(label)} className={`flex flex-col items-center ${active ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
);

  
export default Tabs