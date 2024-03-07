import React, { useState } from "react";
import { Table, Modal, Button } from "antd";
import CreateMaterial from "../components/modals/CreateMaterial.model";

const AllMaterials = () => {
  const dataSource = [];
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Post",
      dataIndex: "Post",
      key: "Post",
    },
    {
      title: "Warehouse",
      dataIndex: "Warehouse",
      key: "Warehouse",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
    },
  ];
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
        All Materials
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
        </div>

        <div className="flex w-full px-4">
          <div className="m-auto"></div>
          <button
            className=" px-4 py-2 bg-blue-500 rounded-[5px] text-white left-[85%] hover:bg-blue-600"
            onClick={() =>
              document.getElementById("create_new_material_modal").showModal()
            }
          >
            + Add Material
          </button>
          {/* <Modala /> */}
          <CreateMaterial />
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

export default AllMaterials;
