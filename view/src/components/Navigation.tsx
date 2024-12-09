import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mic, User, Menu, X } from 'lucide-react';

const FloatingNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setIsVisible(currentScrollY <= lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const user_id = localStorage.getItem('user_id')

  const navItems = [
    { icon: <Home size={24} />, label: 'Home', path: '/home' },
    { icon: <Mic size={24} />, label: 'Explore Live', path: '/explore' },
    { icon: <User size={24} />, label: 'Profile', path: '/profile/'+user_id },
  ];

  return (
    <div
      className={`fixed bottom-4 right-4 transition-all duration-300 ${
        isVisible ? 'translate-y-[-12]' : 'translate-y-full'
      }`}
    >
      <div className="relative">
        {isExpanded && (
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 mb-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-md transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsExpanded(false)}
              >
                <div className="bg-blue-50 dark:bg-blue-800 p-2 rounded-full">
                  {item.icon}
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center space-x-2">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`bg-white dark:bg-gray-900 rounded-full shadow-lg p-3 transition-all duration-200 ${
                location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-300 ring-2 ring-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
            </Link>
          ))}
          {/* <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-blue-500 text-white rounded-full shadow-lg p-3 hover:bg-blue-600 transition-colors duration-200"
          >
            {isExpanded ? <X size={24} /> : <Menu size={24} />}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default FloatingNavigation;
