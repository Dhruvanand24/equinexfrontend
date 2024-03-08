import { DatePicker, Spin } from "antd";
import { Item } from "rc-menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateSeller = () => {

  const [errorMessage, setErrorMessage] = useState("");
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
    try {
      const response = await axios.post("http://localhost:8000/api/v1/seller/createseller", data ,{
         headers: {
          "Content-Type": "application/json",
         }
      });
      setLoading(false);
      console.log(response);
    } catch (error) {
      setLoading(false);
      console.log("failed", error);
    }
  };

  const AllBuyers = [{ name: "Plant Manager" }, { name: "Store Manager" }, { name: "Super Admin" }, { name: "Production" }, { name: "Quality Tester" }];

  return (
    <dialog id="create_new_seller_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Add New Seller
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
            <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Name</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="FullName"
                    {...register("name", { required: true })}
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Address</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Address"
                    {...register("address", { required: true })}
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Email</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Phone</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="number"
                    placeholder="Phone no."
                    {...register("phone", { required: true })}
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">GST</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="GST no."
                    {...register("gst", { required: true })}
                  />
                </div>
              </div>

              
            
             
            
            
            </div>

         

            <button
              htmlFor="create_new_seller_modal"
              onClick={() =>
                document.getElementById("create_new_seller_modal").close()
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
                  Add Seller
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateSeller;
