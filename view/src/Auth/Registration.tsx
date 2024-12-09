// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Api from '../services/Api';

// interface UserData {
//   names: string;
//   email: string;
//   terms: boolean;
//   username: string;
//   phone: string;
//   code: string;
//   rememberMe: boolean;
//   password: string;
//   confirmPassword: string;
// }


// interface CountryCode {
//   code: string;
//   name: string;
// }

// const countryCodes: CountryCode[] = [
//   { code: '+1', name: 'United States' },
//   { code: '+44', name: 'United Kingdom' },
//   // ... (add all other country codes here)
// ];

// const Registration: React.FC = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);
//   const [userData, setUserData] = useState<UserData>({
//     names: '',
//     email: '',
//     terms: false,
//     username: '',
//     phone: '',
//     code: '+1',
//     rememberMe: false,
//     password: '',
//     confirmPassword: '',
//   });
//   const [error, setError] = useState({ type: false, message: '' });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setUserData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (step === 1) {
//       setStep(2);
//     } else if (step === 2) {
//       setStep(3);
//     } else if (step === 3) {
//       if (userData.password !== userData.confirmPassword) {
//         setError({ type: true, message: 'Passwords do not match!' });
//       } else if (userData.password.length < 8) {
//         setError({ type: true, message: 'Password must be at least 8 characters long!' });
//       } else {
//         setError({ type: false, message: '' });
//         console.log('Registration complete:', userData);
//         // Here you would typically send the data to your backend
//         // const addNew = await Api.register(userData)
//         // if(addNew){
//         //   navigate('/home'); // Navigate to dashboard or confirmation page
//         // }

//       }
//     }
//   };

//   const renderStepOne = () => (
//     <>
//       <div className="flex flex-col">
//         <h1 className="text-[22px] font-semibold text-[#151940] mb-2.5">REGISTER</h1>
//         <div className="text-[18px] text-[#151940] mb-5">
//           Please enter <span className="font-bold">Full name</span> and <span className="font-bold">Email Address</span> so we can verify you.
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
//         <input
//           type="text"
//           placeholder="Full name"
//           name="names"
//           required
//           value={userData.names}
//           onChange={handleInputChange}
//           className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
//         />
//         <input
//           type="email"
//           placeholder="Enter Email Address"
//           name="email"
//           required
//           value={userData.email}
//           onChange={handleInputChange}
//           className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
//         />
//         <div className="flex items-center text-[12px] text-[#7F8192]">
//           <input
//             type="checkbox"
//             name="terms"
//             checked={userData.terms}
//             onChange={handleInputChange}
//             className="mr-2.5"
//           />
//           I've read and agree to the terms of privacy policy
//         </div>
//         <button type="submit" className="w-full h-14 bg-[#AAADB7] rounded-lg text-white text-lg font-bold mt-5">CONTINUE</button>
//       </form>
//     </>
//   );

//   const renderStepTwo = () => (
//     <>
//       <div className="header">
//         <h1 className="text-[#151940] text-[22px] font-semibold mb-2.5">REGISTER</h1>
//         <div className="title text-[#151940] text-[18px] mb-5">
//           Please enter <span className="font-bold">your phone number</span> and <span className="font-bold">username</span> so we can verify you.
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} className="flex flex-col">
//         <input
//           type="text"
//           placeholder="Username"
//           name="username"
//           required
//           value={userData.username}
//           onChange={handleInputChange}
//           className="w-full h-[53.734px] bg-[#F5F6FA] rounded-lg px-5 mb-2.5 outline-none focus:ring-2 focus:ring-[#314BCE] transition duration-300"
//         />
//         <div className="phone flex justify-between mb-2.5">
//           <select
//             name="code"
//             value={userData.code}
//             onChange={handleInputChange}
//             className="w-[28%] h-[53.734px] bg-[#F5F6FA] rounded-lg px-2 outline-none text-sm"
//           >
//             {countryCodes.map((country) => (
//               <option key={country.code} value={country.code}>
//                 {country.code}
//               </option>
//             ))}
//           </select>
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             name="phone"
//             required
//             value={userData.phone}
//             onChange={handleInputChange}
//             className="w-[70%] h-[53.734px] bg-[#F5F6FA] rounded-lg px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition duration-300"
//           />
//         </div>
//         <div className="accept flex items-center mb-5">
//           <input
//             type="checkbox"
//             name="rememberMe"
//             checked={userData.rememberMe}
//             onChange={handleInputChange}
//             className="mr-2.5"
//           />
//           <span className="text-[#7F8192] text-[12px]">Remember me</span>
//         </div>
//         <button type="submit" className="w-full h-[56px] bg-[#AAADB7] rounded-lg text-white text-[18px] font-bold mb-5">
//           CONTINUE
//         </button>
//       </form>
//     </>
//   );

//   const renderStepThree = () => (
//     <>
//       <div className="flex flex-col">
//         <h1 className="text-[22px] font-semibold text-[#151940] mb-2.5">REGISTER</h1>
//         <div className="text-[18px] text-[#151940] mb-5">
//           Please enter <span className="font-bold">Password</span> and <span className="font-bold">Confirm It</span> to secure your NotifyAccount.
//         </div>
//       </div>

