import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { BsEye } from "react-icons/bs";
import { SingleChat } from "./SingleChat";

export const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();

  return (
    <>
    
    <div
      className="bg-white px-2 py-4 rounded-lg w-full flex flex-col justify-center items-center"
    >
      {/*first top box*/}
      

      {/**chat displaying here */}
        <div className="bg-gray-200 w-full border">
        <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </div>

    </div>
    </>
  );
};
