import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const CompareInventory = () => {

  const {id} = useParams();
  console.log(id);
    const [dataSource, setDataSource] = useState([]);
    const [allDepartment, setAllDepartment] = useState([]);
    const [allRequests, setAllRequests] = useState([]);
    const [requestMaterial, setRequestMaterial] = useState([]);
    const [materialRequestId, setMaterialRequestId] = useState([]);
  const columns = [
    {
      title: "S.no",
      dataIndex: "S.no",
      key: "S.no",
      fixed: "left",
    },
    {
      title: "Material Name",
      dataIndex: "Material Name",
      key: "Material Name",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "InStock",
      dataIndex: "InStock",
      key: "InStock",
    },
    {
      title: "Manage",
      type: "action",
      render: (_, record) => (
        <span
          className="p-2 px-4 w-fit bg-primary-0 bg-opacity-15 font-semibold hover:bg-opacity-30 text-primary-0 rounded-md cursor-pointer"
          onClick={() => showMaterials(record["MR ID"])}
        >
          View
        </span>
      ),
    },
    
    
  ];



  const fetchdata = async () => {
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="bg-white p-4 w-full flex flex-col justify-start items-start h-full">
      <p className="font-semibold text-[#4A5568] text-xl p-2 pl-0">
      Warehouse material request 
      </p>
      <div className="w-full h-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2">
      <hr className="bg-blue-500 h-1 mt-4" />
        <div className="max-w-full">
          <Table
            dataSource={dataSource}
            columns={columns}
            scroll={{ x: 500 }}
          />
        </div>
        </div>
    </div>
  )
}

export default CompareInventory
