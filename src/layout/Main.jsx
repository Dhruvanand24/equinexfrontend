import React from 'react'
import { Outlet } from 'react-router-dom';



const Main = () => {
  return (
      <div className='flex w-full font-roboto'>
    
        <Outlet />
      </div>
    
  )
}

export default Main
