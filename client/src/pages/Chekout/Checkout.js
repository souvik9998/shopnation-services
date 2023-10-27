import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../components/context';
import { ToastContainer, toast } from 'react-toastify';

const Checkout = () => {
  const location = useLocation();
  const {defaultAddress} = useGlobalContext();
  const showToast = () => {
    toast.error('Please add an default address', {
      position: "bottom-left",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const isActive = (currentPath,linkPath) => {
    return (currentPath === linkPath) ? 
    'w-full h-full border lg:border-[1.5px] font-medium lg:font-medium border-buttonColor flex justify-center items-center text-[10px] lg:text-base bg-white text-buttonColor'
    : 'w-full h-full font-medium lg:font-medium flex justify-center items-center text-[10px] lg:text-base bg-buttonColor text-white'
  }
  return (
    <>
    <div className=''>
     <ul className='relative font-Inter flex h-7 lg:h-10 justify-between gap-[1px]'>
        <li className='w-4/12'><Link to='/checkout' className={isActive(location.pathname,'/checkout')}>Delivery Adress</Link></li>
        <li className='w-4/12'><Link to='/checkout/reviewpage'  className={isActive(location.pathname,'/checkout/reviewpage')}>Review items</Link></li>
        <li className='w-4/12'><Link to='/checkout/paymentpage' className={isActive(location.pathname,'/checkout/paymentpage')}>Payment Method</Link></li>
     </ul> 
    </div>
    </>
  )
}

export default Checkout
