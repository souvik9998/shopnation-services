import React from 'react'
import { Link, Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Storecard = ({store}) => {
  const navigate = useNavigate();
  const handleClick = ()=>{
    navigate(`/ShopProductPage/${store.shopId}`);
  }
  return (
    <>
      <div 
      onClick={()=>handleClick()}
      className="font-Inter flex flex-col justify-center items-center bg-white w-full h-full rounded-md shadow-lg hover:shadow-xl border-inherit border hover:border hover:bg-gray-300">
        <div className='w-full h-full flex items-center justify-center relative'>
          <img className="w-full h-full rounded-md" src={`http://localhost:3002/${store.shopImagePath}`} alt="Product Image" />
          <div className="absolute w-full h-full rounded-md bg-black/20"></div>
            <div className='absolute left-0 top-3 flex gap-[2px] bg-green-600 text-white rounded-sm w-12 text-xs items-center justify-center'>
              <div className='py-1'>4.2</div>
              <div className='pt-[0.8px]'><ion-icon name="star"></ion-icon></div>
            </div>
            <div className='absolute bottom-0 flex bg-white pt-3 pb-2 w-full justify-between px-4 rounded-b-md'>
            <div className='flex flex-col items-start gap-2 '>
              <div className="text-gray-900 font-semibold text-sm md:text-lg capitalize h-[40%]">{store.storeName}</div>
              <div className="h-[60%] text-sm">
                <div>{store.type}</div>
              </div>
            </div>
            <div className='mt-1 w-9 h-9 rounded-lg pb-1 text-white flex items-center justify-center bg-buttonColor text-2xl font-normal'>+</div>
          </div>
        </div>
        
        
      </div>

    </>
  )
}

export default Storecard
