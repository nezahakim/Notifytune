import React, { useState, useEffect } from 'react';
import { Edit, MoreVertical, Search, X,MoveUp, MoveDown } from 'lucide-react';
import MinTabs from '../components/MinTabs';
import ChatItem from '../components/ChatItem';
import { ChatFace } from '../components/types';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

const ChatHome: React.FC = () => {
  const [chats, setChats] = useState<ChatFace[]>([
    { id: 1, chatId: 1, name: "Alice Smith", lastMessage: "See you tomorrow!", time: "10:30 AM", unread: 2, online: true, avatar: "👩‍🦰", pinned: true, muted: false, group: false },
    { id: 2, chatId: 1,name: "Bob Johnson", lastMessage: "Thanks for the info!", time: "Yesterday", unread: 0, online: false, avatar: "👨‍🦲", pinned: false, muted: true, group: false },
    { id: 3,chatId: 1, name: "Work Group", lastMessage: "Meeting at 3 PM", time: "Yesterday", unread: 5, online: true, avatar: "👥", pinned: true, muted: false, group: true },
    { id: 4, chatId: 1,name: "Charlie Brown", lastMessage: "How's the project going?", time: "Tuesday", unread: 0, online: true, avatar: "👦", pinned: false, muted: false, group: false },
    { id: 5,chatId: 1, name: "Diana Prince", lastMessage: "Sent a photo", time: "Monday", unread: 1, online: false, avatar: "👸", pinned: false, muted: false, group: false },
  ]);


  useEffect(()=>{

    const data = async () =>{
      const userId = localStorage.getItem('user_id')
      const a = await Api.getChats(userId)
      console.log(a)
      setChats(a)
    }

    data()
  },[])


  const navigate = useNavigate()

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showArchived, setShowArchived] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeCategory === "All" || 
     (activeCategory === "Personal" && !chat.group) ||
     (activeCategory === "Groups" && chat.group) ||
     (activeCategory === "Muted" && chat.muted)) &&
    (showArchived ? chat.archived : !chat.archived)
  );

  const sortedChats = filteredChats.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.time).getTime() - new Date(a.time).getTime();
  });

  const tabs = [
    { id: "All", label: "All" },
    { id: "Personal", label: "Personal" },
    { id: "Groups", label: "Groups" },
    { id: "Muted", label: "Muted" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveCategory(tabId);
  };

  const handleChatItemClick = (userId: number, chatId: any) => {
    // console.log(`Chat item clicked: ${chatId}`);
    navigate('/c/' + userId + '/' + chatId);
  };

  const handleNewChat = () => {
    console.log("New chat button clicked");
  };

  const handleMoreOptions = () => {
    console.log("More options button clicked");
  };

  return (
    <>
      <header className={`sticky top-0 z-10 bg-white dark:bg-gray-900 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Chats</h1>
            <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">{chats.length}</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" onClick={handleNewChat}>
              <Edit size={24} />
            </button>
            <button className="p-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full" onClick={handleMoreOptions}>
              <MoreVertical size={24} />
            </button>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search chats" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {searchQuery && (
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" onClick={() => setSearchQuery("")}>
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        <MinTabs tabs={tabs} onTabChange={handleTabChange} />
      </header>

      <div className="flex-grow overflow-y-auto">
        {sortedChats.map((chat) => (
          <div key={chat.id} onClick={() => handleChatItemClick(chat.id, chat?.chatId)}>
            <ChatItem chat={chat} />
          </div>
        ))}
      </div>

      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setShowArchived(!showArchived)}
          className="flex items-center text-blue-500 dark:text-blue-400"
        >
          {showArchived ? <MoveDown size={20} /> : <MoveUp size={20} />}
          <span className="ml-2">{showArchived ? 'Hide Archived' : 'Show Archived'}</span>
        </button>
      </div>    
    </>
  );
};


export default ChatHome;