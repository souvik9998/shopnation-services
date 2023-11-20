import React, { useState } from 'react'
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config/config';
const Storecard = ({store}) => {
  const navigate = useNavigate();
  const [clicked,setClicked] = useState(false);
  const handleClick = ()=>{
    navigate(`/ShopProductPage/${store.shopId}`);
  }
  return (
    <>
      <div 
      onClick={()=>handleClick()}
      className="font-Inter flex flex-col justify-center items-center bg-white w-full h-full rounded-md shadow-lg hover:shadow-xl border-inherit border hover:border hover:bg-gray-300">
        <div className='w-full h-full flex items-center justify-center relative'>
          <img className="w-full h-full md:rounded-md" src={`http://${baseUrl}/${store.shopImagePath}`} alt="Product Image" />
          <div className="absolute w-full h-full rounded-md bg-black/20"></div>
            <div className='absolute left-0 top-1 md:top-3 flex gap-[2px] bg-green-600 text-white rounded-sm w-6 md:w-12 text-xs items-center justify-center'>
              <div className='md:py-1 text-[7px] md:text-xs'>4.2</div>
              <div className='md:pt-[0.8px]'><ion-icon name="star" style={{fontSize:'7px'}}></ion-icon></div>
            </div>
            <div className='absolute bottom-0 h-9 md:h-[72px] flex bg-white py-1 md:py-2 w-full justify-between px-1  md:px-4 md:rounded-b-md'>
            <div className='flex flex-col items-start gap-1 md:gap-[9px] '>
              <div className="text-gray-900 font-semibold text-[9px] md:text-lg capitalize h-[40%]">{store.storeName}</div>
              <div className="h-[60%] text-[8px] md:text-sm flex gap-[2px] md:gap-1">
                <div className='pt-[2px]'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#03AC13" className="w-2 h-2 md:w-4 md:h-4">
                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className='capitalize'>{store.type}</div>
              </div>
            </div>
            <div className='shadow border border-gray-300 rounded-full h-fit w-fit p-[3px] md:p-[6px]'
            onClick={(e)=>{
              e.stopPropagation();
              setClicked(!clicked)
            }}
            >
              {
                (!clicked)?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-2 h-2 md:w-5 md:h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>:
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-2 h-2 md:w-5 md:h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            
              }
              

            </div>
          </div>
        </div>
        
        
      </div>

    </>
  )
}

export default Storecard
