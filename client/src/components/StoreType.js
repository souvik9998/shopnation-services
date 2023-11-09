import React from 'react'

const StoreType = () => {
  return (
    <>
        <div className='bg-slate-200/50 w-full h-full shadow-lg flex items-center justify-center lg:px-20 py-4'>
            <div className='w-full grid grid-cols-4 grid-rows-3 gap-y-4 text-center lg:flex flex-wrap pl-4 lg:pl-0 justify-around justify-items-start lg:justify-around font-semibold text-xs lg:text-[17px]'>
                <div className='w-fit px-2'>Hardware</div>
                <div className='w-fit px-2'>Fashion</div>
                <div className='w-fit px-2 col-span-2'>Food & Beverages</div>
                <div className='w-fit px-2'>Furniture</div>
                <div className='w-fit px-2'>Vegetables</div>
                <div className='w-fit px-2 col-span-2'>Mobile & Electronics</div>
                <div className='w-fit px-2'>Grocery</div>
                <div className='w-fit px-2'>Beauty</div>
                <div className='w-fit px-2 col-span-2'>Services near you</div>
            </div>
            
        </div>
      
    </>
  )
}

export default StoreType
