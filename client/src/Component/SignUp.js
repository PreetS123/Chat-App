import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const SignUp = ({activeTab}) => {
  const [formData, setFormData] = useState({
   name:"",
   email:"",
   password:"",
   pic:"https://www.pngkey.com/png/detail/121-1219231_user-default-profile.png"
  });
  const [showPassword,setShowPassword]= useState(false);
  const [showConfirm,setShowConfirm]= useState(false);
  const navigate= useNavigate();


  let token= localStorage.getItem("token");

  const toggleConfirmVisibility=()=>{
    setShowConfirm(prev=>!prev);
  }

  const togglePasswordVisibility=()=>{
   setShowPassword(prev=>!prev);
  }

  const handleInputChange = (e) => {
    let val= e.target;
    let updatedFormData = { ...formData };
    // console.log('handleInputChange',updatedFormData)
     // Validating email
  if (val.name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.value)) {
      
      return toast.error('Invalid email', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  // Validating password
  if (val.name === 'password') {
   
    if (val.value.length < 8) {
      return toast.error('Password must be at least 8 characters long', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(val.value)) {
      return toast.error('Password must be strong and meet the criteria.', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }
  // if(val.name==="confirm")
  
   // Updating formData if validation does
   updatedFormData[val.name] = val.value;
   setFormData(updatedFormData);
  };

  const handleFormSubmit = async(e) => {
    if(token) return navigate('/chat');
    e.preventDefault();
    // console.log("handleFormSubmit",formData)
   await axios.post("http://localhost:5000/api/user/register",formData).then((res)=>{
    if(res.status!==201){
      return toast.error('Something went wrong', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    //  console.log("form data response",res);
     toast.success(`Welcome ${res.data.name}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      if(res.data.token){
        localStorage.setItem("signuptoken",res.data.token);
         activeTab(1);
      }
    }).catch(err=>console.log("Error in signup component",err))

  };

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex min-h-full flex-col justify-center px-2 sm:px-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://png.pngtree.com/element_our/png/20181229/vector-chat-icon-png_302635.jpg"
            alt="Reqister"
          />
          <h2 className="text-center text-xl font-bold text-gray-700 leading-9 tracking-tight">
            Create your account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-4" method="POST" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="username">User name</label>
              <div className="mt-1">
                <input
                  onChange={handleInputChange}
                  id="username"
                  name="name"
                  type="text"
                  autoComplete="username"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-gray-900 font-medium text-sm leading-6"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  onChange={handleInputChange}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-gray-900 font-medium text-sm leading-6"
              >
                Password
              </label>

              <div className="mt-1 relative">
                <input
                  onChange={handleInputChange}
                  id="password"
                  name="password"
                  type={showPassword?"text":"password"}
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 px-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
                <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="text-gray-900 font-medium text-sm leading-6"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  onChange={handleInputChange}
                  id="confirm_password"
                  name="confirmpassword"
                  type={showConfirm?"text":"password"}
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
                <button
                type="button"
                onClick={toggleConfirmVisibility}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirm ? 'Hide' : 'Show'}
              </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center my-3 max-[600px]:flex-col">
              <label
                htmlFor="profile_image"
                className="text-gray-900 font-medium text-sm leading-6"
              >
                Upload Image
              </label>
              <div>
                <input
                  onChange={handleInputChange}
                  type="file"
                  name="pic"
                  id="profile_image"
                  accept="image/*"
                  className="block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm leading-6"
                />
              </div>
            </div>
            <div>
              <Link
                to={"#"}
                className="font-semibold text-indigo-200  hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-900 py-1.5 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
