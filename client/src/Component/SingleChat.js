import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { BsArrowLeft, BsEye } from "react-icons/bs";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { ProfileModal } from "./Miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./Miscellaneous/UpdateGroupChatModal";
import { ChatSpinner } from "./Miscellaneous/ChatSpinner";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { ScrollableChat } from "./ScrollableChat";

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();


  // function to fetch message
   const fetchMessages= async()=>{
    if(!selectedChat) return;
    try{
       const config={
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${user.token}`,
        }
       };
       setLoading(true);
       const {data}= await axios.get(`http://localhost:5000/api/msg/${selectedChat._id}`,config)
       console.log(data);
       setMessages(data);
       setLoading(false);
    }catch(err){
      console.log("fetchin message",err);
    }
   }
  // function to send messages
  const sendMessages=async(e)=>{
  if(e.key==="Enter" && newMessage){
       try{
        const config={
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${user.token}`
          }
        };
        setNewMessage("");
        const {data} = await axios.post("http://localhost:5000/api/msg",{
          content:newMessage,
          chatId:selectedChat._id,
        },config)
        console.log(data)
        setMessages([...messages,data])
       }catch(err){
         console.log("sendMessage",err);
         setLoading(false);
         return toast.error("API error!", {
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
  }
  const typeingHandler=(e)=>{
    setNewMessage(e.target.value);
    
    //typing indicator logic here
  }

  // console.log('selected',selectedChat)
  const userDetailsModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //function to open update modal
  const updateModelOpen = () => {
    setIsUpdateModalOpen(true);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  useEffect(()=>{
      fetchMessages();
  },[selectedChat])
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
      {selectedChat ? (
        <>
          <div className="w-full font-sans flex flex-col justify-between items-center p-2 border">
            {/**this should only appear in small screen */}
            <div className="w-full">
              {!selectedChat.isGroupChat ? (
                <>
                  <div className="w-full sticky flex justify-between">
                    <BsArrowLeft onClick={() => setSelectedChat("")} />
                    <div className="flex gap-1">
                      {getSender(user, selectedChat.users)}

                      <button
                        className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1"
                        onClick={userDetailsModal}
                      >
                        <BsEye className="font-semibold text-gray-900" />
                      </button>
                    </div>
                  </div>
                  <ProfileModal
                  user={getSenderFull(user, selectedChat.users)}
                  closeModal={closeModal}
                  isModalOpen={isModalOpen}
                />
                  <div className="w-full h-screen flex flex-col justify-end bg-gray-400 mt-2 overflow-y-hidden">
                    {/* Message Here*/}
                    {loading ? (
                      <ChatSpinner />
                    ) : (
                      <>
                        <div className="messages">
                        {/*Messages*/}
                        <ScrollableChat messages={messages}/>
                        </div>
                      </>
                    )}
                    <div className="w-full h-10 sticky bottom-0 p-1" onKeyDown={sendMessages}>
                      <input
                        type="text"
                        className="w-full rounded-md h-full px-3"
                        placeholder="Enter a  message..."
                        
                        onChange={typeingHandler}
                        value={newMessage}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-2 items-center">
                  {selectedChat.chatName.toUpperCase()}
                  <button
                    className="w-fit h-fit bg-gray-200 rounded-md px-2 py-1"
                    onClick={updateModelOpen}
                  >
                    <BsEye className="font-semibold text-gray-900" />
                  </button>
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                    closeModal={closeUpdateModal}
                    isModalOpen={isUpdateModalOpen}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full max-h-full bg-white flex items-center justify-center">
            <p className="text-3xl pb-3 font-sans text-gray-500">
              Click on a user to start chatting
            </p>
          </div>
        </>
      )}

     
    </>
  );
};
