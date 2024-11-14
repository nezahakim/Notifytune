// // import React from 'react';
// // import { LiveRoom } from '../components/types';

// // interface RoomItemProps {
// //   room: LiveRoom;
// // }

// // const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
// //   return (
// //     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out">
// //       <div className="p-4">
// //         <div className="flex items-center mb-4">
// //           <div className="w-16 h-16 flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-3xl font-bold mr-4">
// //             {room.thumbnail}
// //           </div>
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{room.title}</h3>
// //             <p className="text-sm text-gray-600 dark:text-gray-300">Hosted by {room.host}</p>
// //           </div>
// //         </div>
// //         <div className="flex items-center justify-between mb-4">
// //           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
// //             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
// //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
// //             </svg>
// //             {room.participants}
// //           </div>
// //           <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
// //             room.isLive 
// //               ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
// //               : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
// //           }`}>
// //             {room.isLive ? 'LIVE' : 'UPCOMING'}
// //           </span>
// //         </div>
// //         <div className="flex flex-wrap gap-2">
// //           {room.tags.map((tag, index) => (
// //             <span key={index} className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
// //               #{tag}
// //             </span>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RoomItem;


// import React from 'react';
// import { LiveRoom } from '../components/types';

// interface RoomItemProps {
//   room: LiveRoom;
// }

// const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
//       <div className="relative">
//         <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500"></div>
//         <div className="absolute top-4 left-4">
//           <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
//             room.isLive 
//               ? 'bg-green-500 text-white' 
//               : 'bg-yellow-400 text-gray-800'
//           }`}>
//             {room.isLive ? 'LIVE' : 'UPCOMING'}
//           </span>
//         </div>
//         <div className="absolute -bottom-6 left-4">
//           <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-3xl shadow-md">
//             {room.thumbnail}
//           </div>
//         </div>
//       </div>
//       <div className="p-4 pt-8">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{room.title}</h3>
//         <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Hosted by {room.host}</p>
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//             {room.participants} participants
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {room.tags.map((tag, index) => (
//             <span key={index} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
//               #{tag}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 flex justify-end">
//         <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-sm font-semibold transition-colors duration-300">
//           Join Room
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RoomItem;

import React from 'react';
import { LiveRoom } from '../components/types';

interface RoomItemProps {
  room: LiveRoom;
}

const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="flex items-center p-3 bg-gradient-to-r from-purple-400 to-pink-500">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-xl sm:text-2xl shadow-md mr-3 flex-shrink-0">
          {room.thumbnail}
        </div>
        <div className="flex-grow min-w-0">
          <h3 className="text-sm sm:text-lg font-bold text-white truncate">{room.title}</h3>
          <p className="text-xs text-white opacity-80 truncate">Hosted by {room.host}</p>
        </div>
        <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
          room.isLive 
            ? 'bg-green-500 text-white' 
            : 'bg-yellow-400 text-gray-800'
        }`}>
          {room.isLive ? 'LIVE' : 'UPCOMING'}
        </span>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-2 flex-wrap">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mr-2">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {room.participants}
          </div>
          <button className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded-full text-xs font-semibold transition-colors duration-300">
            Join
          </button>
        </div>
        <div className="flex flex-wrap gap-1">
          {room.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
              #{tag}
            </span>
          ))}
          {room.tags.length > 3 && (
            <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
              +{room.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
