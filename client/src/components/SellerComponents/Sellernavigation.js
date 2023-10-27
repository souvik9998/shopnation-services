import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
const Sellernavigation = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const location = useLocation();
  const navigate = useNavigate();
  const[isDropdownFirst,setDropdownFirst] = useState(false);
  const[isDropdownSecond,setDropdownSecond] = useState(false);

  const handleLogout = () =>{
    localStorage.clear();
    navigate('/Loginrole');
  }

  const handleClick = () =>{
    setDropdownFirst(false);
    setDropdownSecond(false);
  }
  const handleDropdownSecond = () =>{
    setDropdownFirst(false);
    setDropdownSecond(!isDropdownSecond)
  }
  const handleDropdownFirst = () =>{
    setDropdownSecond(false);
    setDropdownFirst(!isDropdownFirst)
  }
  const isActiveProduct = (currentPath) => {
    return (currentPath.startsWith('/seller/productmanagement-page/'))
    ? 'text-zinc-800':'transition duration-50 text-zinc-500'
  }
  const isActiveOrder = (currentPath) => {
    return (currentPath.startsWith('/seller/ordermanagement-page/')) 
    ? 'text-zinc-800':'transition duration-50 text-zinc-500'
  }
  const isActiveNormal = (currentPath,linkPath) =>{
    return (currentPath === linkPath) ? 'bg-gray-100 rounded-md text-zinc-800':'transition duration-50 text-zinc-500'
  }
  return (
    <>
    
    <div className='h-screen w-[18%] border-r border-zinc-300 fixed top-0 left-0 font-Inter text-zinc-500 text-base font-semibold gap-8 flex flex-col pt-10 pb-6'>
            <div className='flex flex-col text-zinc-600  px-8'>
                <div className='flex gap-2'>
                    <div><Link to='/seller/seller-profile'>{userInfo.name}</Link></div>
                    <div><ion-icon name="caret-down-outline"></ion-icon></div>
                </div>
                
            </div>
            <div className='flex flex-col flex-1 justify-between'>
                <div className='flex flex-col'>
                    <Link to='/seller'><div onClick={()=>handleClick()} className={`h-12 w-full px-8  flex items-center  ${isActiveNormal(location.pathname,'/seller')}`}>Dashboard</div></Link>
                    <div className=''>
                      <Link to='/seller/productmanagement-page/product-details'><div className='flex items-center h-12 gap-2 w-full px-8'onClick={()=>handleDropdownFirst()} >
                        <div  className={isActiveProduct(location.pathname)}>
                                Product management
                            </div>
                            <div className={isActiveProduct(location.pathname)}><ion-icon name="caret-down-outline"></ion-icon></div>
                        </div></Link>
                        <div className={isDropdownFirst ? 'px-6 flex w-full flex-col opacity-100 transition duration-150' : 'opacity-100 h-0 overflow-hidden'}>
                            <Link to='/seller/productmanagement-page/product-details'><div className={`h-10 w-full px-8  flex items-center ${isActiveNormal(location.pathname,'/seller/productmanagement-page/product-details')}`}>Product details</div></Link>
                            <Link to='/seller/productmanagement-page/edit-products'><div className={`h-10 w-full px-8  flex items-center ${isActiveNormal(location.pathname,'/seller/productmanagement-page/edit-products')}`}>Edit products</div></Link>
                            <Link to='/seller/productmanagement-page/add-products'><div className={`h-10 w-full px-8  flex items-center ${isActiveNormal(location.pathname,'/seller/productmanagement-page/add-products')}`}>Add Product</div></Link>
                            
                        </div>
                    </div>
                    <div className=''>
                        <Link to='/seller/ordermanagement-page/order-details'><div className='flex items-center gap-4 h-12 w-full px-8 'onClick={()=>handleDropdownSecond()}>
                            <div className={isActiveOrder(location.pathname)}>Order management</div>
                            <div className={isActiveOrder(location.pathname)}><ion-icon name="caret-down-outline"></ion-icon></div>
                        </div>
                        </Link>
                        <div className={isDropdownSecond ? 'px-6 flex flex-col opacity-100 transition duration-150' : 'opacity-0 h-0 overflow-hidden'}>
                            <Link to='/seller/ordermanagement-page/order-details'><div className={`h-10 w-full px-8  flex items-center ${isActiveNormal(location.pathname,'/seller/ordermanagement-page/order-details')}`}>Order details</div></Link>
                            <Link to='/seller/ordermanagement-page/edit-orders'><div className={`h-10 w-full px-8  flex items-center ${isActiveNormal(location.pathname,'/seller/ordermanagement-page/edit-orders')}`}>Edit orders</div></Link>
                        </div>
                    </div>
                    <div className='h-12 w-full px-8  flex items-center ' onClick={()=>handleClick()}>Daily orders</div>
                    <div onClick={()=>handleClick()} className='h-12 w-full px-8  flex items-center '>Order details</div>
                    <div onClick={()=>handleClick()} className='h-12 w-full px-8  flex items-center '>Leaderboards</div>
                    <div onClick={()=>handleClick()} className='h-12 w-full px-8  flex items-center '>Supplier management</div>
                </div>
                <div className='flex flex-col gap-1 pl-10 pr-4'>
                    <div>Help center</div>
                    <div>Settings</div>
                    <div onClick={handleLogout}>Logout</div>
                </div>
            </div>
        </div>
        </>
  )
}

export default Sellernavigation
