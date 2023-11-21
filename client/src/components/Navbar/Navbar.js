import React from 'react'
import Myaccount from './Myaccount'
import Searchbar from '../Searchbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
import shopnation from '../../Images/Shopnation.png'
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
     <div className='font-Inter font-semibold w-full flex h-fit py-2 lg:py-5 px-1 lg:pr-8 lg:pl-8 bg-navColor justify-between text-white items-center'>
        <div className='hidden text-lg font-medium lg:font-semibold lg:text-xl lg:w-[12%] lg:block'>
        <Link to='/'>
            <img className='h-4 w-8 lg:h-full lg:w-full' src={shopnation}></img>
        </Link>
        </div>
        <div className= 'hidden lg:block w-10/12 lg:w-[45%] '><Searchbar/></div>
        <div className='w-full flex flex-col gap-2 lg:hidden'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-2 '>
                <div onClick={handleClick} className='block lg:hidden text-lg text-white pt-[3px]' >
                {
                    open ? <ion-icon name="close"></ion-icon>:
                    <ion-icon name="menu"></ion-icon>
                }
                </div>
                <div className='text-lg font-medium lg:font-semibold lg:text-xl lg:w-[12%] lg:block'><Link to='/'>
                    <img src={shopnation}></img>
                </Link></div>
                </div>
                
                {
                    (user)?
                    <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>

                        <div className='text-[10px] font-medium'>{user.userName}</div>
                    </div>
                    :
                    <div>Sign in</div>
                }
            </div>
            
            <div className= 'w-full'><Searchbar/></div>
            
        </div>
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
