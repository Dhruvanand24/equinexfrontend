import React from 'react'

const Table = () => {
  return (
    <div>
      <div id="tablehead" className='w-full flex text-[#595959] font-semibold text-sm py-2 border-b-[1px] border-[#D9D9D9] overflow-x-scroll'>
        <div className='w-10 flex text-wrap items-center justify-start'>S No.</div>
        <div className='w-20 flex text-wrap items-center justify-start'>Order Id</div>
        <div className='w-24 flex text-wrap items-center justify-start'>DOO</div>
        <div className='w-28 flex text-wrap items-center justify-start'>Buyer</div>
        <div className='w-20 flex text-wrap items-center justify-start'>Details</div>
        <div className='w-28 flex text-wrap items-center justify-start'>Deal Amount</div>
        <div className='w-28 flex text-wrap items-center justify-start'>Amount Paid</div>
        <div className='w-24 flex text-wrap items-center justify-start'>Amount Due</div>
        <div className='w-24 flex text-wrap items-center justify-start'>Dead line</div>
        <div className='w-24 flex text-wrap items-center justify-start'>Delivery Date</div>
        <div className='w-14 flex text-wrap items-center justify-start'>Recipt</div>
      </div>



      <div id="table body" className='w-full flex text-[#595959] text-sm py-2 border-b-[1px] border-[#D9D9D9]'>
        <div className='w-10 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>1.</div>
        <div className='w-20 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>xxx001</div>
        <div className='w-24 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>21-02-2024</div>
        <div className='w-28 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>xyz@ pvt. ltd</div>
        <div className='w-20 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>vew </div>
        <div className='w-28 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>2000000</div>
        <div className='w-28 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>1000000</div>
        <div className='w-24 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>1000000</div>
        <div className='w-24 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>01-05-2024</div>
        <div className='w-24 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>NA</div>
        <div className='w-14 overflow-x-auto overflow-y-hidden text-nowrap flex items-center justify-start'>Print</div>
      </div>
    </div>
  )
}

export default Table
