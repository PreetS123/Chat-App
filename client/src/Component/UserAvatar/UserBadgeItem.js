import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';


export const UserBadgeItem = ({user,handleFunction}) => {
  return (
    <div className='px-2 py-1 rounded-lg m-1 mb-2 text-xs font-thin bg-purple-500 text-white cursor-pointer ' onClick={handleFunction}>
    {user.name}
    <AiOutlineClose  />
    </div>
  )
}
