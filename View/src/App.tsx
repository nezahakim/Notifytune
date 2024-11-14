import React from 'react';
import { Route, Routes, To, useLocation, useNavigate } from 'react-router-dom';
import ChatHome from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ExploreLiveRooms from './pages/ExploreLiveRooms';
import FloatingNavigation from './components/Navigation';
import ChatRoom from './pages/ChatRoom';
import StartPage from './pages/Start';
import LiveStream from './pages/LiveStream';
import CommunityRoom from './pages/CommunityRoom';

import AuthLayout from './Auth/AuthLayout';
import SignUpLayout from './Auth/Layout';
import Registration from './Auth/Registration';
import SignIn from './Auth/SignIn';

const AppContent: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
 
  const showFloatingNav = ['/home', '/settings', '/explore'].includes(location.pathname);
  const minimize = (text: any) => {
    
    if(text=='back') {
      navigate('/')
    }
    
  }
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 max-w-2xl mx-auto">
      
      <Routes>
        
        <Route element={<AuthLayout />} >
          <Route element={<SignUpLayout />} >
            <Route index path='/sign-up' element={<Registration />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
        </Route>

        <Route path='/' element={<StartPage />} />
        <Route path='/home' element={<ChatHome />} />

        <Route path='/profile/:usernameOrUserid' element={<Profile />} />

        <Route path='/settings' element={<Settings />} />
        <Route path='/c/:userId/:chatId' element={<ChatRoom />} />
        <Route path='/co' element={<CommunityRoom />} />
        <Route path='/explore' element={<ExploreLiveRooms />} />
        <Route path="/room/:roomId" element={<LiveStream minimize={function (): void {
          throw new Error('Function not implemented.');
        } } />} />
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
