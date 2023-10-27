import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
const Myaccount = (props) => {
  const navigate = useNavigate();
    const {authorizationMessage,setAuthorizationMessage} = useGlobalContext();
    const logout = () =>{
		window.localStorage.clear();
    setAuthorizationMessage(null);
		navigate("/loginrole");
    }
  return (
    <>
      {(authorizationMessage === 'authorized')?
           <div className='lg:relative group'>
           <div className='flex cursor-pointer gap-2 lg:h-9 lg:px-2 lg:rounded-md lg:hover:bg-zinc-800 lg:border lg:border-navColor items-center'>
             <div className='flex items-center gap-1'><div className='pt-1'><ion-icon style={{fontSize:'20px'}} name="person-outline"></ion-icon></div><div>My account</div></div>
             <div className='mt-1'>
             {/* <div className='mt-1 group group-hover:origin-center group-hover:rotate-180 group-hover:-mt-1 hover:origin-center hover:-mt-1 transition-all duration-200 hover:rotate-180'> */}
              <ion-icon name="chevron-down-outline"></ion-icon></div>
           </div>
               
               <div className={`drop-shadow-lg bg-white font-medium cursor-pointer mr-6 lg:mr-0 transition duration-50 hidden hover:block lg:block lg:opacity-0 lg:h-0 lg:overflow-hidden  group-hover:block lg:hover:opacity-100 
               lg:hover:h-fit lg:group-hover:opacity-100 lg:group-hover:h-fit rounded-md lg:absolute lg:z-50 lg:w-48 right-4 lg: lg:-left-2 w-auto  text-zinc-800 after:`}>
                   <ul className=''>
                       <li className='m-auto hover:bg-blue-200/20 hover:text-buttonColor font-medium pl-4 pr-6 py-2 border-slate-400 text-sm p-1'>
                       <Link to='/user-profile'><div className='flex gap-3 justify-start items-center'>
                          <div className='pt-2'><ion-icon name="person-sharp"></ion-icon></div>
                           <div>profile</div>
                         </div></Link>
                       </li>
                       <li className='m-auto hover:bg-blue-200/20 hover:text-buttonColor font-medium pl-4 pr-6 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="bag-handle-sharp"></ion-icon></div>
                           <div>Orders</div>
                         </div>
                       </li>
                       <li className='m-auto hover:bg-blue-200/20 hover:text-buttonColor font-medium pl-4 pr-6 py-2 border-slate-400 text-sm p-1'>
                          <button onClick={()=>logout()}><div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="log-out-sharp"></ion-icon></div>
                           <div>Logout</div>
                          </div></button>
                       </li>
                       <li className='m-auto hover:bg-blue-200/20 hover:text-buttonColor font-medium  pl-4 pr-6 py-2 border-slate-400 text-sm p-1'>
                         <div className='flex gap-3 justify-start items-center'>
                           <div className='pt-1'><ion-icon name="information-circle-sharp"></ion-icon></div>
                           <div>Help and query</div>
                         </div>
                       </li>
                   </ul>
               </div>
         </div>
            : <Link to='/Loginrole' className='lg:text-base  font-semibold rounded-xl lg:px-3 lg:py-1'>Login</Link>
          }
    </>
  )
}

export default Myaccount
