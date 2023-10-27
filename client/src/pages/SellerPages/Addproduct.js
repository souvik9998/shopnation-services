import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const Addproduct = () => {
    const location = useLocation();
    const isActive = (currentPath,linkPath)=>{
        return (currentPath === linkPath) ? 'w-fit h-fit pb-1 border-b-[2.5px] border-zinc-800 text-zinc-800':
        'w-fit h-fit pb-1 text-zinc-500'
    }
  return (
    <>
        <div className='flex flex-col gap-6 '>
            <div className='text-3xl font-bold text-zinc-800'>Add Products</div>
            <div className='text-xs text-slate-400'>The most important feature 
                in the  product adding section is the product 
                adding part.When adding products here do not ifnore to
                fill in all the required fields completely and 
                follow the product adding rules.And you can add various types of product information
                according to your plan
            </div>
        </div>
        <div className='flex mt-10 gap-10 font-semibold'>
            <Link to='/seller/productmanagement-page/add-products/Overview'><div className={isActive(location.pathname,'/seller/productmanagement-page/add-products/Overview')}>Overview</div></Link>
            <Link to='/seller/productmanagement-page/add-products'><div className={isActive(location.pathname,'/seller/productmanagement-page/add-products')}>Add product +</div></Link>
            
        </div>
        <div className='h-[1px] w-full bg-slate-200'></div>
    </>
  )
}

export default Addproduct
