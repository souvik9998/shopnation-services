import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cartproductcard from '../components/Cartproductcard';
import { useGlobalContext } from '../components/context';
import { Link } from 'react-router-dom';
import Carttotal from '../components/Carttotal';
import Skeletoncard from '../components/skeletonComponents/Skeletoncard';
import SkeletonCarttoal from '../components/skeletonComponents/SkeletonCarttoal';
import cartsvg from '../Images/Cartnotloggedin.svg';
import Loadinscreen from './Loadinscreen';

const Usercart = () => {
   const {userId} = useParams();
   const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
   const {cartList,setCartList,isAuthorized,authorizationMessage,isLoading} = useGlobalContext();
   const {cartLoading,setCartLoading} = useGlobalContext();
   const navigate = useNavigate();
   
  return (
    <>{
      
      (authorizationMessage !== 'authorized')?
    <div className='min-w-screen min-h-screen flex justify-center'>
      <div className=' py-8 px-4 bg-cardColor rounded-sm border-buttonColor w-[80%] h-[60%] flex flex-col mt-8 items-center'>
      <div className=''>
        <img src={cartsvg}></img>
      </div>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='font-medium text-sm'>Missing cart items?</div>
        <div className='font-medium text-sm'>Just comeback after loggin in to your account</div>
        <div onClick={()=>{
          navigate('/Loginrole')
        }} className='bg-buttonColor cursor-pointer text-white rounded-md flex justify-center items-center h-12 font-semibold w-72'>Login to your account</div>
      </div>
      </div>
    </div>:
    (cartProductCounter === 0)?
    <div className='min-w-screen min-h-screen flex justify-center'>
    <div className=' py-8 px-4 bg-cardColor rounded-sm border-buttonColor w-[80%] h-[80%] flex flex-col mt-8 items-center'>
    <div className=''>
      <img src={cartsvg}></img>
    </div>
    <div className='flex flex-col justify-center items-center gap-4'>
      <div className='font-medium text-sm'>No items in cart</div>
      <div className='font-medium text-lg text-buttonColor'>Explore stores to add items in the cart...</div>
    </div>
    </div>
  </div>:<div className='bg-gray-100 flex flex-col lg:min-w-screen lg:min-h-screen lg:flex-row justify-around p-2 lg:p-4 lg:py-10 font-Inter'>
        <div className='block lg:hidden px-1 mb-4 lg:pb-0'>
          <Carttotal />
        </div>
        <div className='w-full lg:w-8/12  h-fit rounded-md'>
          {
            // isLoading ? 
            // skeleton.map((curr)=>{return <Skeletoncard />}):
            cartList.map((currProduct)=>{
                return <Cartproductcard 
                  productId = {currProduct.product_id}
                  productName={currProduct.product_name}
                  productAmount={currProduct.product_amount}
                  quantity = {currProduct.quantity}
                  productType = {currProduct.product_type}
                  userId = {userId}
                />
            }
            )
          }
          </div>
          {
            cartLoading?<div className='hidden lg:block w-3/12'><SkeletonCarttoal /></div>
            :
            <div className='hidden lg:block w-[24%]'>
            <Carttotal />
            </div>
          }
          
          
      </div>
}
    </>
    
  )
}

export default Usercart
