import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handlechange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div className="flex flex-col h-screen w-[270px] bg-white sticky top-0 left-0">
      <div className="flex w-full bg-accent-0 h-[65px] items-center px-4">
        <img className="h-[39px] w-[38px]" src="/equinexlogo.png" alt="" />
        <h1 className="text-white text-[24px] ml-2">Equinex</h1>
      </div>
      <div className="flex px-4 mt-8">
        <div className="flex w-full px-4 p-3 rounded-lg shadow-md bg-background-0 items-center ring-1 ring-slate-400">
          <img src="/search.png" alt="" />
          <input
            type="text"
            value={searchTerm}
            onChange={handlechange}
            className="bg-transparent border-none text-text-0 focus:outline-none focus:border-none ml-2 caret-slate-500"
            placeholder="search"
          />
        </div>
      </div>
      <div className="flex flex-col px-8 mt-8 text-sidebar-0 text-[16px] font-[500] gap-4">
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Dashboard</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Inventory</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Sales & purchase</h1>
        </div>
        <Link to="/allpartners"><div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Partners</h1>
        </div></Link>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Transport</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Production</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Expenses</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Reports</h1>
        </div>
        <div className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Integration</h1>
        </div>

       <Link to="allemployees"> <div className="flex items-center select-none cursor-pointer mt-auto hover:font-semibold hover:text-accent-0">
          <img src="/sidebaricon.png" alt="" />
          <h1 className="ml-2">Settings</h1>
        </div></Link>
       
      </div>
    </div>
  );
};

export default Sidebar;
