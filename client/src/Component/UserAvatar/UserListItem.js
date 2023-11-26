import React from 'react';


export const UserListItem = ({data,handleFunction}) => {

  return (
    <>
    <div
    onClick={handleFunction}
    className="mt-2 p-1 bg-gray-100 flex gap-2 rounded-md items-center"
  >
    <div className="rounded-l-3xl">
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        alt="..."
        className="rounded-md w-10"
      />
    </div>
    <div className="leading-snug">
      <p className="text-gray-500 text-xs">{data.name}</p>
      <p className="text-gray-500">
        <strong className="text-xs">Email:</strong>
        <span className="text-xs">{data.email}</span>
      </p>
    </div>
  </div>
    </>
  )
}
