import React from 'react'
import Table from '../components/Table'
const OrderList = () => {
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
       <button className='px-4 py-2 bg-blue-500 rounded-[5px] text-white abs relative  left-[85%] hover:bg-blue-600'>+ Create Order</button>
       
       <hr className='bg-blue-500 h-1 mt-4'/>
       <Table/>
      </div>
    </div>
  )
}

export default OrderList