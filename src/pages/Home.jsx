import React, { useEffect, useState } from 'react'
import useGetUser from '../hooks/useGetUser';


const Home = () => {
 

  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ];

  

  
  return (
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost ">
        <div className="">
          Select process
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        {
          options.map((ele) => <div className=''>
          <label htmlFor="po"  ><input name='po' type="checkbox" />{ele}</label>
        </div>)
        }
      </ul>
    </div>
  )
}

export default Home
