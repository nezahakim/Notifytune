// import React, { useState, useRef, useEffect } from 'react';
// import { useParams,useNavigate } from 'react-router-dom';
// import { Send, Paperclip, Mic, Smile, MoreVertical, ArrowLeft, Phone, Video } from 'lucide-react';
// import { ChatFace, Message } from '../components/types';
// import Api from '../services/Api';



// const ChatRoom: React.FC = () => {

//   const [chat, setChat] = useState<ChatFace>()
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const [isNewChat, setIsNewChat] = useState(true)
  
//   const { userId, chatId } = useParams()
//   const navigate =  useNavigate()

//   const currentUserId = localStorage.getItem('user_id')

//   useEffect(() => {
//     const checkChat = async () => {
//       const check = await Api.getChatIdWithCheck(userId, currentUserId);      
//       setIsNewChat(check.status);
//       setChat(check)
//       console.log(check)
//     };

//     checkChat();
// }, []);



//   useEffect(() => {
//     scrollToBottom();    
//     getChatMessages()
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const getChatMessages = async () =>{
//     if(chatId){
//       const getAllchats = await Api.chatMessages(chatId)
//       setMessages(getAllchats);
//     }
//   }

 

//   const handleSend = async () => {
//     console.log(isNewChat)
//     if(!isNewChat){
//       const createChat = await Api.createChat('private',[currentUserId, userId])
//       if(createChat){
//         const chat_id = createChat._id
//         console.log(chat_id)
//         const sendText = await Api.sendText(chat_id, currentUserId, message)
//       }
//     }else{
//       const sendText = await Api.sendText(chatId, currentUserId, message)
//       // console.log(sendText)
//     }

//     if (message.trim()) {
//       const getAllchats = await Api.chatMessages(chatId)
//       // setMessages([...messages, { id: Date.now(), content: message, sender: 'user', timestamp: new Date(), isGlobal:false}]);
//       setMessages(getAllchats)
//       console.log(getAllchats)
//       setMessage('');
//     }
//   };

  

//   const onBack = () =>{
//     navigate('/home')
//   }

//   const handleViewProfile = () =>{
//     navigate('/profile/'+currentUserId)
//   }
  
//   return (
//     <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
//       <header className="bg-white dark:bg-gray-800 shadow-md z-10">
//         <div className="flex items-center justify-between px-4 py-3">
//           <div className="flex items-center space-x-3">
//             <button onClick={onBack} className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
//               <ArrowLeft size={24} />
//             </button>
//             <div className="flex items-center space-x-3" onClick={handleViewProfile}>
//               <div className="relative">
//                 <img src={chat?.avatar} alt={chat?.name} className="w-10 h-10 rounded-full" />
//                 {chat?.online && (
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
//                 )}
//               </div>
//               <div>
//                 <h2 className="font-semibold text-gray-900 dark:text-white">{chat?.name}</h2>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">{chat?.online ? 'Online' : 'Offline'}</p>
//               </div>
//             </div>
//           </div>
//           <div className="flex space-x-2">
//             <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
//               <Phone size={24} />
//             </button>
//             {/* <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
//               <Video size={24} />
//             </button> */}
//             <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
//               <MoreVertical size={24} />
//             </button>
//           </div>
//         </div>
//       </header>
      

//       <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">

      
// {!isNewChat && <> <div className="flex flex-col items-center justify-center h-full text-center px-4">
//   <div className="max-w-sm w-full bg-black/40 rounded-xl p-8 backdrop-blur-sm">
//     {/* Elegant emoji with subtle float effect */}
//     <div className="text-7xl mb-10 animate-float">
//       ✨
//     </div>

//     {/* Refined message with perfect spacing */}
//     <div className="text-2xl font-medium text-white/95 mb-6">
//       Hi, it's me {chat?.name}
//       <span className="inline-block w-2.5 h-2.5 bg-emerald-400 rounded-full ml-3 animate-pulse"></span>
//     </div>

//     {/* Elegant info section with SVGs */}
//     <div className="space-y-3 text-[15px] font-light tracking-wide">
//       <div className="text-white/80 flex items-center justify-center gap-2">
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//         </svg>
//         Messages are <span className="font-bold">end-to-end encrypted</span>
//       </div>
//       <div className="text-white/80 flex items-center justify-center gap-2">
//         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//         </svg>
//         Disappear after being seen
//       </div>
//     </div>
//   </div>
// </div>

// <style>{`
//   @keyframes float {
//     0%, 100% { transform: translateY(0); }
//     50% { transform: translateY(-12px); }
//   }
//   .animate-float {
//     animation: float 3s ease-in-out infinite;
//   }`}</style> </> }


//         {messages.reverse().reverse().map((msg) => (
//           <div key={msg?._id} className={`flex ${msg?.userId !== userId ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//               msg?.userId !== userId ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
//             }`}>
//               <p>{msg?.message}</p>
//               <p className="text-xs mt-1 opacity-70">{msg?.createdAt}</p>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
//         <div className="flex items-center space-x-2">
//           {/* <button className="text-gray-500 hover:text-blue-500">
//             <Paperclip size={24} />
//           </button> */}
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button className="text-gray-500 hover:text-blue-500">
//             <Smile size={24} />
//           </button>
//           {message ? (
//             <button onClick={handleSend} className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
//               <Send size={24} />
//             </button>
//           ) : (
//             <button className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full">
//               <Mic size={24} />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );

// };

// export default ChatRoom;


import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Smile, MoreVertical, ArrowLeft, Phone } from 'lucide-react';
import { ChatFace, Message } from '../components/types';
import Api from '../services/Api';
import ChatService from '../services/ChatService';

