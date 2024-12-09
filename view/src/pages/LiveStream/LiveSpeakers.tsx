// import React, { useState } from 'react';
// import { UserPlus, Plus, Mic } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';

// interface Speaker {
//   id: number;
//   name: string;
//   isCreator: boolean;
//   profilePic: string;
// }

// const speakers: Speaker[] = [
//   { id: 1, name: "Alice", isCreator: true, profilePic: "/vite.svg" },
//   { id: 2, name: "Bob", isCreator: false, profilePic: "/vite.svg" },
//   { id: 3, name: "Charlie", isCreator: false, profilePic: "/vite.svg" },
//   { id: 4, name: "David", isCreator: false, profilePic: "/vite.svg" },
//   { id: 5, name: "Eve", isCreator: false, profilePic: "/vite.svg" },
// ];

// const LiveSpeakers: React.FC = () => {
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [showAllSpeakers, setShowAllSpeakers] = useState(false);

//   const toggleFollow = () => setIsFollowing(!isFollowing);
//   const creator = speakers.find((speaker) => speaker.isCreator);
//   const nonCreators = speakers.filter((speaker) => !speaker.isCreator);

//   return (
//     <div className="flex flex-col items-center space-y-2 p-2">
//       {/* Creator */}
//       <motion.div
//         className="relative"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <img
//           src={creator?.profilePic}
//           alt={`Creator's profile`}
//           className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
//         />
//         <motion.button
//           className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
//             isFollowing ? 'bg-gray-500' : 'bg-blue-500'
//           }`}
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={toggleFollow}
//         >
//           {isFollowing ? <UserPlus size={12} /> : <Plus size={12} />}
//         </motion.button>
//       </motion.div>

//       {/* Spacer */}
//       <div className="h-1"></div>

//       {/* Non-Creators */}
//       <div className="shadow-sm bg-gray-100 dark:bg-gray-800 py-2 px-1 rounded-full flex flex-col items-center space-y-2">
//         <AnimatePresence>
//           {nonCreators
//             .slice(0, showAllSpeakers ? undefined : 3)
//             .map((speaker, index) => (
//               <motion.div
//                 key={speaker.id}
//                 className="relative"
//                 initial={{ scale: 0, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0, opacity: 0 }}
//                 transition={{ duration: 0.2, delay: index * 0.1 }}
//               >
//                 <img
//                   src={speaker.profilePic}
//                   alt={`Speaker's profile`}
//                   className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
//                 />
//                 <div className="absolute -bottom-1 -right-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                   {index + 1}
//                 </div>
//               </motion.div>
//             ))}
//         </AnimatePresence>
//         {nonCreators.length > 3 && (
//           <motion.button
//             className="text-sm text-blue-500 font-semibold"
//             onClick={() => setShowAllSpeakers(!showAllSpeakers)}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {showAllSpeakers ? "<<" : `+${nonCreators.length - 3}`}
//           </motion.button>
//         )}
//       </div>

//       {/* Spacer */}
//       <div className="h-1"></div>

//       {/* Request Mic Button */}
//       <motion.div
//         className="relative mt-2"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
//           <Plus size={14} className="text-gray-600 dark:text-gray-300" />
//         </div>
//         <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//           <Mic size={10} />
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default LiveSpeakers;

