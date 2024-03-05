import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';



const Main = () => {
  return (
      <div className='bg-background-0 h-screen font-roboto flex'>
        <Sidebar />
        <Outlet />
      </div>
    
  )
}

export default Main
