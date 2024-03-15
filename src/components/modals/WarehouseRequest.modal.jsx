import { DatePicker, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";
import { render } from "react-dom";

const WarehouseRequest = (props) => {
  const [loading, setLoading] = useState(false);
  const [quantityToRequest, setQuantityToRequest] = useState([]);
  const [tableData, setTableData] = useState([]);
  console.log(props);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = { ...data, setQuantityToRequest };
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log("failed", error.response.data);
    }
  };
  const RequestToWarehouse = async (RequestData) => {
    console.log("Request data", RequestData);
  };

  const updateRecordInTableData = (updatedRecord) => {
    setTableData((prevData) => {
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
  const cols = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Warehouse",
      dataIndex: "WarehouseName",
      key: "WarehouseName",
    },
    {
      title: "Warehouse Quantity",
      dataIndex: "WarehouseQuantity",
      key: "WarehouseQuantity",
    },
    {
      title: "Request Quantity",
      type: "action",
      render: (_, record) => {
        const handleQuantityChange = (e) => {
          const newQuantity = e.target.value;
          // Create a new object with updated RequestQuantity
          const updatedRecord = { ...record, RequestQuantity: newQuantity };
          // Call the function to update the record in the tableData array
          updateRecordInTableData(updatedRecord);
          console.log(tableData)
        };

        return (
          <input
            type="text"
            value={record.RequestQuantity} // Use value instead of onChange
            onChange={handleQuantityChange} // Call handleQuantityChange function on change
          />
        );
      },
    },

    {
      title: "Request",
      type: "action",
      render: (_, record) =>
          <span
            className="p-2 px-4 w-fit bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer"
            onClick={() => {
              RequestToWarehouse(record);
            }}
          >
            Request
          </span>
    },
  ];
  const tableDataCreation = () => {
    const newData = props.data.warehouse.map((e, index) => ({
      "S.no": index + 1,
      WarehouseName: e.warehouseId,
      WarehouseQuantity: e.quantity,
      RequestQuantity: 1,
    }));

    // Sort the data before setting it
    newData.sort((a, b) => a["S.no"] - b["S.no"]);
    setTableData(newData);
  };
  useEffect(() => {
    if (props.data && props.data.warehouse) tableDataCreation();
  }, [props.data]);
  return (
    <dialog
      id="create_warehouse_request_modal"
      className="modal backdrop-blur-sm"
    >
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <div className="flex flex-col h-full" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create Request to WareHouse
            </h3>
            <hr />
            <div>material: {props?.data["Material Name"]} <br /> Required quantity: {props?.data.Quantity}</div>
            <hr />
            <Table columns={cols} dataSource={tableData}></Table>
            <button
              htmlFor="create_warehouse_request_modal"
              onClick={() =>
                document
                  .getElementById("create_warehouse_request_modal")
                  .close()
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            {loading ? (
              <div className="flex items-center mt-auto justify-end">
                <Spin />
              </div>
            ) : (
              <div className="flex items-center mt-auto justify-end"></div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default WarehouseRequest;
