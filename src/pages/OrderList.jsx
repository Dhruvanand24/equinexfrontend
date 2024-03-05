import React, { useState } from 'react'
import { Table, Modal, Button } from 'antd'
const OrderList = () => {

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const columns = [
    {
      title: 'S.no',
      dataIndex: 'S.no',
      key: 'S.no',
      fixed: 'left',
    },
    {
      title: 'Order Id',
      dataIndex: 'Order Id',
      key: 'Order Id',
    },
    {
      title: 'DOO',
      dataIndex: 'DOO',
      key: 'DOO',
    },
    {
      title: 'Buyer',
      dataIndex: 'Buyer',
      key: 'Buyer',
    },
    {
      title: 'Details',
      dataIndex: 'Details',
      key: 'Details',
    },
    {
      title: 'Deal Amount',
      dataIndex: 'Deal Amount',
      key: 'Deal Amount',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'Amount Paid',
      key: 'Amount Paid',
    },
    {
      title: 'Amount Due',
      dataIndex: 'Amount Due',
      key: 'Amount Due',
    },
    {
      title: 'Dead line',
      dataIndex: 'Dead line',
      key: 'Dead line',
    },
    {
      title: 'Delivery Date',
      dataIndex: 'Delivery Date',
      key: 'Delivery Date',
    },
    {
      title: 'Recipt',
      dataIndex: 'Recipt',
      key: 'Recipt',
      fixed: 'right',
    },
  ];
  return (
    <div className='bg-white p-4 w-full flex flex-col justify-start items-start'>
      <p className='font-semibold text-[#4A5568] text-xl p-2 pl-0'>All Orders</p>

      <div className='w-full border-[#D9D9D9] rounded-[4px] border-[1px] p-2 relative'>
       <div className='filtersection flex gap-[50px] p-4'>

            <div className=' flex flex-col gap-1'>
                <p className='text-[#718096] text-sm'>PR No.</p>
                <div className='relative w-fit overflow-hidden'>
                    <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
                    <img className='absolute top-[5px] right-1 text-xl h-8 cursor-pointer p-2' src="search.png" alt="" />
                </div>
            </div>


            <div className=' flex flex-col gap-1'>
                <p className='text-[#718096] text-sm'>From Date</p>
                <div className='relative w-fit overflow-hidden'>
                    <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
                    <img className='absolute top-0 right-0 text-xl h-10 cursor-pointer' src="/icons/Date.svg" alt="" />
                </div>
            </div>


            <div className=' flex flex-col gap-1'>
                <p className='text-[#718096] text-sm'>To Date</p>
                <div className='relative w-fit overflow-hidden'>
                    <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
                    <img className='absolute top-0 right-0 text-xl h-10 cursor-pointer' src="/icons/Date.svg" alt="" />
                </div>
            </div>

       </div>
      
      
       <button onClick={showModal} className=' px-4 py-2 bg-blue-500 rounded-[5px] text-white abs relative  left-[85%] hover:bg-blue-600'>+ Create Order</button>
     
       <Modal
        title="Title"
        open={open}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="">
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <input className=' w-[256px] bg-[#edf1fa] text-[#8792A4] rounded-sm border-[#D9D9D9] border-[1px] px-4 py-2 cursor-text outline-blue-500' type="text" placeholder='Purchase Order No.'/>
          <button>ok</button>
        </form>
      </Modal>
       <hr className='bg-blue-500 h-1 mt-4'/>
       <Table  columns={columns} scroll={{ x: 1000, y: 300 }}/>;
      </div>
     
    </div>
  )
}

export default OrderList