import React, { useState, useEffect, useRef } from 'react';
import { UserPlus, Plus, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatServices from '../../services/ChatService';

export interface Speaker {
  id: string;
  name: string;
  isCreator: boolean;
  profilePic: string;
  isSpeaking: boolean;
  isMuted: boolean;
}


const LiveSpeakers: React.FC = () => {
  // State management
  const userId = localStorage.getItem('user_id') || '';

  const [speakers, setSpeakers] = useState<Speaker[]>([
    { 
      id: '1', 
      name: "Alice", 
      isCreator: true, 
      profilePic: "/vite.svg",
      isSpeaking: false,
      isMuted: true
    },
    // Add more initial speakers if needed
  ]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSpeakers, setShowAllSpeakers] = useState(false);
  const [localMuted, setLocalMuted] = useState(true);

  // Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chatService = ChatServices.getInstance();

  // Initialize audio stream
  useEffect(() => {
    const initAudio = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Audio input not supported in this browser');
        }
  
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
  
        streamRef.current = stream;
        stream.getAudioTracks()[0].enabled = false; // Start muted
        setupAudioAnalyzer(stream);
        
      } catch (err) {
        console.error('Error accessing microphone:', err);
        // Show user-friendly error message
        // You should implement proper error handling UI here
      }
    };
  
    initAudio();
  
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  

  // Setup socket listeners
  useEffect(() => {
    const socket = chatService.Socket;

    socket.on('speakers-update', (activeSpeakers: string[]) => {
      setSpeakers(prev => prev.map(speaker => ({
        ...speaker,
        isSpeaking: activeSpeakers.includes(speaker.id)
      })));
    });

    return () => {
      socket.off('speakers-update');
    };
  }, []);

  const setupAudioAnalyzer = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    audioContextRef.current = audioContext;
    
    const source = audioContext.createMediaStreamSource(stream);
    const analyzer = audioContext.createAnalyser();
    const gainNode = audioContext.createGain(); // Add gain node
    
    analyzer.fftSize = 1024; // Increased for better accuracy
    analyzer.smoothingTimeConstant = 0.8;
    
    source.connect(analyzer);
    source.connect(gainNode);
    gainNode.connect(audioContext.destination); // Connect to output
    
    const bufferLength = analyzer.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    let speaking = false;
    const THRESHOLD = 20; // Adjust threshold as needed
    const SPEAK_DELAY = 300; // Debounce delay
    
    const checkAudio = () => {
      if (!localMuted) {
        analyzer.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        
        if (average > THRESHOLD && !speaking) {
          speaking = true;
          chatService.Socket.emit('speaking-started');
        } else if (average <= THRESHOLD && speaking) {
          speaking = false;
          setTimeout(() => {
            chatService.Socket.emit('speaking-ended');
          }, SPEAK_DELAY);
        }
      }
      requestAnimationFrame(checkAudio);
    };
    
    checkAudio();
  };

  useEffect(() => {
    const socket = chatService.Socket;
  
    socket.on('speakers-update', (activeSpeakers: string[]) => {
      setSpeakers(prev => prev.map(speaker => ({
        ...speaker,
        isSpeaking: activeSpeakers.includes(speaker.id)
      })));
    });
  
    socket.on('mute-changed', ({ userId, isMuted }) => {
      setSpeakers(prev => prev.map(speaker => 
        speaker.id === userId ? { ...speaker, isMuted } : speaker
      ));
    });
  
    return () => {
      socket.off('speakers-update');
      socket.off('mute-changed');
    };
  }, []);
  
  
  const toggleMicrophone = () => {
    if (streamRef.current) {
      const newMutedState = !localMuted;
      const audioTrack = streamRef.current.getAudioTracks()[0];
      
      audioTrack.enabled = !newMutedState;
      setLocalMuted(newMutedState);
      
      if (newMutedState) {
        chatService.Socket.emit('speaking-ended');
      }
      
      // Notify other users about mute state
      chatService.Socket.emit('mute-changed', {
        userId: userId, 
        isMuted: newMutedState
      });
    }
  };
  

  const toggleFollow = () => setIsFollowing(!isFollowing);

  const creator = speakers.find(speaker => speaker.isCreator);
  const nonCreators = speakers.filter(speaker => !speaker.isCreator);

  return (
    <div className="flex flex-col items-center space-y-2 p-2">
      {/* Creator */}
      {creator && (
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`relative ${creator.isSpeaking ? 'ring-2 ring-green-500' : ''}`}>
            <img
              src={creator.profilePic}
              alt={`${creator.name}'s profile`}
              className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
            />
            {creator.isSpeaking && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full" />
            )}
          </div>
          <motion.button
            className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
              isFollowing ? 'bg-gray-500' : 'bg-blue-500'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFollow}
          >
            {isFollowing ? <UserPlus size={12} /> : <Plus size={12} />}
          </motion.button>
        </motion.div>
      )}

      {/* Non-Creators */}
      <div className="shadow-sm bg-gray-100 dark:bg-gray-800 py-2 px-1 rounded-full flex flex-col items-center space-y-2">
        <AnimatePresence>
          {nonCreators
            .slice(0, showAllSpeakers ? undefined : 3)
            .map((speaker, index) => (
              <motion.div
                key={speaker.id}
                className="relative"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <div className={`relative ${speaker.isSpeaking ? 'ring-2 ring-green-500' : ''}`}>
                  <img
                    src={speaker.profilePic}
                    alt={`${speaker.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                  {speaker.isSpeaking && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full" />
                  )}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        
        {nonCreators.length > 3 && (
          <motion.button
            className="text-sm text-blue-500 font-semibold"
            onClick={() => setShowAllSpeakers(!showAllSpeakers)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAllSpeakers ? "Show Less" : `+${nonCreators.length - 3} more`}
          </motion.button>
        )}
      </div>

      {/* Microphone Toggle Button */}
      <motion.div
        className="relative mt-2 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMicrophone}
      >
        <div className={`w-12 h-12 rounded-full ${
          localMuted ? 'bg-gray-200 dark:bg-gray-700' : 'bg-blue-500'
        } flex items-center justify-center`}>
          {localMuted ? (
            <MicOff size={14} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <Mic size={14} className="text-white" />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LiveSpeakers;
