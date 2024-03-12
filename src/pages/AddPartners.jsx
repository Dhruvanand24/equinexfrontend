import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Tag, Input } from "antd";
import CreateEmployee from "../components/modals/CreateEmployee";
import CreateBuyer from "../components/modals/CreateBuyer";
import CreateSeller from "../components/modals/CreateSeller";
import axios from "axios";
import Fuse from "fuse.js";

const AddPartners = () => {
  const [selectedPost, setSelectedPost] = useState("");
  const [allBuyers, setAllBuyers] = useState([]);
  const [allSellers, setAllSellers] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);

  const AllBuyers = [
    { name: "All" },
    { name: "Buyers" },
    { name: "Sellers" },
    { name: "Both" },
  ];

  const columns = [
    {
      title: "S.no",
      dataIndex: "index",
      key: "index",
      fixed: "left",
      render: (text, record, index) => index + 1,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, { type }) => {
        let color = type === "Seller" ? "geekblue" : "green";
        return (
          <Tag color={color} key={type}>
            {type ? type.toUpperCase() : ""}
          </Tag>
        );
      },
    },
    {
      title: "Phone no.",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const buyersResponse = await axios.get(
          "http://localhost:8000/api/v1/buyer/getallbuyers"
        );
        const sellersResponse = await axios.get(
          "http://localhost:8000/api/v1/seller/getallsellers"
        );

        // Add 'type' field to each document
        const buyersWithTypes = buyersResponse.data.data.map((buyer) => ({
          ...buyer,
          type: "Buyer",
        }));
        const sellersWithTypes = sellersResponse.data.data.map((seller) => ({
          ...seller,
          type: "Seller",
        }));

        // Set the state with the modified data
        setAllBuyers(buyersWithTypes);
        setAllSellers(sellersWithTypes);

        // Combine buyers and sellers based on the selectedPost filter
        if (selectedPost === "Buyers") {
          setAllPartners(buyersWithTypes);
        } else if (selectedPost === "Sellers") {
          setAllPartners(sellersWithTypes);
        } else {
          setAllPartners([...buyersWithTypes, ...sellersWithTypes]);
        }
        console.log(allPartners);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [selectedPost]);

  // Fuzzy search functionality
  const handleSearch = (searchValue) => {
    const fuse = new Fuse(allPartners, { keys: ["name"], threshold: 0.3 });
    const filteredPartners = searchValue
      ? fuse.search(searchValue)
      : allPartners;
    setFilteredPartners(
      filteredPartners.map((partner, index) => ({
        ...partner.item,
        index: index + 1,
      }))
    );
    console.log(filteredPartners.length);
  };

  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
        All Partners
      </p>

      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
        <div className="filtersection flex flex-wrap gap-[50px] p-4">
          <div className=" flex flex-col gap-1">
            <p className="text-[#718096] text-sm">Name</p>
            <div className="relative w-fit overflow-hidden">
              <Input
                className="w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                type="text"
                placeholder="Name"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>

          {/* ... other filter sections ... */}

          <div className="flex flex-col gap-1">
            <p className="text-[#718096] text-sm">Type</p>
            <div className="w-fit overflow-hidden">
              <select
                className="w-[256px] h-[42px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500"
                onChange={(e) => setSelectedPost(e.target.value)}
              >
                <option disabled selected className="bg-white">
                  Select Type
                </option>
                {AllBuyers.map((ele) => (
                  <option key={ele.name} value={ele.name} className="bg-white">
                    {ele.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-4 px-4">
          <div className="m-auto"></div>
          <button
            className=" px-4 py-2 bg-blue-500 rounded-[5px] text-white left-[85%] hover:bg-blue-600"
            onClick={() =>
              document.getElementById("create_new_buyer_modal").showModal()
            }
          >
            + Add Buyer
          </button>
          <button
            className=" px-4 py-2 bg-blue-500 rounded-[5px] text-white left-[85%] hover:bg-blue-600"
            onClick={() =>
              document.getElementById("create_new_seller_modal").showModal()
            }
          >
            + Add Seller
          </button>
          <CreateBuyer />
          <CreateSeller />
        </div>

        <hr className="bg-blue-500 h-1 mt-4" />
        <div className="max-w-full">
          <Table
            dataSource={
              filteredPartners?.length===allPartners?.length || filteredPartners.length===0 ? allPartners : filteredPartners
            }
            columns={columns}
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPartners;
