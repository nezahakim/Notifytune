import React, { useState } from 'react';
import Api from '../services/Api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface UserData {
    username: string;
    password: string;
    remember: boolean;
}

const SignIn: React.FC = () => {
    const { login } = useAuth()
    const [error, setError] = useState({
        type: false,
        message: ''
    })
    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
        remember: false,
    });

    // console.log(userData)
    const navigate = useNavigate()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(userData){
            const a = await login(userData)
            if(a.status){
               navigate('/home')
            }else{
                setError({
                    type: true,
                    message: a.message
                })
            }
        }

    };

    return (
        <div className="flex flex-col items-center justify-center relative w-full h-screen max-w-[414px] max-h-[896px]">
            <div className="w-full h-full flex flex-col justify-between p-8">

                <div className="flex flex-col">
                    <h1 className="text-[22px] font-bold text-[#151940] mb-2.5">LOGIN</h1>
                    <div className="text-[18px] text-[#151940] mb-5">
        Please enter <span className="font-bold">Username</span> and <span className="font-bold">Password</span> so we can verify you.
      </div>
                </div>
                {error.type && <div className="p-4 bg-red-400 rounded-[5px] text-white mb-4">
          {error.message}
        </div>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2.5">
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="username"
                        required
                        value={userData.username}
                        onChange={handleInputChange}
                        className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
                    />
                    <input
                        type="password"
                        placeholder="Enter Passowrd"
                        name="password"
                        required
                        value={userData.password}
                        onChange={handleInputChange} 
                        className="w-full h-[53.734px] rounded-lg bg-[#F5F6FA] px-5 outline-none focus:ring-2 focus:ring-[#314BCE] transition-all duration-300"
                    />
                    <div className="flex justify-between space-x-2.5 items-center text-[12px] text-[#7F8192] py-2">
                        <div className="flex flex-row items-center"><input
                            type="checkbox"
                            name="remember"
                            checked={userData.remember}
                            onChange={handleInputChange}
                            className="mr-2.5"
                        /> Remember me</div>
                        <a className="text-[12px] text-red">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full h-14 bg-[#AAADB7] rounded-lg text-white text-lg font-bold mt-5">CONTINUE</button>
                </form>
                {/* <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-[#333333] opacity-[0.418]" />
                    <span className="px-2.5 text-[15px] text-[#486484]">or continue with</span>
                    <hr className="flex-grow border-t border-[#333333] opacity-[0.418]" />
                </div>
                <div className="flex justify-between space-x-2.5">
                    <div className="w-full h-[53px] bg-slate-200 rounded-[5px] flex items-center justify-center text-[14px] font-medium text-[#151940] tracking-[2.55px]">
                        <svg className="ml-2.5 w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                            <linearGradient id="BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#33bef0"></stop><stop offset="1" stopColor="#0a85d9"></stop></linearGradient><path fill="url(#BiF7D16UlC0RZ_VqXJHnXa_oWiuH0jFiU0R_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path d="M10.119,23.466c8.155-3.695,17.733-7.704,19.208-8.284c3.252-1.279,4.67,0.028,4.448,2.113	c-0.273,2.555-1.567,9.99-2.363,15.317c-0.466,3.117-2.154,4.072-4.059,2.863c-1.445-0.917-6.413-4.17-7.72-5.282	c-0.891-0.758-1.512-1.608-0.88-2.474c0.185-0.253,0.658-0.763,0.921-1.017c1.319-1.278,1.141-1.553-0.454-0.412	c-0.19,0.136-1.292,0.935-1.745,1.237c-1.11,0.74-2.131,0.78-3.862,0.192c-1.416-0.481-2.776-0.852-3.634-1.223	C8.794,25.983,8.34,24.272,10.119,23.466z" opacity=".05"></path><path d="M10.836,23.591c7.572-3.385,16.884-7.264,18.246-7.813c3.264-1.318,4.465-0.536,4.114,2.011	c-0.326,2.358-1.483,9.654-2.294,14.545c-0.478,2.879-1.874,3.513-3.692,2.337c-1.139-0.734-5.723-3.754-6.835-4.633	c-0.86-0.679-1.751-1.463-0.71-2.598c0.348-0.379,2.27-2.234,3.707-3.614c0.833-0.801,0.536-1.196-0.469-0.508	c-1.843,1.263-4.858,3.262-5.396,3.625c-1.025,0.69-1.988,0.856-3.664,0.329c-1.321-0.416-2.597-0.819-3.262-1.078	C9.095,25.618,9.075,24.378,10.836,23.591z" opacity=".07"></path><path fill="#fff" d="M11.553,23.717c6.99-3.075,16.035-6.824,17.284-7.343c3.275-1.358,4.28-1.098,3.779,1.91	c-0.36,2.162-1.398,9.319-2.226,13.774c-0.491,2.642-1.593,2.955-3.325,1.812c-0.833-0.55-5.038-3.331-5.951-3.984	c-0.833-0.595-1.982-1.311-0.541-2.721c0.513-0.502,3.874-3.712,6.493-6.21c0.343-0.328-0.088-0.867-0.484-0.604	c-3.53,2.341-8.424,5.59-9.047,6.013c-0.941,0.639-1.845,0.932-3.467,0.466c-1.226-0.352-2.423-0.772-2.889-0.932	C9.384,25.282,9.81,24.484,11.553,23.717z"></path>
                        </svg>&nbsp;Telegram</div>
                </div> */}

                <div className="flex flex-col items-start mt-8 text-center">
                    <p className="text-[14px] text-[#151940] mb-5">Not have an account?</p>
                    <a href="/sign-up" className="text-[16px] text-[#314BCE] font-bold tracking-[2.55px] flex items-center justify-center">
                    SIGN-UP{/*<img src="../system/icons/go.svg" alt="" className="ml-2.5 w-[15px] h-[15px]" /> */}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;