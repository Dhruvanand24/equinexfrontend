import { Table } from "antd";
import React from "react";

const MaterialRequestApproval = () => {
    const dataSource = [
        {
            "S.no": "1",
            OrderId: "1234",
            Department: "Initial",
            Requester: "me",
            DOO: "today",
            "List Of Materials": "view",
            Status: <span className='p-2 w-fit bg-green-400 rounded-md'>Approved</span>
        }
    ];
    
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "OrderId",
      dataIndex: "OrderId",
      key: "OrderId",
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "Requester",
      dataIndex: "Requester",
      key: "Requester",
    },
    {
      title: "DOO",
      dataIndex: "DOO",
      key: "DOO",
    },
    {
      title: "List Of Materials",
      dataIndex: "List Of Materials",
      key: "List Of Materials",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
  ];
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
        Material Requests Approval
      </p>

      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
        <div className="filtersection flex flex-wrap gap-[50px] p-4">
          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">Search Material</p>
            <div className="relative w-fit overflow-hidden">
              <input
                className=" w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Search by Name / ID"
              />
              <img
                className="absolute top-[5px] right-1 text-xl h-8 cursor-pointer p-2"
                src="search.png"
                alt=""
              />
            </div>
          </div>

          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">From Date</p>
            <div className="relative w-fit overflow-hidden">
              <input
                className=" w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Purchase Order No."
              />
              <img
                className="absolute top-0 right-0 text-xl h-10 cursor-pointer"
                src="/icons/Date.svg"
                alt=""
              />
            </div>
          </div>

          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">To Date</p>
            <div className="relative w-fit overflow-hidden">
              <input
                className=" w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Purchase Order No."
              />
              <img
                className="absolute top-0 right-0 text-xl h-10 cursor-pointer"
                src="/icons/Date.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        

        <hr className="bg-blue-500 h-1 mt-4" />
        <div className="max-w-full">
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialRequestApproval;
