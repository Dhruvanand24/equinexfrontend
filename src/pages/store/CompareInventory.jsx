import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WarehouseRequest from "../../components/modals/WarehouseRequest.modal";

const CompareInventory = () => {
  const { id } = useParams();
  console.log(id);
  const [dataSource, setDataSource] = useState([]);
  const [material_Data, setMaterialData] = useState({});
  const showWarehouseStockModal = (Material_Data) => {
    console.log(Material_Data);
    setMaterialData(Material_Data);
    document.getElementById("create_warehouse_request_modal").showModal();
  };
  const updateRecordInTableData = (updatedRecord) => {
    setDataSource((prevData) => {
      // Find the index of the record to update
      const index = prevData.findIndex(
        (record) => record["S.no"] === updatedRecord["S.no"]
      );
      if (index !== -1) {
        // Create a new array with the updated record
        const newData = [...prevData];
        newData[index] = updatedRecord;
        return newData;
      }
      return prevData;
    });
  };
  const CreatePurchaseRequest = async (datas) => {
    console.log(datas);
    
    try {
      const data = {
        List_of_materials: [{ material_id: datas["Material ID"], quantity: datas.Quantity }],
      };
      const response = await axios.post(
        "http://localhost:8000/api/v1/purchase/createpurchaserequest",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      setTimeout(() => {
        alert(response.data.message);
      }, 500);
      const updatedRecord = { ...datas, pr: !datas.pr };
       updateRecordInTableData(updatedRecord);
      
    } catch (error) {
      
      console.log("failed", error);
      setTimeout(() => {
        alert(error.response.data.message);
      }, 500);
    }
  };

  
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
          <span className="p-2 px-4 w-fit  font-semibold  text-primary-0 rounded-md">
            {record.StockQuantity}
          </span>
        ) : (
          <span className="p-2 px-4 w-fit  font-semibold  text-red-600 rounded-md">
            {record.StockQuantity}
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
            onClick={() => showWarehouseStockModal(record)}
          >
            View
          </span>
        ) : record.pr ? (
          <span
            className="p-2 px-4 w-fit flex flex-nowrap bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer"
            onClick={() => CreatePurchaseRequest(record)}
          >
            PR request
          </span>
        ) : (
          <span className="p-2 px-4 w-fit flex flex-nowrap bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer">
            PR Done
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
      await Promise.all(
        requestdata?.List_of_materials.map(async (e, index) => {
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

          const material_inventory = await axios.post(
            "http://localhost:8000/api/v1/inventory/getmaterialinventorybyid",
            {
              id: e.material_id,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("inventory material", material_inventory.data.data);
          const data = {
            "S.no": index + 1,
            "Material ID": e?.material_id,
            "Material Name": material?.data.data.Name,
            Quantity: e?.quantity,
            StockQuantity: material_inventory.data.data.quantity,
            StockStatus: e.quantity <= material_inventory.data.data.quantity,
            warehouse: material_inventory.data.data.warehouse,
            pr: true,
          };
          console.log(data);
          fetchedData.push(data);
        })
      );

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
        <WarehouseRequest data={material_Data} />
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
