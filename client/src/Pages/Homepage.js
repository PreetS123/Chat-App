import React,{useEffect, useState} from 'react';
import { SignIn } from '../Component/SignIn';
import { SignUp } from '../Component/SignUp';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../config/User';

export const Homepage = () => {
  const [activeTab, setActiveTab] = useState(1);

  const navigate= useNavigate();

  useEffect(()=>{
   const user= getToken();
   if(user) navigate('/chat')
  },[navigate])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
    <div className="container w-[70%]  mx-auto my-4 p-2">
    <div className="flex w-[70%] mx-auto space-x-4 items-center justify-center">
      <div
        onClick={() => handleTabClick(1)}
        className={`w-[50%] cursor-pointer rounded-lg outline-1 px-4 py-2 ${
          activeTab === 1
            ? 'border-blue-500 bg-blue-100 text-indigo-500'
            : 'border-gray-200 text-gray-700'
        } rounded-tl-md`}
      >
        Login
      </div>

      <div
        onClick={() => handleTabClick(2)}
        className={`w-[50%] cursor-pointer rounded-lg outline-1 px-4 py-2 ${
          activeTab === 2
            ? 'border-blue-500 bg-blue-100 text-indigo-500'
            : 'border-gray-200 text-gray-700'
        }`}
      >
        Register
      </div>
      
    </div>

    <div className="p-4 border border-t-0 rounded-b-md">
      {activeTab === 1 && <div><SignIn /></div>}
      {activeTab === 2 && <div><SignUp activeTab={setActiveTab} /></div>}
    </div>
  </div></>
  )
}

