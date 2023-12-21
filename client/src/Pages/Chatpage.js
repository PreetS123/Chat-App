import React, { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { SideDrawer } from "../Component/Miscellaneous/SideDrawer";
import { ChatBox } from "../Component/ChatBox";
import { MyChats } from "../Component/MyChats";

export const Chatpage = () => {
  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full">
      {user && <SideDrawer />}
      <div className='flex justify-between p-1 w-full h-["91.5vh"]'>
        <div className="w-2/5 m-2">
          {user && (
            <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
        <div className="w-3/5 m-2">
          {user && (
            <ChatBox
              className="hidden md:block"
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
            />
          )}
        </div>
      </div>
    </div>
  );
};
