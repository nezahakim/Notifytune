// import React, { useState, useEffect, useRef } from 'react';
// import { LiveRoom, Message, Participant } from '../components/types';
// import ParticipantList from '../components/Room/ParticipantList';
// import ChatWindow from '../components/Room/ChatWindow';
// import AudioVisualizer from '../components/Room/AudioVisualizer';

// const LiveRoomPage: React.FC<{ room: LiveRoom }> = ({ room }) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [participants, setParticipants] = useState<Participant[]>([]);
//   const [isGlobalChat, setIsGlobalChat] = useState(true);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOn, setIsVideoOn] = useState(false);
//   const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     // Simulating fetching participants and messages
//     setParticipants([
//       { id: 1, name: room?.host, isHost: true, isSpeaking: false },
//       { id: 2, name: "Jane Doe", isHost: false, isSpeaking: true },
//       { id: 3, name: "John Smith", isHost: false, isSpeaking: false },
//     ]);

//     setMessages([
//       { id: 1, sender: "System", content: `Welcome to ${room?.title}!`, timestamp: new Date(), isGlobal: true },
//       { id: 2, sender: room?.host, content: "Hello everyone! Let's get started.", timestamp: new Date(), isGlobal: true },
//     ]);
//   }, [room]);

//   const handleSendMessage = (content: string) => {
//     const newMessage: Message = {
//       id: messages.length + 1,
//       sender: "You",
//       content,
//       timestamp: new Date(),
//       isGlobal: true,
//     };
//     setMessages([...messages, newMessage]);
//   };

//   const toggleAudio = () => {
//     setIsMuted(!isMuted);
//     if (audioRef.current) {
//       audioRef.current.muted = !isMuted;
//     }
//   };

//   const toggleVideo = () => {
//     setIsVideoOn(!isVideoOn);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
//       <header className="bg-black bg-opacity-50 p-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">{room?.title}</h1>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleAudio}
//               className={`p-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}
//             >
//               {isMuted ? 'Unmute' : 'Mute'}
//             </button>
//             <button
//               onClick={toggleVideo}
//               className={`p-2 rounded-full ${isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}
//             >
//               {isVideoOn ? 'Video On' : 'Video Off'}
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//         <section className="flex-grow">
//           <div className="bg-black bg-opacity-50 rounded-lg p-4 mb-4">
//             <AudioVisualizer />
//           </div>
//           <ParticipantList participants={participants} />
//         </section>

//         <section className="w-full md:w-1/3">
//           <div className="bg-black bg-opacity-50 rounded-lg p-4 h-full flex flex-col">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-semibold">Chat</h2>
//               <button
//                 onClick={() => setIsGlobalChat(!isGlobalChat)}
//                 className={`px-3 py-1 rounded-full text-sm ${
//                   isGlobalChat ? 'bg-blue-500' : 'bg-purple-500'
//                 }`}
//               >
//                 {isGlobalChat ? 'Global' : 'Personal'}
//               </button>
//             </div>
//             <ChatWindow messages={messages.filter(m => m.isGlobal === isGlobalChat)} />
//             <div className="mt-4">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="w-full bg-gray-800 text-white rounded-full px-4 py-2"
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     handleSendMessage(e.currentTarget.value);
//                     e.currentTarget.value = '';
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </section>
//       </main>

//       <audio ref={audioRef} autoPlay loop>
//         <source src="/path-to-background-music.mp3" type="audio/mpeg" />
//       </audio>
//     </div>
//   );
// };

// export default LiveRoomPage;

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LiveRoom, Participant } from '../components/types';
import GravityParticipant from '../components/GravityParticipant';
import ChatBubble from '../components/ChatBubble';
import AudioControls from '../components/AudioControls';
import RoomInfo from '../components/RoomInfo';

const GravityAudioRoom: React.FC<{ room: LiveRoom }> = ({ room }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulating fetching participants
    setParticipants([
      { id: 1, name: room?.host, isHost: true, isSpeaking: false, color: '#FF6B6B' },
      { id: 2, name: "Jane Doe", isHost: false, isSpeaking: true, color: '#4ECDC4' },
      { id: 3, name: "John Smith", isHost: false, isSpeaking: false, color: '#45B7D1' },
      // Add more participants as needed
    ]);
  }, [room]);

  const handleNewMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
    setTimeout(() => setMessages(prev => prev.slice(1)), 5000);
  };

  const handleParticipantMove = (id: number, x: number, y: number) => {
    setParticipants(prev =>
      prev.map(p => p.id === id ? { ...p, x, y } : p)
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="absolute top-0 left-0 p-4 z-10">
        <RoomInfo room={room} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <AudioControls isMuted={isMuted} setIsMuted={setIsMuted} />
      </div>

      <div ref={containerRef} className="relative w-full h-full">
        {participants.map((participant) => (
          <GravityParticipant
            key={participant.id}
            participant={participant}
            containerRef={containerRef}
            onMove={handleParticipantMove}
          />
        ))}

        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => handleNewMessage("Hello, everyone!")}
          >
            Speak
          </button>
        </motion.div>

        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>
    </div>
  );
};

export default GravityAudioRoom;
