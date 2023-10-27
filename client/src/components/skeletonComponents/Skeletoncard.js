import React from 'react'

const Skeletoncard = () => {
  return (
    <>
     <div className='h-48 m-auto font-Inter capitalize rounded-lg bg-slate-200 flex lg:items-center gap-2 pl-2 pr-1 lg:px-4  py-3 mb-2'>
      <div className='animate-pulse flex flex-col gap-4 w-5/12 lg:w-3/12 mr-3 lg:mr-0'>
        <div className='rounded-md w-40 h-32 bg-slate-300'></div>

        {/* mobile button */}

        <div className='lg:hidden flex gap-3 justify-center h-8 items-center'>
            <div className=''>
            </div>
            
          </div>
        </div>
        <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
          <div className='rounded-md h-10 w-96 bg-slate-300'></div>
          <div className='rounded-md h-4 w-40 bg-slate-300'>
          </div>
          <div className='rounded-md h-4 w-24 bg-slate-300'>
          </div>
          <div className=''>
            <div className=''></div>
          </div>

          {/* mobile button */}

          <div className='lg:hidden'></div>
        </div>
        <div className='hidden lg:flex flex-col justify-around items-center h-28 w-3/12 font-semibold'>
          <div className='flex gap-3 justify-center h-8 items-center'>
            <div className='h-8 w-8 bg-slate-300'>
            </div>
            <div className='h-8 w-8 bg-slate-300'></div>
            <div className='h-8 w-8 bg-slate-300'></div>
              {/* <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div> */}
            
          </div>
          <div className='hidden lg:block'></div>
        </div>
        
        {/* <div className='flex w-'>
          <
        </div> */}
      </div> 
    </>
  )
}

export default Skeletoncard
