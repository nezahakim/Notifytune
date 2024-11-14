// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LogIn } from 'lucide-react';

// const StartPage: React.FC = () => {
//   const navigate = useNavigate();

//   const handleContinueWithNotifyaccount = () => {
//     // Add authentication logic here
//     navigate('/home');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <img
//             src="/assets/Suggestion One.png"
//             alt="NotifyAccount. Logo"
//             className="mx-auto h-24 w-auto"
//           />
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
//             Welcome to NotifyAccount
//           </h2>
//           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//             Connect, collaborate, and stay notified
//           </p>
//         </div>
//         <div className="mt-8 space-y-6">
//           <button
//             onClick={handleContinueWithNotifyaccount}
//             className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//           >
//             <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//               <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
//             </span>
//             Continue with Notifyaccount
//           </button>
//           <div className="text-center">
//             <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
//               Create an account
//             </a>
//           </div>
//         </div>
//       </div>
//       <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
//         &copy; 2023 Notifycode Inc. All rights reserved.
//       </footer>
//     </div>
//   );
// };

// export default StartPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, ChevronRight, ChevronLeft, Bell, MessageCircle, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  { icon: <Bell size={24} />, title: "Instant Notifications", description: "Stay updated in real-time" },
  { icon: <MessageCircle size={24} />, title: "Seamless Messaging", description: "Connect with your team effortlessly" },
  { icon: <Users size={24} />, title: "Team Collaboration", description: "Work together, anywhere" },
];

const FeatureCarousel: React.FC = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-48 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentFeature}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <div className="text-blue-500 mb-2">{features[currentFeature].icon}</div>
          <h3 className="text-xl font-semibold mb-2">{features[currentFeature].title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{features[currentFeature].description}</p>
        </motion.div>
      </AnimatePresence>
      <button 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
        onClick={() => setCurrentFeature((prev) => (prev - 1 + features.length) % features.length)}
      >
        <ChevronLeft size={20} className="text-blue-500" />
      </button>
      <button 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md"
        onClick={() => setCurrentFeature((prev) => (prev + 1) % features.length)}
      >
        <ChevronRight size={20} className="text-blue-500" />
      </button>
    </div>
  );
};

const StartPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContinueWithNotifyaccount = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    navigate('/home');
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src="/assets/Suggestion One.png"
            alt="Notifycode Inc. Logo"
            className="mx-auto h-24 w-auto"
          />
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            Welcome to Notifycode
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400"
          >
            Elevate your team communication
          </motion.p>
        </div>

        <FeatureCarousel />

        <div className="mt-8 space-y-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinueWithNotifyaccount}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LogIn className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
            </span>
            {loading ? 'Logging in...' : 'Continue with Notifyaccount'}
          </motion.button>
          <div className="text-center">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300">
              Create an account
            </a>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; 2023 Notifycode Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default StartPage;
