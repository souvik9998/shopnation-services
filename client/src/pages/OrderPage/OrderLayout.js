import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const OrderLayout = () => {
  const location = useLocation();
    const isActive = (currentPath,linkPath)=>{
        return (currentPath === linkPath) ? 'w-fit h-fit pb-1 border-b-[2.5px] border-zinc-800 text-zinc-800':
        'w-fit h-fit pb-1 text-zinc-500'
    }
  return (
    <>
      <div className='w-screen h-fit py-16 bg-gray-100'>
        <div className='w-10/12 pl-20 mx-auto'>
        <div className='flex gap-10 font-semibold'>
            <Link to='/order-page'><div className={isActive(location.pathname,'/order-page')}>Order</div></Link>
            <Link to='/order-page/successful-order'><div className={isActive(location.pathname,'/order-page/successful-order')}>Successful Orders</div></Link>
            <Link to='/order-page/cancelled-order'><div className={isActive(location.pathname,'/order-page/cancelled-order')}>Cancelled Orders</div></Link>
            
        </div>
        <div className='h-[1px] w-full bg-slate-400'></div>
        </div>
        
        <div className='w-10/12 pt-12 pl-16 mx-auto'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default OrderLayout
