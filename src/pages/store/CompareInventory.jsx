import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WarehouseRequest from "../../components/modals/WarehouseRequest.modal";

const CompareInventory = () => {
  const { id } = useParams();
  console.log(id);
  const [dataSource, setDataSource] = useState([]);
  const [material_id,setMaterial_id]=useState(null);
  const showWarehouseStockModal= (Material_id)=>{
    console.log(Material_id);
    setMaterial_id(Material_id);
    document.getElementById('create_warehouse_request_modal').showModal();
  }
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Material ID",
      dataIndex: "Material ID",
      key: "Material ID",
    },
    {
      title: "Material Name",
      dataIndex: "Material Name",
      key: "Material Name",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "InStock",
      type: "action",
      render: (_, record) =>
        record.StockStatus ? (
          <span className="p-2 px-4 w-fit bg-primary-0 bg-opacity-15 font-semibold  text-primary-0 rounded-md">
           
            In Stock
          </span>
        ) : (
          <span className="p-2 px-4 w-fit bg-red-400 bg-opacity-15 font-semibold  text-red-600 rounded-md">
            No Stock
          </span>
        ),
    },

    {
      title: "Manage",
      type: "action",
      render: (_, record) =>
        record.StockStatus ? (
          <span
            className="p-2 px-4 w-fit bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer"
            onClick={() => showWarehouseStockModal(record["Material ID"])}
          >
            View
          </span>
        ) : (
          <span className="p-2 px-4 w-fit flex flex-nowrap bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer">
            Add to Cart
          </span>
        ),
    },
  ];

  const fetchdata = async () => {
    try {
      const materialrequest = await axios.post(
        "http://localhost:8000/api/v1/material/getmaterialrequestbyid",
        {
          materialRequest_id: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(materialrequest.data.data);
      const requestdata = materialrequest.data.data;
      const fetchedData = [];
      await Promise.all(requestdata?.List_of_materials.map(async (e, index) => {
        const material = await axios.post(
          "http://localhost:8000/api/v1/material/getmaterialbyid",
          {
            material_id: e.material_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log(material.data.data);
        const data = {
          "S.no": index + 1,
          "Material ID": e?.material_id,
          "Material Name": material?.data.data.Name,
          Quantity: e?.quantity,
          StockStatus: true,
        };
        console.log(data);
        fetchedData.push(data);
      }));
  
      // Sort fetchedData array based on the "S.no" index
      fetchedData.sort((a, b) => a["S.no"] - b["S.no"]);
  
      // Update dataSource with the sorted fetchedData
      setDataSource(fetchedData);
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
        Warehouse request Manage
      </p>
      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
        <hr className="bg-blue-500 h-1 mt-4" />
        <WarehouseRequest id={material_id}/>
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

export default CompareInventory;
