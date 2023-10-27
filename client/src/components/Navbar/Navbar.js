import React from 'react'
import Myaccount from './Myaccount'
import Searchbar from '../Searchbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

const Navbar = () => {
    const[open,setOpen] = useState(false);
    const {user,cartProductCounter,cartList} = useGlobalContext();
    const userId = user.userId;
    const handleClick = ()=>{
        setOpen(!open);
    }
    open ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto'
  return (
    <>
     <div className='font-Inter font-semibold w-full flex h-20 px-2 lg:pr-8 lg:pl-8 bg-navColor justify-between text-white items-center'>
        <h1 className='text-xl hidden lg:w-[12%] lg:block'><Link to='/'>Ecommerce</Link></h1>
        <div className= 'w-10/12 lg:w-[45%]'><Searchbar/></div>
        <ul className='lg:w-[30%] hidden lg:flex font-size-[20px] font-medium justify-around items-center tracking-wide'>
            {/* <li className='px-4'><Link to='/'>Home</Link></li> */}
            <li className=''><Link to='/order-page'>
                <div className='flex items-center gap-2 cursor-pointer'>
                <div className='pt-1'><ion-icon style={{fontSize:'20px'}} name="bag-outline"></ion-icon></div>
                <div>Orders</div>
                </div>
                </Link>
                </li>
            <li className=''><Myaccount/></li>
            <li className='relative'><Link to={`/user-cart/${userId}`}>
                <div className='flex justify-center items-center gap-1'>
                <div className='pt-1'><ion-icon style={{fontSize:'30px'}} name="cart-outline"></ion-icon></div>
                <div>Cart</div>
            {
                (cartList.length === 0) ?''
                :<div className='absolute top-[1px] -right-[15px] z-50 bg-red-500 w-[18px] h-[18px] rounded-full flex justify-center items-center text-xs pr-[0.1px]'>{cartProductCounter}</div>
            }
            </div></Link></li>
            
            
        </ul>

        <div onClick={handleClick} className='block lg:hidden text-3xl text-white' >
            {
                open ? <ion-icon name="close"></ion-icon>:
                <ion-icon name="menu"></ion-icon>
            }
        </div>

            <ul className={open ?'p-1 w-[100%] h-screen z-40 bg-navColor items-center fixed top-[80px] left-0 ease-in-out duration-300': 'fixed top-[80px] left-[-100%]'}>
                <li className='p-3 border-b border-gray-600' onClick={handleClick}><Link to='/'>Home</Link></li>
                <li className='p-3 border-b border-gray-600'>Orders</li>
                <li className='p-3 border-b border-gray-600' onClick={handleClick}><Link to={`/user-cart/${userId}`}>Cart</Link></li>
                <li className='p-3 border-b border-gray-600'><Myaccount/></li>
                {/* <li className='p-3 border-b border-gray-600 '><Myaccount/></li> */}
                
            </ul>
            
    </div>
    </>
  )
}

export default Navbar
