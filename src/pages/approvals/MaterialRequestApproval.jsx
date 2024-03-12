import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowMaterials from "../../components/modals/ShowMaterials.modal";

const MaterialRequestApproval = () => {
  // const dataSource = [
  //     {
  //         "S.no": "1",
  //         OrderId: "1234",
  //         Department: "Initial",
  //         Requester: "me",
  //         DOO: "today",
  //         "List Of Materials": "view",
  //         Status: <span className='p-2 w-fit bg-green-400 rounded-md'>Approved</span>
  //     }
  // ];

  const [dataSource, setDataSouurce] = useState([]);
  const [allDepartment,setAllDepartment] = useState([]);
  const [allRequests,setAllRequests]=useState([]);
  const [requestMaterial, setRequestMaterial]=useState([]);
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
      title: "MR ID",
      dataIndex: "MR ID",
      key: "MR ID",
    },
    {
      title: "Department",
      dataIndex: "Department",
      key: "Department",
    },
    {
      title: "DOO",
      dataIndex: "DOO",
      key: "DOO",
    },
    {
      title: "List Of Materials",
      key: "action",
      render: (_, record) => (
        <span
          className="p-2 px-4 w-fit bg-green-400 rounded-md cursor-pointer"
          onClick={() => showMaterials(record["MR ID"])}
        >
          view
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
    },
  ];
  const showMaterials = (_id) => {
    console.log(_id);
    
      const request = allRequests.find(
        (item) => item._id === _id
      );
      console.log(request.List_of_materials);
      setRequestMaterial(request.List_of_materials);
      document.getElementById("show_material_modal").showModal();
  };

  const fetchdata = async () => {
    try {
      const responseMaterialRequest = await axios.get(
        "http://localhost:8000/api/v1/material/getallmaterialrequest"
      );
      const allmaterialrequests = responseMaterialRequest.data.data;
      setAllRequests(allmaterialrequests);
      const responseAllDepartment = await axios.get(
        "http://localhost:8000/api/v1/department/getalldepartment"
      );
      const alldepartments = responseAllDepartment.data.data;
      console.log(alldepartments);
      setAllDepartment(alldepartments);
      allmaterialrequests.forEach((e, index) => {
        const dateString = new Date(e?.Date_of_request);
        const department = alldepartments.find(
          (item) => item._id === e?.Department_request_raise
        );

        const data = {
          "S.no": index + 1,
          OrderId: e?.Order_Id,
          "MR ID": e?._id,
          Department: department?.name,
          DOO: `${dateString.getDate()}-${dateString.getMonth()}-${dateString.getFullYear()}`,

          Status: e?.Status_approval.isapproved ? (
            <span className="p-2 w-fit bg-green-400 rounded-md cursor-pointer">
              Approved
            </span>
          ) : (
            <span className="p-2 w-fit bg-red-400 rounded-md cursor-pointer">
              pendding
            </span>
          ),
        };

        // Corrected: Use array spread to append the new data object to the dataSource array
        setDataSouurce((prevDataSource) => [...prevDataSource, data]);
      });

      console.log(dataSource);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
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
        <ShowMaterials data={requestMaterial}/>
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
