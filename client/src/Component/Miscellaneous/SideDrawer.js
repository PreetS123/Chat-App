import React, { useState } from "react";
import { Tooltip } from "./Tooltip";
import { BsSearch } from "react-icons/bs";
import { ChatState } from "../../Context/ChatProvider";
import { removeToken } from "../../config/User";
import { ProfileModal } from "./ProfileModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatLoading } from "./ChatLoading";
import { UserListItem } from "../UserAvatar/UserListItem";
import { ChatSpinner } from "./ChatSpinner";
import axios from "axios";

export const SideDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const openDropdown = () => {
    setIsOpen(true);
  };
  const closeDropdown = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 1500);
  };
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { user,setSelectedChat,chats,setChats } = ChatState();

  const userDetailsModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // function for drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearch = () => {
    if (!search || search.length <= 3) {
      return toast.error("Please enter something", {
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
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.get(`http://localhost:5000/api/user?search=${search}`, config)
      .then((res) => {
        setLoading(false);
        // console.log("sidebar response",res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log("sidedrawer", err);
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
      });
  };

  const accessChat = (userId) => {
    setLoadingChat(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    axios.post('http://localhost:5000/api/chat',{userId},config)
      .then((res) => {
        // console.log("response of data as per userId",res.data);
        if(!chats.find((c)=>c._id===res.data._id)) setChats([res.data,...chats])
        setSelectedChat(res.data);
        setLoadingChat(false);
        closeDrawer();
      })
      .catch((err) => {
        console.log("error in fetching single data", err.message);
        return toast.error("Error in fetching data", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
      <div className="w-[full] bg-black flex items-center justify-between">
        <Tooltip text="Search users to chat">
          <button
            onClick={openDrawer}
            className=" m-1 flex gap-1 items-center px-4 py-1 bg-gray-200 hover:bg-gray-200 text-white rounded-r-md"
          >
            Search User <BsSearch />
          </button>
        </Tooltip>

        <p className="text-2xl font-sans text-white">Chats on your own</p>
        <div>
          <div
            className="relative inline-block text-left"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {user.name}
                <svg
                  className={`-mr-1 h-5 w-5 text-gray-400 ${
                    isOpen ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <p
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Notification
                  </p>
                  <p
                    onClick={userDetailsModal}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-1"
                  >
                    My Profile
                  </p>
                </div>
                <div className="py-1" role="none">
                  <p
                    onClick={removeToken}
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-6"
                  >
                    Logout
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex">
        {/* Drawer content */}
        {isDrawerOpen && (
          <div className="w-64 h-screen bg-white fixed left-0 top-0 shadow-lg z-50">
            {/* Your drawer content here */}

            {/*first drawer starts here */}
            <div className="w-full mt-1">
              <div className="p-2 flex gap-2 items-center">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search by name or email"
                  className="p-1 rounded-md border border-gray-300 focus:border-gray-200 hover:border-gray-200"
                />
                <button
                  onClick={handleSearch}
                  className="w-12 rounded-lg bg-gray-200 hover:bg-gray-200 text-gray-900 p-1"
                >
                  Go
                </button>
              </div>
              <hr />
            </div>
            {/** drawer body starts here */}
            <div className="p-2">
              {loading ? (
                <ChatLoading />
              ) : searchResult.length > 0 ? (
                <>
                  {searchResult?.map((el, i) => {
                    return (
                      <UserListItem
                        key={i}
                        data={el}
                        handleFunction={() => accessChat(el._id)}
                      />
                    );
                  })}
                </>
              ) : (
                <>
                  <p>No data found </p>
                </>
              )}
              {loadingChat && <ChatSpinner className="float-right absolute bottom-0" />}

            </div>

            {/**drawer footer starts here */}
            <div className="w-full absolute bottom-0 p-1 ">
              <hr className="p-1" />
              <button
                onClick={closeDrawer}
                className="bg-red-900 hover:bg-red-900  text-white p-2 float-right rounded-sm"
              >
                Close Drawer
              </button>
            </div>
          </div>
        )}
      </div>
      <ProfileModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        user={user}
      />
    </>
  );
};
