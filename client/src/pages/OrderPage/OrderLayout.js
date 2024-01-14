import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { OrderProvider } from '../../context/OrderContext';
const OrderLayout = () => {
  const location = useLocation();
    const isActive = (currentPath,linkPath)=>{
        return (currentPath === linkPath) ? 'w-fit h-fit pb-1 border-b-[2px] lg:border-b-[2.5px] border-zinc-800 text-zinc-800':
        'w-fit h-fit pb-1 text-zinc-500'
    }
  return (
    <>
    
      <div className='w-full h-fit lg:py-16 py-6 bg-gray-100'>
        <div className='w-full lg:w-10/12 px-2 lg:pl-20 mx-auto'>
        <div className='flex item-center justify-center lg:items-baseline lg:justify-normal gap-4 lg:gap-10 font-semibold'>
            <Link to='/order-page'><div className={`${isActive(location.pathname,'/order-page')} lg:text-base text-xs`}>Order</div></Link>
            <Link to='/order-page/successful-order'><div className={`${isActive(location.pathname,'/order-page/successful-order')} lg:text-base text-xs`}>Successful Orders</div></Link>
            <Link to='/order-page/cancelled-order'><div className={`${isActive(location.pathname,'/order-page/cancelled-order')} lg:text-base text-xs`}>Cancelled Orders</div></Link>
            
        </div>
        <div className='h-[1px] w-full bg-slate-400'></div>
        </div>
        
        <div className='w-full lg:w-10/12 pt-4 px-2 lg:pt-12 lg:pl-16 mx-auto'>
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default OrderLayout
