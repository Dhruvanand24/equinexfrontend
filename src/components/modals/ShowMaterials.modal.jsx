import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowMaterials = (props) => {
  const [allData, setAllData] = useState([]);
  const [mrid, setMrid] = useState("");
  console.log(props);
  const Approve = async() => {
    console.log(mrid);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/material/updatematerialrequest', {
       _id: mrid,
        Status:true
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    
  }

  const Hold = async() => {

    try {
      const response = await axios.post('http://localhost:8000/api/v1/material/updatematerialrequest', {
        _id: mrid,
        Status:false
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    setAllData(props.data);
    setMrid(props.id);
  }, [props.data]);

  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Material name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "material_id",
      key: "material_id",
    },
    {
      title: "Quanitity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <dialog id="show_material_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full w-full">
          <form className="flex flex-col h-full w-full p-5" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              All Materials List
            </h3>
            <hr />
            <Table columns={columns} dataSource={allData} />
            <div className="flex justify-evenly mt-8">
              <button onClick={Approve} className="bg-approved-0 text-approvedtext-0 bg-opacity-15 p-2 px-4 rounded-md">Approve</button>
              <button onClick={Hold} className="bg-[#FFAE1F] text-[#FFAE1F] bg-opacity-15 p-2 px-4 rounded-md">Hold</button>
              <button className="bg-pending-0 text-pending-0 bg-opacity-15 p-2 px-4 rounded-md">Delete</button>
            </div>
            <button
              htmlFor="show_material_modal"
              onClick={() =>
                document.getElementById("show_material_modal").close()
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ShowMaterials;
