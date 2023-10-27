import React from 'react'
import Checkout from './Checkout'
import { Outlet } from 'react-router-dom';
import Carttotal from '../../components/Carttotal.js';
import { useEffect, useState } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
const Layout = () => {
  const [isSticky, setIsSticky] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('bottom-navbar');
      const threshold = navbar.offsetHeight + 20;

      if (window.scrollY > threshold) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
    <div className='h-24 bg-gray-50 border-b border-gray-300 drop-shadow-lg w-screen flex items-center justify-around'>
        <Link to='/'><div className='text-2xl font-semibold tracking-wide'>Ecommerce</div></Link>
        <div className='text-3xl text-gray-600 font-semibold flex tracking-wide'>Checkout</div>
        <div className='text-gray-600'><ion-icon name="lock-closed-sharp" style={{fontSize:'25px'}}></ion-icon></div>
    </div>
    <div className='min-h-screen w-screen flex flex-col lg:flex-row lg:p-4 lg:py-10 justify-around bg-gray-100'>
      <div className='flex flex-col items-center gap-4 lg:gap-6 font-Inter w-full lg:w-8/12 h-fit '>
          <div className='w-full'>
            <Checkout />
          </div>
          <div className='w-full h-screen lg:h-fit shadow-lg rounded-md bg-white p-4'>
            <Outlet />
          </div>
      </div>
      
        <div className='hidden lg:block w-[24%]'>
          <Carttotal />
        </div>
        <nav id="bottom-navbar" className={`bottom-navbar ${isSticky ? 'sticky' : ''}bg-white w-full block lg:hidden mb-4 drop-shadow-searchShadow`}>
        {/* <div className='bg-white w-full px-3 py-1 block lg:hidden'> */}
          <Carttotal />
        {/* </div> */}
        </nav>
      </div>
    </>
  )
}

export default Layout