//       {error.type && (
//         <div className="p-4 w-full h-[20px] bg-red-400 rounded-[5px] flex items-center justify-center text-[14px] font-medium text-[#fff] tracking-[2px]">{error.message}</div>
//       )}

//       <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
//         <input
//           type="password"
//           placeholder="Enter Password"
//           name="password"
//           required
//           value={userData.password}
//           onChange={handleInputChange}
//           className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
//         />
//         <input
//           type="password"
//           placeholder="Enter Confirm Password"
//           name="confirmPassword"
//           required
//           value={userData.confirmPassword}
//           onChange={handleInputChange}
//           className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
//         />
//         <button type="submit" className="w-full h-14 bg-[#AAADB7] rounded-lg text-white text-lg font-bold mt-5">COMPLETE REGISTRATION</button>
//       </form>
//     </>
//   );

//   return (
//     <div className="registration-container">
//       {step === 1 && renderStepOne()}
//       {step === 2 && renderStepTwo()}
//       {step === 3 && renderStepThree()}
//     </div>
//   );
// };

// export default Registration;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../services/Api';

interface UserData {
  fullName: string;
  email: string;
  username: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  language: string;
  country: string;
  bio: string;
  hashtags: string[];
  websiteUrl: string;
  socialMediaLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  preferences: {
    notifications?: boolean;
    newsletter?: boolean;
  };
  terms: boolean;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState({ type: false, message: '' });

  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    username: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    language: 'en',
    country: '',
    bio: '',
    hashtags: [],
    websiteUrl: '',
    socialMediaLinks: {},
    preferences: {
      notifications: true,
      newsletter: false
    },
    terms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleHashtagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hashtags = e.target.value.split(',').map(tag => tag.trim());
    setUserData(prev => ({
      ...prev,
      hashtags
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (userData.password !== userData.confirmPassword) {
        setError({ type: true, message: 'Passwords do not match!' });
        return;
      }

      if (userData.password.length < 8) {
        setError({ type: true, message: 'Password must be at least 8 characters long!' });
        return;
      }

      try {
        // Remove confirmPassword before sending to backend
        const { confirmPassword, terms, ...registrationData } = userData;
        
        const response = await Api.register(registrationData);
        
        if (response.token) {
          // Store token in localStorage or context
          localStorage.setItem('token', response.token);
          navigate('/home');
        }
      } catch (error: any) {
        setError({ 
          type: true, 
          message: error.response?.data?.message || 'Registration failed. Please try again.' 
        });
      }
    }
  };

  const renderStepOne = () => (
    <>
      <div className="flex flex-col">
        <h1 className="text-[22px] font-semibold text-[#151940] mb-2.5">REGISTER</h1>
        <div className="text-[18px] text-[#151940] mb-5">
          Please enter your basic information
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
        <input
          type="text"
          placeholder="Full Name"
          name="fullName"
          required
          value={userData.fullName}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE]"
        />
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          required
          value={userData.email}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE]"
        />
        <select
          name="language"
          value={userData.language}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE]"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="terms"
            checked={userData.terms}
            onChange={handleInputChange}
            className="mr-2.5"
          />
          <span className="text-[12px] text-[#7F8192]">
            I've read and agree to the terms of privacy policy
          </span>
        </div>
        <button 
          type="submit" 
          className="w-full h-14 bg-[#314BCE] rounded-lg text-white text-lg font-bold"
        >
          Continue
        </button>
      </form>
    </>
  );

  const renderStepTwo = () => (
    <>
      <div className="flex flex-col">
        <h1 className="text-[22px] font-semibold text-[#151940] mb-2.5">Profile Details</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          value={userData.username}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          name="phoneNumber"
          required
          value={userData.phoneNumber}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5"
        />
        <input
          type="text"
          placeholder="Country"
          name="country"
          required
          value={userData.country}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5"
        />
        <textarea
          placeholder="Bio"
          name="bio"
          value={userData.bio}
          onChange={handleInputChange}
          className="w-full h-[100px] rounded-lg bg-[#F5F6FA] px-5 py-3"
        />
        <button type="submit" className="w-full h-14 bg-[#314BCE] rounded-lg text-white text-lg font-bold">
          Continue
        </button>
      </form>
    </>
  );

  const renderStepThree = () => (
    <>
      <div className="flex flex-col">
        <h1 className="text-[22px] font-semibold text-[#151940] mb-2.5">Security</h1>
      </div>
      {error.type && (
        <div className="p-4 bg-red-400 rounded-[5px] text-white mb-4">
          {error.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          value={userData.password}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          value={userData.confirmPassword}
          onChange={handleInputChange}
          className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5"
        />
        <button type="submit" className="w-full h-14 bg-[#314BCE] rounded-lg text-white text-lg font-bold">
          Complete Registration
        </button>
      </form>
    </>
  );

  return (
    <div className="registration-container max-w-md mx-auto p-6">
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
      {step === 3 && renderStepThree()}
    </div>
  );
};

export default Registration;
