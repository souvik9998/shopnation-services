import React from 'react'

const StoredetailsCard = ({shopInfo}) => {
  return (
    <>
      <div className='flex justify-center items-center px-5'>
            <img className='w-11/12 min-h-40' src={shopInfo.shopImage.url}></img>
          </div>
          <div className='flex flex-col items-center gap-6 w-full'>
            <div className='text-lg font-semibold capitalize px-5'>{shopInfo.shopName}</div>
            <div className='flex flex-col items-start text-sm w-full font-semibold text-slate-700'>
              <div className='border-y border-gray-300 pl-10 pr-5 w-full py-3 capitalize'>{shopInfo.shopType} shop</div>
              <div className='border-b border-gray-300 pl-10 pr-5 w-full py-3'>{shopInfo.email}</div>
              <div className='border-b border-gray-300 pl-10 pr-5 w-full py-3'>{shopInfo.mobileNumber}</div>
              <div className='border-b border-gray-300 pl-10 pr-5 w-full py-3'>{shopInfo.name}</div>
              <div className=' pl-10 pr-5 w-full py-3'>Shop timings - <span className='text-green-500'>{shopInfo.shopTimings.openingTime} - {shopInfo.shopTimings.closingTime} </span></div>

              {/* <div>{shopInfo}</div> */}
              <div></div>
            </div>
          </div>
    </>
  )
}

export default StoredetailsCard
