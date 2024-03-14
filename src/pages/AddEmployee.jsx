import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Input } from 'antd';
import CreateEmployee from '../components/modals/CreateEmployee';
import axios from 'axios';
import { HiRefresh } from "react-icons/hi";

const AddEmployee = () => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/v1/users/getallusers");
      setAllEmployees(response.data.data);
      console.log(allEmployees)
    } catch (error) {
      console.error("Error fetching employees:", error);
      // Handle error gracefully, e.g., show error message to the user
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    
  }, []);

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'S.no',
      key: 'S.no',
      fixed: 'left',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Post',
      dataIndex: 'post',
      key: 'post',
    },
    {
      title: 'Warehouse',
      dataIndex: 'warehouseId',
      key: 'warehouseId',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (_, record) => (
        <div>
          {record ? (
            <span
              className="p-2 w-fit bg-approved-0 bg-opacity-15 font-semibold text-approvedtext-0 rounded-md cursor-pointer"
            >
              Active
            </span>
          ) : (
            <span
              className="p-2 w-fit bg-pending-0 bg-opacity-15 text-pending-0 font-semibold rounded-md cursor-pointer"
            >
              Inactive
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'Edit',
      key: 'Edit',
    }
  ];

  return (
    <div className='bg-white p-4 w-full flex flex-col justify-start items-start h-full'>
      <div className='flex items-center justify-between w-full'><p className='font-semibold text-[#4A5568] text-xl p-2 pl-0'>All Employees</p>
      <div onClick={fetchEmployees} className='flex items-center gap-1 px-2 py-1  bg-accent-0 bg-opacity-15 text-accent-0 ring-1 ring-accent-0 rounded-md hover:bg-opacity-30 select-none cursor-pointer'><HiRefresh/>refresh</div></div>

      <div className='w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2'>
        <div className='filtersection flex flex-wrap gap-[50px] p-4'>
          {/* Filter component goes here */}
          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">Name/Phone</p>
            <div className="relative w-fit overflow-hidden">
              <Input
                className=" w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Name/Phone"
                // value={searchtext}
                // onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className='flex w-full px-4'>
          <div className='m-auto'></div>
          <button className="px-4 py-2 bg-blue-500 rounded-[5px] text-white left-[85%] hover:bg-blue-600" onClick={() => document.getElementById('create_new_employee_modal').showModal()}>+ Add Employee</button>
          <CreateEmployee />
        </div>
        
        <hr className='bg-blue-500 h-1 mt-4' />
        <div className='max-w-full'>
          <Table dataSource={allEmployees} columns={columns} scroll={{ x: 500 }} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
