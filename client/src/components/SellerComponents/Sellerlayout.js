import React from 'react'
import { Outlet } from 'react-router-dom'
import Sellernavigation from './Sellernavigation'
const Sellerlayout = () => {
  return (
    <>
    <div className='h-screen w-full flex gap-4 font-Inter'>
        <div className='w-[18%] h-full'><Sellernavigation/></div>
        <div className='w-10/12 h-screen'><Outlet/></div>
    </div>
      
        
    </>
  )
}

export default Sellerlayout
