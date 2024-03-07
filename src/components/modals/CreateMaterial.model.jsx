import { DatePicker, Alert, Spin } from "antd";
import axios from "axios";
import { Item } from "rc-menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateMaterial = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    const creationdata = {
      Name: data.materialName,
      description: data,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/material/createMaterial",
        creationdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      
    //   document.getElementById("create_new_material_modal").close()

    } catch (error) {
      console.log("failed", error.response.data);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const AllBuyers = [
    { name: "Plant Manager" },
    { name: "Store Manager" },
    { name: "Super Admin" },
    { name: "Production" },
    { name: "Quality Tester" },
  ];

  return (
    <dialog id="create_new_material_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Add New Material
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Name of Material</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Material Name"
                    {...register("materialName", { required: true })}
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Brand</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Brand"
                    {...register("brand", { required: true })}
                  />
                  {errors.Brand && (
                    <p className="text-sm text-red-500 italic">
                      Brand is required.
                    </p>
                  )}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Unit</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Unit"
                    {...register("unit", { required: true })}
                  />
                  {errors.unit && (
                    <p className="text-sm text-red-500 italic">
                      Unit is required.
                    </p>
                  )}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Length</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Length"
                    {...register("length", { required: true })}
                  />
                  {errors.length && <p>Lenght is required.</p>}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Width</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Width"
                    {...register("width", { required: true })}
                  />
                  {errors.width && <p>Width is required.</p>}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Height</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Height"
                    {...register("height", { required: true })}
                  />
                  {errors.height && <p>Height is required.</p>}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Weight</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Weight"
                    {...register("weight", { required: true })}
                  />
                  {errors.weight && <p>Weight is required.</p>}
                </div>
              </div>
            </div>

            <button
              htmlFor="create_new_material_modal"
              onClick={() =>
                document.getElementById("create_new_material_modal").close()
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
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-0 text-white rounded-md"
                >
                  Add Material
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateMaterial;
