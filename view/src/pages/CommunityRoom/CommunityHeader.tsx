import React from 'react';
import { Mic, Users, MinusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LiveHeaderProps {
  isScrolled: boolean;
}

const LiveHeader: React.FC<LiveHeaderProps> = ({isScrolled }) => {

    const navigate = useNavigate()
    const onBack = () => {
        navigate('/home')
    }

  return (
    <header className={`border-gray-200 border-b-2 bg-gradient-to-r sticky top-0 z-10 bg-white dark:bg-gray-900 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <div className="flex justify-between items-center px-4 py-3">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center px-3 py-1 rounded-full text-white text-sm font-bold shadow-md">
              <Mic className="mr-1" size={14} />
              Tech Enthusiasm
            </div>
          </div>
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`/vite.svg`}
                  alt={`Profile ${i}`}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-sm"
                />
              ))}
            </div>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-800 dark:text-white text-xs font-bold shadow-md ml-2">
              <Users className="mr-1" size={12} />
              20
            </div>
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium ml-2">
              online...
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-full hover:bg-red-600 transition duration-300 shadow-md">
            Leave
          </button>
          <button
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition duration-300"
            onClick={onBack}
          >
            <MinusCircle size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default LiveHeader;
