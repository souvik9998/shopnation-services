import React, { useEffect } from 'react'
import Introimage from '../Images/IntroImage.png';
import { motion } from 'framer-motion';

const Introduction = () => {
  // const introImage = window.localStorage.getItem('introImage');
  return (
    <>
        <div className='flex justify-center items-center w-full bg-red-200/30 h-full rounded-sm font-Inter gap-2'>
        <div
            className='w-1/2 flex flex-col pl-10 gap-4 md:gap-6'>
                <div className='text-3xl  lg:text-6xl font-semibold space-y-4 font-Inter'>Access your nearest<br/>virtual stores </div>
                <div><button className='bg-buttonColor font-medium text-white w-32 h-9 text-md md:w-36 md:h-12 md:text-lg rounded-md'>Shop now</button></div>
            </div>
            <div
            className='w-1/2 h-full flex justify-end pr-20 pb-6 items-center'>
                {/* <img src={Introimage} loading='lazy' className='h-full w-fit scale-125'></img> */}
            </div>
            
            
        </div> 
    </>
  )
}

export default Introduction
