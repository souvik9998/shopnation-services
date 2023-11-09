import React, { useEffect } from 'react'
import Introimage from '../Images/IntroImage.png';
import { motion } from 'framer-motion';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Pagination, Navigation } from "swiper";
import "../App.css";

const Introduction = () => {
  // const introImage = window.localStorage.getItem('introImage');
  return (
    <>
    <Swiper
        freeMode={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Autoplay, Pagination]}
        // breakpoints={{
        //   0: {
        //     slidesPerView: 2,
        //     grid: {
        //       rows: 2,
        //     }
        //   },
        //   768: {
        //     slidesPerView: 3,
        //     grid: {
        //       rows: 2,
        //     }
        //   },
        //   1024: {
        //     slidesPerView: 4,
        //     grid: {
        //       rows: 2,
        //     }
        //   }
        // }}
       
        className="mySwiper2 w-full h-full  rounded-sm font-Inter"
      >
      <SwiperSlide className='w-full bg-red-200/30'>
        <div
            className='w-full flex flex-col pl-2 lg:pl-10 gap-2 md:gap-6'>
                <div className='text-lg  lg:text-5xl font-semibold space-y-4 font-Inter'>Access your nearest<br/>virtual stores </div>
                <div><button className='bg-buttonColor  text-white w-fit h-fit px-2 py-1 text-xs rounded font-normal lg:font-medium lg:px-5 lg:py-[5px] lg:text-base  lg:rounded-md'>Shop now</button></div>
            </div>
            
        </SwiperSlide>
        <SwiperSlide className='w-full bg-buttonColor'>
        <div
            className='w-full flex flex-col pl-2 lg:pl-10 gap-2 md:gap-6'>
                <div className='text-lg  lg:text-5xl font-semibold space-y-4 font-Inter text-white'>Access your nearest<br/>virtual stores </div>
                <div><button className='bg-white  text-buttonColor w-fit h-fit px-2 py-1 text-xs rounded font-medium lg:font-medium lg:px-5 lg:py-[5px] lg:text-base  lg:rounded-md'>Shop now</button></div>
            </div>
            
        </SwiperSlide>
        </Swiper>
    </>
  )
}

export default Introduction
