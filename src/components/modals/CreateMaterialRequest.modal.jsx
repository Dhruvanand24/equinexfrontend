import { DatePicker, Alert, Spin } from "antd";
import axios from "axios";
import { Item } from "rc-menu";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateMaterialRequest = () => {
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if(!document.getElementById("create_new_materialrequest_modal").close()){
      return;
    }
    console.log(data);
    setLoading(true);
    console.log(data, selectedMaterials);
    const creationdata = {
      Order_Id: data.Order_Id,
      List_of_materials: selectedMaterials,
      Department_request_raise: data.Department_request_raise,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/material/createMaterialRequest",
        creationdata,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setTimeout(() => {
        alert(response.data.message)
        setLoading(false);
      }, 500);

      //   document.getElementById("create_new_material_modal").close()
    } catch (error) {
      console.log("failed", error.response.data.message);
      setTimeout(() => {
        alert(error.response.data.message)
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
  const fetchdata = async () => {
    try {
      const order_res = await axios.get(
        "http://localhost:8000/api/v1/orders/allorder"
      );
      const material_res = await axios.get(
        "http://localhost:8000/api/v1/material/getallmaterial"
      );
      const department_res = await axios.get(
        "http://localhost:8000/api/v1/department/getalldepartment"
      );
      if (!order_res.data) {
        throw new Error("Orders not found");
      }
      if (!material_res.data) {
        throw new Error("Material not found");
      }
      if (!department_res.data) {
        throw new Error("Department not found");
      }
      setAllMaterials(material_res.data.data);
      setAllOrders(order_res?.data?.data);
      setAllDepartments(department_res?.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateSelectedMaterialQuantity = (quan, id) => {
    if (quan < 1) {
      // You might want to handle this case differently, e.g., show an error message
      console.log("Quantity must be at least 1");
      return;
    }

    console.log(quan, id);

    const idx = selectedMaterials.findIndex(
      (ele) => ele.material_id?.toString() === id?.toString()
    );

    // Ensure the index is valid
    if (idx !== -1) {
      setSelectedMaterials((prevSelectedMaterials) => {
        // Create a new array with the updated quantity for the specific material
        const updatedMaterials = [...prevSelectedMaterials];
        updatedMaterials[idx] = { ...updatedMaterials[idx], quantity: quan };

        return updatedMaterials;
      });
    }
  };

  const handleCheck = (ele) => {
    setSelectedMaterials((prevSelectedMaterials) => {
      const isChecked = prevSelectedMaterials.some(
        (e) => e.material_id === ele._id
      );

      if (isChecked) {
        // If checked, remove the element
        return prevSelectedMaterials.filter((e) => e.material_id !== ele._id);
      } else {
        // If unchecked, add the element
        return [
          ...prevSelectedMaterials,
          { material_id: ele._id, quantity: 1 },
        ];
      }
    });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <dialog
      id="create_new_materialrequest_modal"
      className="modal backdrop-blur-sm"
    >
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create New Material Request
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Order ID</p>
                <div className="w-fit overflow-hidden">
                  <select
                    {...register("Order_Id")}
                    value={watch("Order_Id")}
                    onChange={(e) => setValue("Order_Id", e.target.value)}
                    className="text-[14px] h-[42px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-md border-ring-0 border-[1px] px-4  cursor-text outline-blue-500"
                  >
                    <option value="" className="bg-white">
                      Select Order
                    </option>
                    {allOrders?.map((ele) => (
                      <option
                        key={ele._id}
                        value={ele._id}
                        className="bg-white"
                      >
                        {ele._id} {ele.Date_of_Order.toString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Select Material</p>
                <div className="w-fit flex justify-center items-center">
                  <div className="dropdown w-[256px] text-[14px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500">
                    <p tabIndex={0} role="button" className="text-sm">
                      select
                    </p>

                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow-sm bor ring-1 menu menu-sm dropdown-content bg-base-100 flex flex-col rounded-box gap-y-1 gap-x-2 w-60 h-[105px] overflow-auto "
                    >
                      {allMaterials?.map((ele) => (
                        <div
                          key={ele._id}
                          className="flex flex-row gap-2 w-full justify-between px-2 ring-1"
                        >
                          <input
                            name="po"
                            type="checkbox"
                            className="w-fit bg-black-0"
                            onChange={() => handleCheck(ele)}
                            checked={selectedMaterials.some(
                              (e) => e.material_id === ele._id
                            )}
                          />

                          <p className="w-fit">{ele.Name}</p>
                          {selectedMaterials.some(
                            (e) => e.material_id === ele._id
                          ) ? (
                            <input
                              type="Number"
                              placeholder="quantity"
                              defaultValue={1}
                              className="w-[50px]"
                              onChange={(e) =>
                                updateSelectedMaterialQuantity(
                                  e.target.value,
                                  ele._id
                                )
                              }
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                  {/* <DatePicker className='z-50'/> */}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Department</p>
                <div className="w-fit overflow-hidden">
                <select
                    {...register("Department_request_raise")}
                    value={watch("Department_request_raise")}
                    onChange={(e) => setValue("Department_request_raise", e.target.value)}
                    className="text-[14px] h-[42px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-md border-ring-0 border-[1px] px-4  cursor-text outline-blue-500"
                  >
                    <option value="" className="bg-white">
                      Select Order
                    </option>
                    {allDepartments?.map((ele) => (
                      <option
                        key={ele._id}
                        value={ele._id}
                        className="bg-white"
                      >
                        {ele?.name} 
                      </option>
                    ))}
                  </select>
                  {errors.unit && (
                    <p className="text-sm text-red-500 italic">
                      Department is required.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <button
              htmlFor="create_new_material_modal"
              onClick={() =>
                document
                  .getElementById("create_new_materialrequest_modal")
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
              <div className="flex items-center mt-auto justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent-0 text-white rounded-md"
                >
                  Create Request
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateMaterialRequest;
