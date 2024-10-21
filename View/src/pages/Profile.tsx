// import React, { useState, useRef, useEffect } from 'react';
// import { Camera, Lock, Bell, Database, LogOut, Moon, Sun, ChevronRight } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
// import '../Style/Profile.css';

// interface UserProfile {
//   name: string;
//   avatar: string;
//   phone: string;
//   email: string;
//   status: string;
//   bio: string;
//   darkMode: boolean;
// }

// const Profile: React.FC = () => {
//   const [user, setUser] = useState<UserProfile>({
//     name: "John Doe",
//     avatar: "https://i.pravatar.cc/150?img=68",
//     phone: "+1 (555) 123-4567",
//     email: "john.doe@example.com",
//     status: "Available",
//     bio: "I'm a software developer passionate about creating awesome user experiences!",
//     darkMode: false,
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     document.body.classList.toggle('dark-mode', user.darkMode);
//   }, [user.darkMode]);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setUser(prevUser => ({ ...prevUser, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsEditing(false);
//     setShowAlert(true);
//     setTimeout(() => setShowAlert(false), 3000);
//   };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUser(prevUser => ({ ...prevUser, avatar: reader.result as string }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAvatarClick = () => {
//     fileInputRef.current?.click();
//   };

//   const toggleDarkMode = () => {
//     setUser(prevUser => ({ ...prevUser, darkMode: !prevUser.darkMode }));
//   };

//   return (
//     <div className={`profile ${user.darkMode ? 'dark-mode' : ''}`}>
//       <header className="profile-header">
//         <button className="icon-button" aria-label="Back">
//           <ChevronRight />
//         </button>
//         <h1>Profile</h1>
//         <button className="icon-button" onClick={() => setIsEditing(!isEditing)}>
//           {isEditing ? "Save" : "Edit"}
//         </button>
//       </header>

//       {showAlert && (
//         <Alert className="profile-alert">
//           <AlertTitle>Success!</AlertTitle>
//           <AlertDescription>Your profile has been updated.</AlertDescription>
//         </Alert>
//       )}

//       <div className="profile-content">
//         <div className="profile-avatar" onClick={handleAvatarClick}>
//           <img src={user.avatar} alt={user.name} className="avatar-image" />
//           {!isEditing && (
//             <button className="change-avatar-button">
//               <Camera size={16} />
//             </button>
//           )}
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={handleAvatarChange}
//             accept="image/*"
//             style={{ display: 'none' }}
//           />
//         </div>

//         <form onSubmit={handleSubmit}>
//           <div className="profile-field">
//             <label htmlFor="name">Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={user.name}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="profile-field">
//             <label htmlFor="phone">Phone</label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={user.phone}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="profile-field">
//             <label htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={user.email}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//             />
//           </div>

//           <div className="profile-field">
//             <label htmlFor="status">Status</label>
//             {isEditing ? (
//               <select
//                 id="status"
//                 name="status"
//                 value={user.status}
//                 onChange={handleInputChange}
//               >
//                 <option value="Available">Available</option>
//                 <option value="Busy">Busy</option>
//                 <option value="Do Not Disturb">Do Not Disturb</option>
//                 <option value="Away">Away</option>
//               </select>
//             ) : (
//               <input
//                 type="text"
//                 id="status"
//                 name="status"
//                 value={user.status}
//                 readOnly
//               />
//             )}
//           </div>

//           <div className="profile-field">
//             <label htmlFor="bio">Bio</label>
//             <textarea
//               id="bio"
//               name="bio"
//               value={user.bio}
//               onChange={handleInputChange}
//               readOnly={!isEditing}
//               rows={3}
//             />
//           </div>
//         </form>
//       </div>

//       <div className="profile-actions">
//         <button className="action-button">
//           <Lock size={20} />
//           Privacy
//           <ChevronRight size={20} className="action-icon-right" />
//         </button>
//         <button className="action-button">
//           <Bell size={20} />
//           Notifications
//           <ChevronRight size={20} className="action-icon-right" />
//         </button>
//         <button className="action-button">
//           <Database size={20} />
//           Data and Storage
//           <ChevronRight size={20} className="action-icon-right" />
//         </button>
//         <button className="action-button" onClick={toggleDarkMode}>
//           {user.darkMode ? <Sun size={20} /> : <Moon size={20} />}
//           {user.darkMode ? 'Light Mode' : 'Dark Mode'}
//           <div className="toggle-switch">
//             <input
//               type="checkbox"
//               id="darkModeToggle"
//               checked={user.darkMode}
//               onChange={toggleDarkMode}
//             />
//             <label htmlFor="darkModeToggle"></label>
//           </div>
//         </button>
//         <button className="action-button logout-button">
//           <LogOut size={20} />
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useRef, useEffect } from 'react';
import { Camera, Lock, Bell, Database, LogOut, Moon, Sun, ChevronRight, Settings } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { Link } from 'react-router-dom';

interface UserProfile {
  name: string;
  avatar: string;
  phone: string;
  email: string;
  status: string;
  bio: string;
  darkMode: boolean;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=68",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    status: "Available",
    bio: "I'm a software developer passionate about creating awesome user experiences!",
    darkMode: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', user.darkMode);
  }, [user.darkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prevUser => ({ ...prevUser, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const toggleDarkMode = () => {
    setUser(prevUser => ({ ...prevUser, darkMode: !prevUser.darkMode }));
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ${user.darkMode ? 'dark' : ''}`}>
      <div className="max-w-3xl mx-auto">
        <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
          <button className="p-2" aria-label="Back">
            <ChevronRight className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Profile</h1>
          <button className="p-2" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save" : "Edit"}
          </button>
        </header>

        {showAlert && (
          <Alert className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your profile has been updated.</AlertDescription>
          </Alert>
        )}

        <div className="p-4">
          <div className="relative w-32 h-32 mx-auto mb-6" onClick={handleAvatarClick}>
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
            {!isEditing && (
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full">
                <Camera className="w-4 h-4" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Status</label>
              {isEditing ? (
                <select
                  id="status"
                  name="status"
                  value={user.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Do Not Disturb">Do Not Disturb</option>
                  <option value="Away">Away</option>
                </select>
              ) : (
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={user.status}
                  readOnly
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
              )}
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
                readOnly={!isEditing}
                rows={3}
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </form>
        </div>

        <div className="p-4 space-y-2">
         <Link to='/settings' className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
            <span className="flex items-center">
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </span>
            <ChevronRight className="w-5 h-5" />
          </Link>

          <button className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
            <span className="flex items-center">
              <Lock className="w-5 h-5 mr-3" />
              Privacy
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
            <span className="flex items-center">
              <Bell className="w-5 h-5 mr-3" />
              Notifications
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-white">
            <span className="flex items-center">
              <Database className="w-5 h-5 mr-3" />
              Data and Storage
            </span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-white" onClick={toggleDarkMode}>
            <span className="flex items-center">
              {user.darkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
              {user.darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
              <input
                type="checkbox"
                name="toggle"
                id="toggle"
                checked={user.darkMode}
                onChange={toggleDarkMode}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
            </div>
          </button>
          <button className="w-full p-4 flex items-center justify-between bg-white dark:bg-gray-800 rounded-md text-red-500">
            <span className="flex items-center">
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;