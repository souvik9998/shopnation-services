import React from 'react'

const SkeletonshopdetailsCard = () => {
  return (
    <>
      <div className='flex flex-col px-5 animate-pulse w-full h-screen gap-10'>
        <div className='w-11/12 h-40 bg-gray-200 rounded-md'></div>
        <div className='w-11/12 h-8 bg-gray-200 rounded-xl'></div>
        <div className='w-11/12 h-8 bg-gray-200 rounded-xl'></div>
        <div className='w-11/12 h-8 bg-gray-200 rounded-xl'></div>
        <div className='w-11/12 h-8 bg-gray-200 rounded-xl'></div>
      </div>
    </>
  )
}

export default SkeletonshopdetailsCard
