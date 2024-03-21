import React, { useState } from "react";
import { Link } from "react-router-dom";

const Submenu = ({ isOpen, heading, submenuOptions }) => {
  return isOpen ? (
    <div className="flex flex-col z-10 absolute left-[255px] w-[256px] top-0 bg-white border-[#D9D9D9] border-[1px]">
      {/* Submenu heading */}
      <div className="px-4 bg-background-0 font-semibold py-4">{heading}</div>

      {/* Dynamic submenu options */}
      
      {submenuOptions?.map((option, index) => (
        <Link to={option.link}><div key={index} className="pl-8 text-[14px] hover:bg-background-0 p-1 text-sidebar-0 font-normal">
          {option.title}
        </div></Link>
      ))}
    </div>
  ) : null;
};

const SidebarOption = ({ title, icon, link, submenuOptions }) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const handleSubMenuToggle = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div
      className="flex items-center select-none cursor-pointer hover:font-semibold hover:text-accent-0 hover:bg-background-0 relative z-10 px-8 p-2"
      onMouseEnter={handleSubMenuToggle}
      onMouseLeave={handleSubMenuToggle}
    >
      <img src={icon} alt="" />
      <h1 className="ml-2">{title}</h1>
      <Submenu isOpen={isSubMenuOpen} heading={title} submenuOptions={submenuOptions} />
    </div>
  );
};

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handlechange = (event) => {
    setSearchTerm(event.target.value);
  };

  const submenuOptionsAllPartners = [
    { title: "Buyers & Suppliers", link: "/allpartners" },
    { title: "Employees", link: "/allemployees" },
  ];

  const submenuOptionsInventory = [
    {title : "All Warehouses", link: "/allwarehouse"}
  ]

  const submenuOptionsMaterial = [
    {title: "All Materials", link: "/allmaterials"},
    { title: "Material Requests", link: "/allmaterialrequests"},
    { title: "MR Approval", link: "approval/materialrequest"},
    {title: "Stock Check", link: "/store/materialrequeststorecheck"},
    {title: "Purchase Request", link: "/allpurchaserequests"},
    {title: "PR Approval", link: "/approval/pruchaserequest"}
    
  ];

  const submenuOptionsSettings = [
    { title: "My Profile", link: "/myprofile" },
    { title: "Change Plans", link: "/changeplans" },
  ];

  return (
    <div className="flex flex-col h-screen w-[270px] bg-white sticky top-0 left-0 relative z-10">
      <div className="flex w-full bg-accent-0 h-[65px] items-center px-4">
        <img className="h-[39px] w-[38px]" src="/equinexlogo.png" alt="" />
        <h1 className="text-white text-[24px] ml-2">Equinex</h1>
      </div>
      <div className="flex absolute left-[270px] top-0"></div>
      <div className="flex px-4 mt-8 relative">
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
      <div className="flex flex-col px-0 mt-8 text-sidebar-0 text-[16px] font-[500]">
        <SidebarOption title="Dashboard" icon="/sidebaricon.png" link="#" />
        <SidebarOption title="Inventory" icon="/sidebaricon.png" link="#" submenuOptions={submenuOptionsInventory} />
       <Link to="/allmaterials"> <SidebarOption title="Material" icon="/sidebaricon.png" link="#" submenuOptions={submenuOptionsMaterial} /></Link>
       <Link to="/allpartners"> <SidebarOption title="Partners" icon="/sidebaricon.png" submenuOptions={submenuOptionsAllPartners} /></Link>
        <Link to="/orderlist"><SidebarOption title="Orders" icon="/sidebaricon.png" link="#" /></Link>
        <SidebarOption title="Production" icon="/sidebaricon.png" link="#" />
        <SidebarOption title="Expenses" icon="/sidebaricon.png" link="#" />
        <SidebarOption title="Reports" icon="/sidebaricon.png" link="#" />
        <SidebarOption title="Integration" icon="/sidebaricon.png" link="#" />
        <Link to="/allemployees"><SidebarOption title="Settings" icon="/sidebaricon.png" link="/allemployees" submenuOptions={submenuOptionsSettings} /></Link>
      </div>
    </div>
  );
};

export default Sidebar;
