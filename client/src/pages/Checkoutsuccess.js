import React from 'react'
import animationData from '../Images/OrderSuccessfulAnimation.json'
import Lottie from 'lottie-react';
import OrderConfirmed from '../Images/order-confirmed.svg';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../components/context';
const Checkoutsuccess = () => {
  const {cartList} = useGlobalContext();
  console.log(cartList);

  return (
    <>
    <div className='font-Inter w-screen h-screen flex flex-col items-center pt-8'>
      <div className='w-11/12 h-72 border-2 border-green-500 rounded-lg flex py-6'>
        <div className='w-20 h-20 -mt-5'>
        <Lottie
          animationData={animationData}
          loop = {false}
        />
        </div>
        <div className='flex gap-2 w-full'>
        <div className='w-6/12 flex flex-col gap-10 justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='font-semibold text-xl text-green-600'>Thank you, your order have been successfully placed</div>
            <div className='text-sm font-medium'>A confirmation will be sent to you in your provided email address or phone number <span className='underline text-red-800'>you can change the settings in your account</span></div>
          </div>
          <div className='flex flex-col gap-4'>
            <Link to='/'><div className='h-fit py-2 rounded-md text-center w-52 px-6 font-medium bg-buttonColor text-white'>See your orders</div></Link>
            <Link to='/'><div className='h-fit py-2 rounded-md text-center w-52 px-6 font-medium bg-buttonColor text-white'>Continue shopping</div></Link>
          </div>
          </div>
          <div className='w-6/12 flex justify-end pr-10 items-center'>
            <img src={OrderConfirmed}></img>
          </div>
        </div>
        
      </div>
    </div>
    
    </>
  )
}

export default Checkoutsuccess