import React from 'react'

const Ordercard = ({orderItem}) => {
  const {productName,price,quantity,mainImagePath,created_at,id,expected_delivery} = orderItem
  return (
    <>
        
        <div className='w-full rounded-xl h-fit  flex flex-col bg-white shadow-md'>
            <div className='h-[30%] bg-gray-400/30 rounded-t-xl px-10 py-6 flex justify-between items-center'>
              <div className='flex gap-10 justify-start items-center'>
                <div className='flex flex-col gap-1'>
                  <div className='font-medium text-slate-600'>ORDER PLACED</div>
                  <div className='text-slate-500'>{created_at}</div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='font-medium text-slate-600'>Price</div>
                  <div className='text-slate-500'>₹{price}.00</div>
                </div>
                <div className='flex flex-col gap-1'>
                  <div className='font-medium text-slate-600'>SHIPPING ADDRESS</div>
                  <div className='text-slate-500'>Souvik Das</div>
                </div>
                
              </div>
              <div className='flex flex-col gap-3 items-center justify-center w-4/12'>
                <div className='text-sm text-slate-600 font-medium'>ORDER #<span className='text-sm font-medium'>{id}</span></div>
                <div className='flex justify-around items-center w-6/12'>
                  <div>Invoice</div>
                  <div className='h-4 w-[1px] bg-slate-500'></div>
                  <div>Shop details</div>
                </div>
              </div>
            </div>
            <div className='px-10 py-8 flex justify-between'>
                <div className='w-[13%] h-full flex justify-center items-center'><img className='w-full lg:w-11/12 min-h-full max-h-28 border border-gray-200' src={mainImagePath.url}></img></div>
                <div className='w-[63%] flex flex-col gap-3'>
                  <div className='capitalize text-base font-medium text-slate-600'>
                  {productName} Mens Fly by Mid 3 Men's Basketball Shoes Boat Shoe
                  </div>
                  <div className='bg-gray-300 w-fit h-fit px-4 py-1 text-slate-600 rounded-lg text-sm font-medium'>
                    View order
                  </div>
                  </div>
                <div className='w-[20%] flex flex-col justify-center items-center gap-3'>
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
