import React from 'react'
import Myaccount from './Myaccount'
import Searchbar from '../Searchbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import shopnation from '../../Images/Shopnation.png'
const Navbar = () => {
    const[open,setOpen] = useState(false);
    const {user,cartProductCounter,cartList} = useGlobalContext();
    const userId = user.userId;
    const navigate = useNavigate();
    const handleClick = (e)=>{
        e.stopPropagation();
        setOpen(true);
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
            <div className='flex items-center justify-around'>
                <div className='flex gap-2 w-[70%] items-center '>
                <div onClick={()=>{setOpen(true)}} className='block lg:hidden text-lg text-white pt-[3px] ' >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
                </div>
                <div className='text-lg font-medium lg:font-semibold lg:text-xle w-[60%]'>
                    <Link to='/'>
                    <img className='h-[80%] w-fit' src={shopnation}></img>
                </Link></div>
                </div>
                
                {
                    (user)?
                    <div className='flex gap-1 w-[30%] justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
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

        
        <div
        onClick={()=>setOpen(false)} 
        className={open ?' fixed h-full top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-40':''}>
            <ul 
            onClick={(e)=>handleClick(e)} 
            className={open ?' shadow-xl w-[65%] h-full z-40 bg-white text-gray-600 items-center fixed top-0 left-0 ease-in-out duration-300 shadow-black': 'fixed top-0 left-[-100%] '}>
                <li className='flex px-4 py-5 bg-navColor items-center gap-2'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="bg-w-5 h-5">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div className=' text-white font-medium tracking-wide text-lg'>Login & Signup</div>

                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div>All categories</div>
                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" class="w-5 h-5">
                    <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                    <path fill-rule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div>Trending stores</div>
                </li>
                <div className='w-full bg-gray-300 h-[1px]'></div>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>Orders</div>
                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center' onClick={handleClick}>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" className="w-5 h-5">
                    <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                    </svg>
                    </div>
                    <Link to={`/user-cart/${userId}`}>My cart</Link>
                </li>
                <li 
                onClick={()=>navigate('/user-profile')}
                className='py-[10px] pl-4  flex gap-2 items-center'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    Profile
                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    </div>
                    <div>My wishlist</div>
                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
                    </svg>
                    </div>
                    <div>Orders</div>
                </li>
                <div className='w-full bg-gray-300 h-[1px]'></div>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>Help center</div>
                </li>
                <li className='py-[10px] pl-4  flex gap-2 items-center'>
                <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#808080" class="w-5 h-5">
                    <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div>Logout</div>
                </li>
                
            </ul>
        </div>
            
            
    </div>
    </>
  )
}

export default Navbar
