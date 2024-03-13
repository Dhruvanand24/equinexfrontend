import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import TempSidebar from '../components/TempSidebar';




const Main = () => {
  
  return (
      <div className='bg-background-0 font-roboto flex'>
        {/* <Sidebar /> */}
        <TempSidebar />
        <div className='flex flex-col w-full bg-background-0 pl-5'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    
  )
}

export default Main
