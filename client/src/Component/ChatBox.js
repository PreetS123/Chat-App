import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { SingleChat } from "./SingleChat";

export const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const { selectedChat } = ChatState();

  //  const widthBox= base=100% and md=68%

  return (
    <>
    
    <div
    className={`md:flex ${selectedChat ? 'flex' : 'hidden'} items-center flex-col p-3 bg-white w-full md:w-68% rounded-lg border border-gray-300 h-full`}
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
