import React from 'react'
import Addproduct from './Addproduct'
import { Outlet } from 'react-router-dom'

const Addproductlayout = () => {
  return (
    <>
    <div className='px-8 pt-10 w-full h-fit'>
      <div className='h-[25%]'>
        <Addproduct />
      </div>
     <div className='h-fit'><Outlet/></div>
     
     </div>
    </>
  )
}

export default Addproductlayout
