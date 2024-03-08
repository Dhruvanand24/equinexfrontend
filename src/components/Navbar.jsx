import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGetUser from '../hooks/useGetUser';

import { Button, Dropdown } from 'antd';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const handleLogout = () => {
  try {
    
  } catch (error) {
    
  }
  }
  const items = [
    {
      key: '1',
      label: (
        <p onClick={handleLogout}>Logout</p>
      ),
    }
    
  ];
  const { user, loading } = useGetUser();
  const kaifuser=useSelector(state=>state.user.currentUser);
  
  
  return (
    <div className='w-full flex h-[70px] px-4 items-center justify-between bg-white border-b'>
      <h1 className='font-[400] text-[24px] text-[#1A202C]'>Bird machines Pvt.Ltd (Bhagola)</h1>
      <Dropdown menu={{ items }} placement="bottomLeft">
      <Button>{kaifuser?.user?.fullName}</Button>
      </Dropdown>
    </div>
  )
}
export default Navbar
