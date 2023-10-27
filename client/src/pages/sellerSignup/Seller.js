import React, { useEffect } from 'react'
import triangle from '../../Images/triangle.svg'
import Sellersignup from './Sellersignup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Seller = () => {
  const [slideFull,setSlideFull] = useState(false);
  const [textReveal,setTextReveal] = useState(false);
  const navigate = useNavigate();
  const handleClick = ()=>{
    setSlideFull(!slideFull);
    
  }
  useEffect(()=>{
    const Timer = setTimeout(()=>{
      setTextReveal(true);
      console.log(textReveal)
    },850)

    return ()=> clearTimeout(Timer);
  })
  return (
    <>
    <div className='w-screen h-screen font-Inter overflow-x-hidden'>
      <div className='relative w-full h-full'>
        <div className={`absolute top-0 right-0 bg-buttonColor w-full h-full transform-gpu ${ (slideFull) ? 'animate-slideFull flex' : 'animate-slideIn'} after z-10 px-10 pt-20`}>
            {
              slideFull ? 
              <div className={`w-full h-full ${ (slideFull) ? 'flex' :''}`}>
                <div className=''>
                  <div className={`text-5xl text-white font-bold tracking-wider`}><span>"</span>Give your<br/> physical store <br/>an online version<span>"</span></div>
                  <div className='flex mt-16 gap-16 items-center'>
                    <div className='animate-slideNext' onClick={handleClick}><ion-icon name="arrow-back-circle" style={{fontSize:'50px',color:'white'}}></ion-icon></div>
                    <div className='text-white'>Go back to sign up page</div>
                  </div>
                </div>
              <div className='flex flex-col h-52 w-7/12 justify-center items-center text-white border-black gap-2'>
                <div><button className='w-72 h-10 bg-white rounded-lg text-buttonColor font-semibold' onClick={()=>{navigate('/loginpage')}}>Login as a buyer</button></div>
                <div className='font-semibold text-white text-lg'>or</div>
                <div><button className='w-72 h-10 bg-white rounded-lg text-buttonColor font-semibold' onClick={()=>{navigate('/seller-loginpage')}}>Login as a seller</button></div>
              </div></div>
              :
              <div className={`transition-opacity duration-200 ease-in-out ${(textReveal) ? 'opacity-100':'opacity-0'}`}>
              <div className='text-5xl text-white font-bold tracking-wider'><span>"</span>Give your<br/> physical store <br/>an online version<span>"</span></div>
              <div className='flex mt-16 gap-28 items-center '>
                <div className='text-white'>Have an account?<span className='ml-1 font-semibold'><button className='underline' onClick={handleClick}>sign in</button></span></div>
                <div className='animate-slideNext' onClick={handleClick}><ion-icon name="arrow-forward-circle" style={{fontSize:'50px',color:'white'}}></ion-icon></div>
              </div></div>
              
            }

        </div>
        <div className='absolute top-0 right-0 bg-blue-200 w-full h-full transform-gpu animate-slideInBehind z-0'></div>
        <div className='absolute'>
            <Sellersignup setSlideFull={setSlideFull} slideFull={slideFull}/>
        </div>
        </div>
    </div>
    </>
  )
}

export default Seller
