import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AxiosInstance } from "../config/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setToken } from "../config/User";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // const token = JSON.parse(localStorage.getItem("token"));
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmail = (e) => {
    let val = e.target;
    setEmail(val.value);
  };
  const handlePassword = (e) => {
    let val = e.target;
    setPassword(val.value);
  };
  const handleSubmit = async () => {
    // if (token) return navigate("/chat");
    let formData = {
      email: email,
      password: password,
    };
    setLoading(false);
    await AxiosInstance.post("/api/user/login", formData)
      .then((res) => {
        // console.log('login page',res);
        if (res.status !== 200) {
          return toast.error("Something went wrong", {
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
        if (res.data.token) {
          // localStorage.setItem("userInfo", JSON.stringify(res.data));
          setToken(res.data);
          navigate("/chat");
          setLoading(true);
        }
      })
      .catch((err) => {
        console.log("Error in login component", err.message);
      });
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
      <div className="flex min-h-full flex-col justify-center px-4 sm:px-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="https://png.pngtree.com/element_our/png/20181229/vector-chat-icon-png_302635.jpg"
            alt="Reqister"
          />
          <h2 className="text-center text-xl font-bold text-gray-700 leading-9 tracking-tight">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="text-gray-900 font-medium text-sm leading-6"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  onChange={handleEmail}
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6 "
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div>
                <Link
                  to={"#"}
                  className="font-semibold text-indigo-50  hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="mt-1 relative">
                <input
                  onChange={handlePassword}
                  id="password"
                  name="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  autoComplete="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 font-medium focus:ring-2 focus:ring-inset focus:ring-blue-300 sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-blue-900 py-1.5 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-950"
                onClick={handleSubmit}
                disabled={loading}
              >
               {loading?"Logging Inn":"Login In"} 
              </button>
            </div>
            <div>
              <button
                className="flex w-full justify-center rounded-md bg-red-900 py-1.5 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-950"
                onClick={() => {
                  setEmail("guestuser@gmail.com");
                  setPassword("guest@123");
                }}
              >
                Login as guest user
              </button>
            </div>
          </div>
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to="#" className="font-semibold leading-6 text-blue-900">
              Click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
