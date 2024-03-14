import { DatePicker, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const WarehouseRequest = (props) => {
  const [loading, setLoading] = useState(false);
  const [quantityToRequest, setQuantityToRequest] = useState([]);
    console.log(props)
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


  return (
    <dialog id="create_warehouse_request_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create Request to WareHouse
            </h3>
            <hr />
            {props.id}
            <button
              htmlFor="create_warehouse_request_modal"
              onClick={() =>
                document.getElementById("create_warehouse_request_modal").close()
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
              <div className="flex items-center mt-auto justify-end">
                
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default WarehouseRequest;
