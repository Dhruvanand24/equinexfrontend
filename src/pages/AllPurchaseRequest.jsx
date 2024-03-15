import React, { useEffect, useState } from "react";
import { Table, Modal, Button } from "antd";
import CreatePurchaseRequest from "../components/modals/CreatePurchaseRequest.modal";
import axios from "axios";

const AllPurchaseRequest = () => {

const [allPurchaseRequests, setAllPurchaseRequests] = useState([])

const fetch = async() => {
  try {
    const response = await axios.get("http://localhost:8000/api/v1/purchase/GetAllPurchaseOrder")
    setAllPurchaseRequests(response.data.data);
  } catch (error) {
    console.log(error)
  }
}

useEffect(()=> {
  fetch()
},[])

  
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Date",
      dataIndex: "Date_of_request",
      key: "Date_of_request",
      render: (text, record) =>(
        <p> {
         `${new Date(text).getDate()}-${new Date(text).getMonth()+1}-${new Date(text).getFullYear()}`
         }</p>
       )
    },
    {
      title: "Requester ID",
      dataIndex: "Requester",
      key: "Requester",
    },
  
    {
      title: "Status",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved, record) => (
        <div>
          {isApproved ? (
            <span className="p-2 w-fit bg-approved-0 bg-opacity-15 font-semibold text-approvedtext-0 rounded-md cursor-pointer">
              Approved
            </span>
          ) : (
            <span className="p-2 w-fit bg-pending-0 bg-opacity-15 text-pending-0 font-semibold rounded-md cursor-pointer">
              Pending
            </span>
          )}
        </div>
      ),
    }
  ];
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
        Purchase Requests
      </p>

      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
        <div className="filtersection flex flex-wrap gap-[50px] p-4">
          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">Search Request</p>
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

        <div className="flex w-full px-4">
          <div className="m-auto"></div>
          <button
            className=" px-4 py-2 bg-blue-500 rounded-[5px] text-white left-[85%] hover:bg-blue-600"
            onClick={() =>
              document
                .getElementById("create_new_purchase_request_modal")
                .showModal()
            }
          >
            + New Request
          </button>
          {/* <Modala /> */}
          <CreatePurchaseRequest />
        </div>

        <hr className="bg-blue-500 h-1 mt-4" />
        <div className="max-w-full">
          <Table
            dataSource={allPurchaseRequests}
            columns={columns}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AllPurchaseRequest;
