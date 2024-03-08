import { Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
// import MultiSelectDropdown from '../MultiSelectDropdown.jsx';

const CreatePurchaseRequest = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allMaterials, setAllMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useGetUser();
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async () => {
    // e.preventDefault();
    console.log(selectedMaterials);
    setLoading(true);
    try {
      const data = {
        Requester:user._id,
        List_of_materials:selectedMaterials,
      };

      //   console.log(user._id);
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
        alert("Request created");
      }, 500);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("failed", error);
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

  const fetchdata = async () => {
    try {
      const material_res = await axios.get(
        "http://localhost:8000/api/v1/material/getallmaterial"
      );

      if (!material_res.data) {
        throw new Error("Material not found");
      }
      setAllMaterials(material_res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <dialog
      id="create_new_purchase_request_modal"
      className="modal backdrop-blur-sm"
    >
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full">
          <form
            onSubmit={onSubmit}
            className="flex flex-col h-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create Purchase Request
            </h3>
            <hr />
            <div className="flex flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
              <div className="flex flex-col gap-1 items-start justify-start">
                <p className="text-sm">Select Materials</p>
                <div className="w-fit">
                  <div
                    className={`dropdown flex items-center w-[256px] text-[14px] bg-[#edf1fa] text-[#8792A4] rounded-lg border-ring-0 border-[1px] px-4 h-[42px] cursor-text outline-blue-500 ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <p
                      tabIndex={0}
                      role="button"
                      className="text-sm w-full"
                      onClick={handleToggleDropdown}
                    >
                      select
                    </p>

                    <ul
                      tabIndex={0}
                      className={`mt-3 z-[1] p-4 gap-2 shadow menu menu-sm dropdown-content rounded-none bg-base-100 w-52 overflow-auto ${
                        isOpen ? "block" : "hidden"
                      }`}
                    >
                      {allMaterials?.map((ele) => (
                        <div
                          key={ele._id}
                          className="flex gap-2 justify-between"
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
                </div>
              </div>
            </div>

            <button
              htmlFor="create_new_purchase_request_modal"
              onClick={() =>
                document
                  .getElementById("create_new_purchase_request_modal")
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
                  Add Buyer
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreatePurchaseRequest;
