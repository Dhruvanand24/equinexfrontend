import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';



const Main = () => {
  return (
      <div className='bg-background-0 h-screen font-roboto flex'>
        <Sidebar />
        <div className='flex flex-col w-full bg-background-0 pl-5'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    
  )
}

export default Main
