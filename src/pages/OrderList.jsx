import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import Modala from "../components/modals/Modal.jsx";

const OrderList = () => {
  const dataSource = [
    {
      key: "1",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "2",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "3",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "4",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "5",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "6",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "7",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "8",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "9",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "10",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "11",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "12",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "13",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "14",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
    {
      key: "15",
      "S.no": "1",
      "Order Id": 12,
      DOO: "10 Downing Street",
      Buyer: "RAMLakhan",
      Details: "hello",
      "Deal Amount": 12321,
      "Amount Paid": 123123,
      "Amount Due": 1223,
      Deadline: 21434,
      "Delivery Date": 21323,
      Receipt: 12312,
    },
  ];
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Order Id",
      dataIndex: "Order Id",
      key: "Order Id",
    },
    {
      title: "DOO",
      dataIndex: "DOO",
      key: "DOO",
    },
    {
      title: "Buyer",
      dataIndex: "Buyer",
      key: "Buyer",
    },
    {
      title: "Details",
      dataIndex: "Details",
      key: "Details",
    },
    {
      title: "Deal Amount",
      dataIndex: "Deal Amount",
      key: "Deal Amount",
    },
    {
      title: "Amount Paid",
      dataIndex: "Amount Paid",
      key: "Amount Paid",
    },
    {
      title: "Amount Due",
      dataIndex: "Amount Due",
      key: "Amount Due",
    },
    {
      title: "Dead line",
      dataIndex: "Dead line",
      key: "Dead line",
    },
    {
      title: "Delivery Date",
      dataIndex: "Delivery Date",
      key: "Delivery Date",
    },
    {
      title: "Recipt",
      dataIndex: "Recipt",
      key: "Recipt",
      fixed: "right",
    },
  ];
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
        All Orders
      </p>

      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
        <div className="filtersection flex flex-wrap gap-[50px] p-4">
          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">PR No.</p>
            <div className="relative w-fit overflow-hidden">
              <input
                className=" w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Purchase Order No."
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
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            + Create Order
          </button>
          <Modala />
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

export default OrderList;
