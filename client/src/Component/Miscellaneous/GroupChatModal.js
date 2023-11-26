import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChatState } from "../../Context/ChatProvider";
import { AxiosInstance } from "../../config/AxiosInstance";
import { UserListItem } from "../UserAvatar/UserListItem";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";

export const GroupChatModal = ({ children }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = ChatState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    setLoading(true);
    AxiosInstance.get(`/api/user?search=${query}`, config)
      .then((res) => {
        setLoading(false);
        // console.log("groupchatmodal handleSearch", res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        setLoading(true);
        console.log("groupchatmodal", err.message);
        return toast.error("Error in retriving data", {
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
  const handleSubmit = () => {
    if (!groupChatName || !selectedUsers) {
      return toast.error("Please fill all the required field", {
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

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    AxiosInstance.post(
      "/api/chat/group",
      {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      },
      config
    )
      .then((res) => {
        // console.log(res.data);
        setChats([res.data, ...chats]);
        closeModal();
        toast.success("New Group Chat is created!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err.message);
        return toast.error("Failed to create group chat.", {
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

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return toast.success("User already added", {
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
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleDelete = (deluser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deluser._id));
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
      <span onClick={openModal}>{children}</span>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 w-screen min-w-['40%'] overflow-y-auto">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>

          <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center z-10 w-screen overflow-y-auto"
          >
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:max-w-md px-2 py-4">
              {/* Your modal content here */}
              {/*header of modal*/}
              <div className="p-1 border-b border-gray-100">
                <p className="text-3xl font-sans text-center">
                  Create Group Chat
                </p>
              </div>
              {/** body of modal */}
              <div className="flex flex-col items-center p-2">
                <input
                  type="text"
                  placeholder="Chat Name"
                  className="mb-3 p-2 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Add Users"
                  className="mb-3 p-2 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <div className="flex flex-wrap w-full">
                  {/** show selected user */}
                  {selectedUsers?.map((user) => (
                    <UserBadgeItem
                      key={user._id}
                      user={user}
                      handleFunction={() => handleDelete(user)}
                    />
                  ))}
                </div>

                {/** render search user here */}
                {loading ? (
                  <>loading</>
                ) : (
                  searchResult
                    ?.slice(0, 4)
                    ?.map((user) => (
                      <UserListItem
                        key={user._id}
                        data={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                )}
              </div>
              <div className="border-t border-gray-200 p-2 flex justify-end gap-1">
                <button
                  onClick={handleSubmit}
                  className="text-white bg-green-800 hover:bg-green-800 rounded-md px-2 py-1"
                >
                  Create
                </button>
                <button
                  onClick={closeModal}
                  className="text-white bg-red-800 hover:bg-red-800 rounded-md px-2 py-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
