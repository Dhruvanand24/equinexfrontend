import { Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreatePurchaseRequest = () => {
  const [loading, setLoading] = useState(false);
  const [allMaterials, setAllMaterials] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    // Check if modal is closed
    const modal = document.getElementById("create_new_purchase_request_modal");
    if (modal) {
      const closeListener = () => {
        // Clear selected materials
        setSelectedMaterials([]);
        setIsOpen(false);
      };
      modal.addEventListener("close", closeListener);
      return () => {
        modal.removeEventListener("close", closeListener);
      };
    }
  }, []);
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Material Id",
      dataIndex: "material_id",
      key: "material_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <input
          type="number"
          value={text}
          onChange={(e) => updateSelectedMaterialQuantity(e.target.value, record.material_id)}
        />
      ),
    },
  ];

  const onSubmit = async () => {
    if (!document.getElementById("create_new_purchase_request_modal").open) {
      // The modal is closed, do not submit the form
      return;
    }
    setLoading(true);
    try {
      const data = {
        List_of_materials: selectedMaterials,
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("failed", error);
      setTimeout(() => {
        alert(error.response.data.message);
      }, 500);
    }
  };

  const handleCheck = (ele) => {
    setSelectedMaterials((prevSelectedMaterials) => {
      const isChecked = prevSelectedMaterials.some(
        (e) => e.material_id === ele._id
      );

      if (isChecked) {
        return prevSelectedMaterials.filter((e) => e.material_id !== ele._id);
      } else {
        return [
          ...prevSelectedMaterials,
          { material_id: ele._id, quantity: 1 },
        ];
      }
    });
  };

  const updateSelectedMaterialQuantity = (quan, id) => {
    if (quan < 1) {
      console.log("Quantity must be at least 1");
      return;
    }

    const idx = selectedMaterials.findIndex(
      (ele) => ele.material_id?.toString() === id?.toString()
    );

    if (idx !== -1) {
      setSelectedMaterials((prevSelectedMaterials) => {
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
      console.log(allMaterials);
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
        <div className="modal-action h-full w-full">
          <form
            onSubmit={onSubmit}
            className="flex flex-col h-full w-full"
            method="dialog"
          >
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              Create Purchase Request
            </h3>
            <hr />
            <div className="flex z-10 flex-wrap gap-x-10 gap-y-7 mt-4 w-full items-center justify-start text-text-0 text-[18px] relative">
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
                              type="number"
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
            <Table className="mt-4" columns={columns} scroll={{ y: 300 }} dataSource={selectedMaterials.map((material, index) => ({
              ...material,
              key: index,
              "S.no": index + 1,
              name: allMaterials.find(item => item._id === material.material_id)?.Name,
            }))} />

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

export default CreatePurchaseRequest;
