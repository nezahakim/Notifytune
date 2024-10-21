import React, { useState, useEffect } from 'react';
import Tabs from '../components/MinTabs';
import RoomItem from '../components/RoomItem';
import { LiveRoom } from '../components/types';

const ExploreLiveRooms: React.FC = () => {
  const [rooms, setRooms] = useState<LiveRoom[]>([
    { id: 1, title: "Music Jam Session", host: "DJ Harmony", participants: 150, tags: ["music", "live", "jam"], isLive: true, thumbnail: "🎵" },
    { id: 2, title: "Tech Talk: AI Revolution", host: "TechGuru", participants: 75, tags: ["tech", "AI", "future"], isLive: true, thumbnail: "🤖" },
    { id: 3, title: "Cooking Masterclass", host: "Chef Delicious", participants: 100, tags: ["cooking", "food", "recipes"], isLive: false, thumbnail: "👨‍🍳" },
    { id: 4, title: "Fitness Challenge", host: "FitnessPro", participants: 200, tags: ["fitness", "workout", "health"], isLive: true, thumbnail: "💪" },
    { id: 5, title: "Book Club Discussion", host: "Bookworm", participants: 50, tags: ["books", "literature", "discussion"], isLive: false, thumbnail: "📚" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [trendingTags, setTrendingTags] = useState(["music", "tech", "cooking", "fitness", "books"]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredRooms = rooms.filter(room => 
    (room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     room.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) &&
    (activeCategory === "All" || 
     (activeCategory === "Live" && room.isLive) ||
     (activeCategory === "Upcoming" && !room.isLive))
  );

  const sortedRooms = filteredRooms.sort((a, b) => b.participants - a.participants);

  const tabs = [
    { id: "All", label: "All" },
    { id: "Live", label: "Live Now" },
    { id: "Upcoming", label: "Upcoming" },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveCategory(tabId);
  };

  const handleRoomItemClick = (roomId: number) => {
    console.log(`Joining room: ${roomId}`);
  };

  const handleCreateRoom = () => {
    console.log("Create new room button clicked");
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <header className={`sticky top-0 z-10 bg-white dark:bg-gray-900 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Live Rooms</h1>
          <button
            className="p-2 rounded-full text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900 transition-colors duration-300"
            aria-label="Create room"
            onClick={handleCreateRoom}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search rooms or tags" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button 
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setSearchQuery("")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trending Tags</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <button 
                key={index} 
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors duration-300"
                onClick={() => setSearchQuery(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <Tabs tabs={tabs} onTabChange={handleTabChange} />

        {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedRooms.map((room) => (
            <div key={room.id} onClick={() => handleRoomItemClick(room.id)}>
              <RoomItem room={room} />
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {sortedRooms.map((room) => (
    <div key={room.id} onClick={() => handleRoomItemClick(room.id)}>
      <RoomItem room={room} />
    </div>
  ))}
</div>

      </main>
    </div>
  );
};

export default ExploreLiveRooms;
