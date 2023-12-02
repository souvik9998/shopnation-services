import React from 'react'

const SkeletonStorecard = () => {
  return (
    <>
        <div className='w-full h-screen lg:w-[82%] lg:px-10 px-2 py-4 lg:py-10 grid grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-5 rounded-md'>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
            <div className='h-full w-full bg-gray-200 rounded-lg animate-pulse'></div>
        </div>
    </>
  )
}

export default SkeletonStorecard
