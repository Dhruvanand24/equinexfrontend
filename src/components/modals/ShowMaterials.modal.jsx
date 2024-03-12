import { DatePicker, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ShowMaterials = (data) => {
  console.log("data", data.data);

  return (
    <dialog id="show_material_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full w-full">
          <form className="flex flex-col h-full w-full bg-blue-100 p-5" method="dialog">
            <div className="w-full flex justify-between items-center gap-32 font-bold">
              <span>Material name</span>
              <span>Material Quantity</span>
            </div>
            {data.data.length>0 ? data.data.map((e) => {
              console.log(e);
              return (
                <div
                  className="w-full flex  justify-between items-center gap-32"
                  key={e._id}
                >
                  <span>{e.material_id}</span>
                  <span>{e.quantity}</span>
                </div>
              );
            }): "No Material in the Request"}

            <button
              htmlFor="show_material_modal"
              onClick={() =>
                document.getElementById("show_material_modal").close()
              }
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ShowMaterials;
