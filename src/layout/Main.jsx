import React from 'react'
import { Outlet } from 'react-router-dom';



const Main = () => {
  return (
      <div className='bg-background-0 h-screen font-roboto'>
    
        <Outlet />
      </div>
    
  )
}

export default Main
