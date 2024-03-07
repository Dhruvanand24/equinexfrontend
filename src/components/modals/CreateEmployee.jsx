import { DatePicker } from "antd";
import { Item } from "rc-menu";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateEmployee = () => {

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
      document.getElementById("create_new_employee_modal").close();
      setLoading(false);

      // Navigate to /barcode with the document ID as a parameter
      navigate(`/barcode/${data.productid}`, { state: { from: location } });
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
      setErrorMessage("Error adding product. Please try again.");
    }
  };

  const AllBuyers = [{ name: "Plant Manager" }, { name: "Store Manager" }, { name: "Super Admin" }, { name: "Production" }, { name: "Quality Tester" }];

  return (
    <dialog id="create_new_employee_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Add New Employee
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
            <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Full Name</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="FullName"
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Username</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="text"
                    placeholder="Username"
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
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Password</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="password"
                    placeholder="Password"
                  />
                </div>
              </div>

              
              <div className=" flex flex-col gap-1">
                <p className="text-[14px]">Post</p>
                <div className="w-fit overflow-hidden">
                  <select className="text-[14px] h-[42px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-md border-ring-0 border-[1px] px-4  cursor-text outline-blue-500">
                    <option disabled selected className="bg-white">
                      Select Post
                    </option>
                    {AllBuyers.map((ele) => {
                      return <option className="bg-white">{ele.name}</option>;
                    })}
                  </select>
                </div>
              </div>
             
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Access Permissions</p>
                <div className="w-fit ">
                <div className="dropdown w-[256px] text-[14px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500">
                <p tabIndex={0} role="button" className=" text-sm">select</p>
                  <ul
                    tabIndex={0}
                    className="mt-3 z-[1] p-4 gap-2 shadow menu menu-sm dropdown-content rounded-none bg-base-100  w-52 overflow-auto"
                  >
                    {AllBuyers.map((ele) => (
                      <div className="flex gap-2">
                        
                          <input name="po" type="checkbox" />
                          
                          <p className="">{ele.name}</p>
                      </div>
                    ))}
                  </ul>
                </div>
                  {/* <DatePicker className='z-50'/> */}
                </div>
              </div>
            
            </div>

         

            <button
              htmlFor="create_new_employee_modal"
              onClick={() =>
                document.getElementById("create_new_employee_modal").close()
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            
            <div className="flex items-center mt-auto justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-accent-0 text-white rounded-md"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateEmployee;
