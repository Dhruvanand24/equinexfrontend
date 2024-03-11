import { DatePicker } from "antd";
import { Item } from "rc-menu";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreateOrder = () => {
  const [AllBuyers, setAllBuyers] = useState([]);
  const [AllProcesses, setAllProcesses] = useState([]);
  const [orderBy, setOrderBy] = useState({});
  const [dealAmount, setDealAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [selectedProcesses, setSelectedProcesses] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const buyersResponse = await axios.get(
        "http://localhost:8000/api/v1/buyer/getallbuyers"
      );
      const processData = await axios.get(
        "http://localhost:8000/api/v1/process/getallprocesses"
      );

      if (!buyersResponse.data || !processData.data) {
        throw new Error("Data not found");
      }

      setAllBuyers(buyersResponse.data.data);
      setAllProcesses(processData.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitForm = async (e) => {
    if (!document.getElementById("create_new_order_modal").open) {
      // The modal is closed, do not submit the form
      return;
    }
    // e.preventDefault();
    // const doublecheck=confirm("Are you want to place order!")
    // if(!doublecheck){
    //   return;
    // }
    try {
      const body_data = {
        Order_By: orderBy.toString(),
        Date_of_Order: Date.now(),
        Paid_amount: paidAmount,
        Deal_amount: dealAmount,
        Deadline: deadLine,
        production_process: selectedProcesses,
      };

      // console.log(body_data)

      // const res=await fetch('http://localhost:8000/api/v1/orders/createorder',{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   body:JSON.stringify(body_data)
      // });

      const resData = await axios.post(
        "http://localhost:8000/api/v1/orders/createorder",
        body_data
      );

      if (!resData.data) {
        throw new Error("Order not placed");
      }
      if (resData.data.success) alert(resData.data.message);
      else new Error("Order not placed");
      // console.log(resData.data)
    } catch (error) {
      alert("order not palced !", error);
      // console.log("order not palced !",error);
    }

    document.getElementById("create_new_order_modal").close();
  };

  const handleCheck = (ele) => {
    const isChecked = selectedProcesses.some((e) => e._id === ele._id);

    if (isChecked) {
      // If checked, remove the element
      setSelectedProcesses(selectedProcesses.filter((e) => e._id !== ele._id));
    } else {
      // If unchecked, add the element
      setSelectedProcesses([...selectedProcesses, ele]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const AllBuyers = [{ name: "kaif" }, { name: "Dhruv" }, { name: "Anjali" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" }, { name: "kaif" },];

  return (
    <dialog id="create_new_order_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="flex flex-col h-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create New Order
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
              <div className=" flex flex-col gap-1">
                <p className="text-[14px]">Order By</p>
                <div className="w-fit overflow-hidden">
                  <select
                    onChange={(e) => {
                      setOrderBy(e.target.value);
                    }}
                    value={orderBy}
                    className="text-[14px] h-[42px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-md border-ring-0 border-[1px] px-4  cursor-text outline-blue-500"
                  >
                    <option value="" className="bg-white">
                      Select Order By
                    </option>
                    {AllBuyers?.map((ele) => (
                      <option
                        key={ele._id}
                        value={ele._id}
                        className="bg-white"
                      >
                        {ele.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className="text-[14px] ">Deal Amount</p>
                <div className="w-fit overflow-hidden">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="Number"
                    onChange={(e) => setDealAmount(e.target.value)}
                    value={dealAmount}
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
                    onChange={(e) => setPaidAmount(e.target.value)}
                    value={paidAmount}
                    placeholder="Deal Amount"
                  />
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Deadline</p>
                <div className="w-fit overflow-hidden ">
                  <input
                    className="text-[14px] w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500"
                    type="date"
                    onChange={(e) => setDeadLine(e.target.value)}
                    value={deadLine}
                    placeholder="Deal Amount"
                  />

                  {/* <DatePicker className='z-50'/> */}
                </div>
              </div>

              <div className=" flex flex-col gap-1 items-start justify-start">
                <p className=" text-sm">Select Process</p>
                <div className="w-fit ">
                  <div className="dropdown w-[256px] text-[14px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 py-[8px] cursor-text outline-blue-500">
                    <p tabIndex={0} role="button" className="text-sm">
                      select
                    </p>

                    <ul
                      tabIndex={0}
                      className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 h-[100px] overflow-auto"
                    >
                      {AllProcesses?.map((ele) => (
                        <div key={ele._id} className="flex gap-2">
                          <input
                            name="po"
                            type="checkbox"
                            onChange={() => handleCheck(ele)}
                            checked={selectedProcesses.some(
                              (e) => e._id === ele._id
                            )}
                          />

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
              htmlFor="create_new_order_modal"
              onClick={() =>
                document.getElementById("create_new_order_modal").close()
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
