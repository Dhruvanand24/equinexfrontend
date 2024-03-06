import { DatePicker } from "antd";
import { Item } from "rc-menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateOrder = () => {
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
      if (
        !data.name ||
        !data.description ||
        !data.price ||
        !data.quantity ||
        !data.imageurl ||
        !data.manufacturer ||
        !data.category ||
        !data.productid
      ) {
        setErrorMessage("All fields are required");
        setLoading(false);
        return;
      }
      const productData = {
        Name: data.name,
        Description: data.description,
        Price: Number(data.price),
        manufacturer: data.manufacturer,
        Quantity: Number(data.quantity),
        Category: data.category,
        ImageUrl: data.imageurl,
        productId: data.productid,
      };

      // Retrieve the document ID

      // Close the modal
      document.getElementById("create_new_order_modal").close();
      setLoading(false);

      // Navigate to /barcode with the document ID as a parameter
      navigate(`/barcode/${data.productid}`, { state: { from: location } });
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
      setErrorMessage("Error adding product. Please try again.");
    }
  };

  const AllBuyers = [{ name: "kaif" }, { name: "Dhruv" }, { name: "Anjali" }];

  return (
    <dialog id="create_new_order_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 max-w-5xl flex flex-col items-center justify-center rounded-lg">
        <div className="modal-action">
          <form onSubmit={handleSubmit(onSubmit)} className="" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0">
              Create New Order
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-2 w-full items-center justify-start text-text-0 text-[18px]">
              <div className=" flex flex-col gap-1">
                <p className="text-[14px]">Order By</p>
                <div className="w-fit overflow-hidden">
                  <select className="text-[14px] h-[42px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-md border-ring-0 border-[1px] px-4  cursor-text outline-blue-500">
                    <option disabled selected className="bg-white">
                      Select Order By
                    </option>
                    {AllBuyers.map((ele) => {
                      return <option className="bg-white">{ele.name}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Deal Amount</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="Number"
                    placeholder="Deal Amount"
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Paid Amount</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="Number"
                    placeholder="Deal Amount"
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1">
                <p className=" text-sm">Select Process</p>
                {/* <select multiple className="w-fit overflow-hidden relative h-fit">
                  {AllBuyers.map((ele) => (
                    <option key={ele.name} className="mb-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" placeholder={ele.name} />
                        {ele.name}
                      </label>
                    </option>
                  ))}
                </select> */}
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Deadline</p>
                <div className="w-fit overflow-hidden ">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="date"
                    placeholder="Deal Amount"
                  />
                  {/* <DatePicker className='z-50'/> */}
                </div>
              </div>
            </div>

            <button
              htmlFor="create_new_order_modal"
              onClick={() =>
                document.getElementById("create_new_order_modal").close()
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div className="flex items-center justify-end mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-accent-0 text-white rounded-md"
              >
                Create Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateOrder;
