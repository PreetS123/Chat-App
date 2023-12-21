import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import { ChatSpinner } from "./ChatSpinner";
import { UserListItem } from "../UserAvatar/UserListItem";
import { ToastContainer, toast } from "react-toastify";

const UpdateGroupChatModal = ({
  fetchMessages,
  fetchAgain,
  setFetchAgain,
  isModalOpen,
  closeModal,
}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      return toast.error("Only admin can remove someone", {
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
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupremove",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      // fetchMessages();
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      return toast.error("Error occured", {
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
  };
  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      return toast.error("User already in group!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }); //return toast here
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      return toast.error("Only admin can add someone!", {
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

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupadd",
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setGroupChatName("");
      return toast.error(`${err.response.data.message}`, {
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
  };
  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (err) {
      console.log(err);
      setRenameLoading(false);
      setGroupChatName("");
      return toast.error("Error occured", {
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
  };
  const handleSearch = async (query) => {
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
    await axios
      .get(`http://localhost:5000/api/user?search=${search}`, config)
      .then((res) => {
        setLoading(false);
        // console.log("updated groupchatmodal handleSearch", res.data);
        setSearchResult(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log("groupchatmodal", err.message);
        return toast.error("Error occured!", {
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
    <div>
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
      {isModalOpen && (
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={closeModal}
          ></div>

          <div
            onClick={handleOutsideClick}
            className="fixed inset-0 flex items-center justify-center z-10 w-screen overflow-y-auto"
          >
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:max-w-md p-4">
              {/* Your modal content here */}
              <p className="font-sans text-[35px] text-center">
                {selectedChat.chatName}
              </p>

              <div className="w-full flex flex-wrap pb-2 mt-1">
                {selectedChat.users?.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    user={u}
                    handleFunction={() => handleRemove(u)}
                  />
                ))}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Chat Name"
                  className="mb-2"
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <button
                  className="text-white ml-1 bg-teal-500 hover:bg-teal-500 rounded-md px-2 py-1"
                  onClick={handleRename}
                  loading={renameLoading}
                >
                  Update
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Add users to group"
                  className="mb-2"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {loading ? (
                  <ChatSpinner />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      data={user}
                      handleFunction={() => handleAddUser(user)}
                    />
                  ))
                )}
              </div>

              <div className="border-t border-gray-200 p-2 flex justify-end gap-1">
                <button
                  onClick={() => handleRemove(user)}
                  className="text-white bg-red-800 hover:bg-red-800 rounded-md px-2 py-1"
                >
                  Leave Group
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
    </div>
  );
};

export default UpdateGroupChatModal;
