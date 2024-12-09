import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange: (tabId: string) => void;
}

const MinTabs: React.FC<TabsProps> = ({ tabs, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <nav className="flex justify-around p-2 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 focus:outline-none
            ${activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'text-gray-500 hover:bg-gray-100'
            }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default MinTabs;