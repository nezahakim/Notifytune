import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ChatHome from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ExploreLiveRooms from './pages/ExploreLiveRooms';
import FloatingNavigation from './components/Navigation';
import ChatRoom from './pages/ChatRoom';
import StartPage from './pages/Start';
import LiveStreamLayout from './pages/LiveStreamLayout';
import GravityAudioRoom from './pages/LiveRoomPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const showFloatingNav = !['/c', '/live', '/room', '/'].includes(location.pathname);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 max-w-2xl mx-auto">
      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/home' element={<ChatHome />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/c' element={<ChatRoom />} />
        <Route path='/explore-live' element={<ExploreLiveRooms />} />
        <Route path='/live' element={<GravityAudioRoom />} />
        <Route path="/room" element={<LiveStreamLayout />} />
      </Routes>
      {showFloatingNav && <FloatingNavigation />}
    </div>
  );
};

function App() {
  return (
    
      <AppContent />
  
  );
}

export default App;
