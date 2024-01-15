import React from 'react'

const Ordercard = ({orderItem}) => {
  const {productName,price,quantity,mainImagePath,created_at,id,expected_delivery} = orderItem
  return (
    <>
        
        <div className='w-full rounded-xl h-fit flex flex-col bg-white shadow-md'>
            <div className='w-full h-fit lg:h-[30%] bg-gray-400/30 rounded-t-xl px-2 py-3 lg:px-10 lg:py-6 flex justify-between items-center'>
              <div className=' w-full grid grid-cols-2 grid-rows-2 gap-y-4 lg:flex gap-2 lg:gap-10 justify-start items-center'>
                <div className='flex flex-col  gap-1 h-full'>
                  <div className='font-medium text-slate-600 lg:text-base text-xs'>ORDER PLACED</div>
                  <div className='text-slate-500 lg:text-base text-[10px]'>{created_at}</div>
                </div>
                <div className='flex flex-col gap-1 items-end lg:items-baseline h-full'>
                  <div className='font-medium text-slate-600 lg:text-base text-xs'>Price</div>
                  <div className='text-slate-500 lg:text-base text-[10px]'>₹{price}.00</div>
                </div>
                <div className='flex flex-col gap-1  h-full'>
                  <div className='font-medium text-slate-600 lg:text-base text-xs'>SHIPPING ADDRESS</div>
                  <div className='text-slate-500 lg:text-base text-[10px]'>Souvik Das</div>
                </div>
                <div className='lg:hidden flex flex-col items-end gap-1 h-full border border-black'>
                <div className='text-[10px] lg:text-sm text-slate-600 font-medium'>ORDER ID</div>
                <div className='text-[8px] lg:text-sm font-medium'># {id}</div>
              </div>
              </div>
              <div className='hidden lg:flex flex-col gap-3 items-center justify-center w-4/12 '>
                <div className='text-sm text-slate-600 font-medium'>ORDER #<span className='text-sm font-medium'>{id}</span></div>
                <div className='flex justify-around items-center w-6/12'>
                  <div>Invoice</div>
                  <div className='h-4 w-[1px] bg-slate-500'></div>
                  <div>Shop details</div>
                </div>
              </div>
            </div>
            <div className='lg:px-10 px-2 py-2 lg:py-8 flex gap-2 lg:gap-0 lg:justify-between'>
                <div className='w-[35%] lg:w-[13%] lg:h-full flex justify-center items-center object-cover'><img className='w-full lg:w-11/12 min-h-full object-contain lg:max-h-28 border border-gray-200' src={mainImagePath.url}></img></div>
                <div className='w-[65%] lg:w-[63%] flex flex-col gap-3'>
                  <div className='capitalize text-xs lg:text-base font-medium text-slate-600'>
                  {productName} Mens Fly by Mid 3 Men's Basketball Shoes Boat Shoe
                  </div>
                  <div className='drop-shadow-sm bg-gray-300 w-fit h-fit px-2  lg:px-4 py-1 text-slate-600 rounded-lg text-xs lg:text-sm font-medium'>
                    View order
                  </div>
                  </div>
                <div className='w-[20%] lg:flex flex-col justify-center items-center gap-3 hidden'>
                  <div className='bg-buttonColor py-1 px-4 rounded-lg text-white w-52 text-center shadow'>Return and refund</div>
                  <div className='bg-buttonColor py-1 px-4 rounded-lg text-white w-52 text-center shadow'>Product Review</div>
                  <div className='bg-buttonColor py-1 px-4 rounded-lg text-white w-52 text-center shadow'>Leave seller a feedback</div>
                </div>
            </div>
        </div> 
    </>
  )
}

export default Ordercard
