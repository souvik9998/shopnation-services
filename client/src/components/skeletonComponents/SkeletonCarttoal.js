import React from 'react'

const SkeletonCarttoal = () => {
  return (
    <>
      <div className='w-full bg-slate-100 h-96 rounded-lg'>
      <div className={`lg:h-fit pb-2 lg:pb-4 flex flex-col justify-around`}>
            <div className='w-full h-16 rounded-lg'><div className='w-11/12 mx-auto mt-4 rounded-lg h-12 bg-slate-200'></div></div>
            <div className='hidden font-medium px-6 py-8 lg:flex flex-col gap-3'>
              <div className='w-full h-10 bg-slate-200 rounded-lg'>
                <div></div>
                <div className='w-full h-8 bg-slate-200 rounded-lg'></div> 
              </div>
              <div className='text-xl flex justify-between'>
                <div className=''></div> 
                <div className='w-full h-8 bg-slate-200 rounded-lg'></div></div>
                </div>
              <div className='text-xl flex justify-between'>
                <div></div>
                <div className='w-11/12 mx-auto h-10 bg-slate-200 rounded-lg'></div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <button className='w-11/12 h-10 mt-6 rounded-md lg:rounded-xl bg-slate-200 '></button>
            </div>
        </div>
    </>
  )
}

export default SkeletonCarttoal
