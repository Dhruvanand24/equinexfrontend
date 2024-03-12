import { Table } from "antd";
import React, { useEffect, useState } from "react";

const ShowMaterials = (props) => {
  const [allData, setAllData] = useState([]);
  
  useEffect(() => {
    setAllData(props.data);
  }, [props.data]);

  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Material name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "material_id",
      key: "material_id",
    },
    {
      title: "Quanitity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <dialog id="show_material_modal" className="modal backdrop-blur-sm">
      <div className="modal-box w-3/5 h-[80%] max-w-5xl flex flex-col items-center rounded-lg ">
        <div className="modal-action h-full w-full">
          <form className="flex flex-col h-full w-full p-5" method="dialog">
            <h3 className="font-bold text-[18px] text-heading-0 mb-4">
              All Materials List
            </h3>
            <hr />
            <Table columns={columns} dataSource={allData} />
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
