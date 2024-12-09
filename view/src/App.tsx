// import React from 'react';
// import { Route, Routes, To, useLocation, useNavigate } from 'react-router-dom';
// import ChatHome from './pages/Home';
// import Profile from './pages/Profile';
// import Settings from './pages/Settings';
// import ExploreLiveRooms from './pages/ExploreLiveRooms';
// import FloatingNavigation from './components/Navigation';
// import ChatRoom from './pages/ChatRoom';
// import StartPage from './pages/Start';
// import LiveStream from './pages/LiveStream';
// import CommunityRoom from './pages/CommunityRoom';

// import AuthLayout from './Auth/AuthLayout';
// import SignUpLayout from './Auth/Layout';
// import Registration from './Auth/Registration';
// import SignIn from './Auth/SignIn';

// const AppContent: React.FC = () => {
//   const navigate = useNavigate()
//   const location = useLocation();
 
//   const showFloatingNav = ['/home', '/settings', '/explore'].includes(location.pathname);
//   const minimize = (text: any) => {
    
//     if(text=='back') {
//       navigate('/')
//     }
    
//   }
//   return (
//     <div className="flex flex-col h-screen bg-white dark:bg-gray-900 max-w-2xl mx-auto">
      
//       <Routes>
        
//         <Route element={<AuthLayout />} >
//           <Route element={<SignUpLayout />} >
//             <Route index path='/sign-up' element={<Registration />} />
//           </Route>
//           <Route path='/sign-in' element={<SignIn />} />
//         </Route>

//         <Route path='/' element={<StartPage />} />
//         <Route path='/home' element={<ChatHome />} />

//         <Route path='/profile/:usernameOrUserid' element={<Profile />} />

//         <Route path='/settings' element={<Settings />} />
//         <Route path='/c/:userId/:chatId' element={<ChatRoom />} />
//         <Route path='/co' element={<CommunityRoom />} />
//         <Route path='/explore' element={<ExploreLiveRooms />} />
//         <Route path="/room/:roomId" element={<LiveStream minimize={function (): void {
//           throw new Error('Function not implemented.');
//         } } />} />
//       </Routes>
//       {showFloatingNav && <FloatingNavigation />}
//     </div>
//   );
// };

// function App() {
//   return (
    
//       <AppContent />
  
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
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
  const navigate = useNavigate();
  const location = useLocation();
  
  const showFloatingNav = ['/home', '/settings', '/explore'].includes(location.pathname);
  
  const minimize = (text: string) => {
    if(text === 'back') {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 max-w-2xl mx-auto">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route element={<SignUpLayout />}>
            <Route path='/sign-up' element={<Registration />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
        </Route>
        <Route path='/' element={<StartPage />} />

        {/* Protected routes */}
        <Route path='/home' element={
          <ProtectedRoute>
            <ChatHome />
          </ProtectedRoute>
        } />
        <Route path='/profile/:usernameOrUserid' element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path='/settings' element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path='/c/:userId/:chatId' element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        } />
        <Route path='/co' element={
          <ProtectedRoute>
            <CommunityRoom />
          </ProtectedRoute>
        } />
        <Route path='/explore' element={
          <ProtectedRoute>
            <ExploreLiveRooms />
          </ProtectedRoute>
        } />
        <Route path="/room/:roomId" element={
          <ProtectedRoute>
            <LiveStream minimize={function (): void {
              throw new Error('Function not implemented.');
            } } />
          </ProtectedRoute>
        } />
      </Routes>
      {showFloatingNav && <FloatingNavigation />}
    </div>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
