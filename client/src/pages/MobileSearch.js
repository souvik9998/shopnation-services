import React from 'react'
import { useNavigate } from 'react-router-dom';
const MobileSearch = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Go back in the browser history
    };
  return (
    <>
        <div className='bg-gray-200 flex flex-col gap-2 h-screen w-full'>
            <div className='bg-white flex gap-2 h-16 items-center pl-3'>
                <div
                onClick={()=>handleBack()}
                ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#666666" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                </div>
                <input
                 name='item' 
                 method='post' 
                 autocomplete='off'
                 type="search" placeholder="Find your store.." 
                 className='outline-none focus:outline-none placeholder:text-[#666666] font-medium '
                />
            </div>
            <div className='bg-white h-full'></div>
        </div>  
    </>
  )
}

export default MobileSearch