const ChatRoom: React.FC = () => {
  const [chat, setChat] = useState<ChatFace>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isNewChat, setIsNewChat] = useState(true);
  const { userId, chatId } = useParams();
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('user_id');

  useEffect(() => {
    const initializeChat = async () => {
      const check = await Api.getChatIdWithCheck(userId, currentUserId);
      setIsNewChat(check.status);
      setChat(check);

      if (chatId) {
        const initialMessages = await Api.chatMessages(chatId);
        setMessages(initialMessages);

        const chatConnection = new ChatService(chatId);
      }
    };

    initializeChat();
  }, [chatId, userId, currentUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      if (!isNewChat) {
        const createChat = await Api.createChat('private', [currentUserId, userId]);
        if (createChat) {
          const newMessage = await Api.sendText(createChat._id, currentUserId, message);
          setMessages(currentMessages => [...currentMessages, newMessage]);
          navigate(`/chat/${userId}/${createChat._id}`);
        }
      } else {
        const newMessage = await Api.sendText(chatId, currentUserId, message);
        setMessages(currentMessages => [...currentMessages, newMessage]);
      }
      setMessage('');
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <button onClick={() => navigate('/home')} className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <ArrowLeft size={24} />
            </button>
            <div className="flex items-center space-x-3" onClick={() => navigate(`/profile/${currentUserId}`)}>
              <div className="relative">
                <img src={chat?.avatar} alt={chat?.name} className="w-10 h-10 rounded-full object-cover" />
                {chat?.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">{chat?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{chat?.online ? 'Online' : 'Offline'}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <Phone size={24} />
            </button>
            <button className="text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full">
              <MoreVertical size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
        {!isNewChat && (
          <div className="welcome-message">
            {/* Your existing welcome message JSX */}
          </div>
        )}

        {messages.reverse().map((msg) => (
          <div key={msg?._id} className={`flex ${msg?.userId !== userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              msg?.userId !== userId ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}>
              <p>{msg?.message}</p>
              <p className="text-xs mt-1 opacity-70">{new Date(msg?.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="text-gray-500 hover:text-blue-500">
            <Smile size={24} />
          </button>
          <button 
            onClick={handleSend} 
            className="text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 p-2 rounded-full"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;