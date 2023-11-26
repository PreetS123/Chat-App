import React, { useState } from 'react'

export const Tooltip = ({text,children}) => {
    const [showTooltip,setShowTooltip]= useState(false);

    const handleMouseEnter=()=>{
       setShowTooltip(true);
    }
    const handleMouseLeave=()=>{
       setShowTooltip(false);
    }

  return (
    <div 
    className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
     {children}
     {
        showTooltip && 
        <div className='absolute z-10 w-40 p-2 -ml-5 bg-gray-800 text-white text-sm rounded-md shadow-sm'>{text}</div>
    }
    </div>
  )
}
