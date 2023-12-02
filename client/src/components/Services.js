import React from 'react'
import maid from '../Images/maid.svg'
import plumber from '../Images/plumber.svg';
import carpenter from '../Images/carpenter.svg';
import teacher from '../Images/teacher.svg';
import milkman from '../Images/milkman.svg';
import homecleaner from '../Images/homecleaner.svg';
import newspaperseller from '../Images/newspaperseller.svg';
import chef from '../Images/chef.svg';
import barber from '../Images/hairdresser.svg'
import firefigher from '../Images/firefighter.svg'
import builder from '../Images/builder.svg'
import programmer from '../Images/programmer.svg'
import electrician from '../Images/electrician.svg';
const Services = () => {
  return (
    <>
      <div className='w-full h-fit flex flex-col gap-1 lg:gap-4 pt-2 pb-3 px-1 lg:pb-4 lg:pt-4 bg-yellow-200/20 lg:bg-slate-200/60 shadow'>
            <div className='font-semibold text-base lg:text-2xl px-4'>Access your nearest services</div>
            <div className=' w-full h-full grid grid-rows-2 lg:grid-rows-3 grid-cols-5 lg:grid-cols-3 lg:gap-2 lg:px-2'>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={maid}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Maid service</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={chef}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Cook</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={plumber}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Plumber</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={carpenter}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Carpenter</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={teacher}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Teaching</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={firefigher}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Fire fighter</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={electrician}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Electrician</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={barber}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Barber</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={builder}></img>
                <div className='text-xs lg:text-sm font-semibold text-center'>Builder</div>
              </div>
              <div className='lg:hidden flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-slate-200/90 hover:bg-slate-200/80 rounded-xl'>
                <img className='h-fit w-fit' src={programmer}></img>
                <div className='text-xs lg:text-sm px-2 font-semibold text-center'>Programmer</div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-navColor text-white w-fit px-6 lg:px-8 rounded-xl py-[2px] lg:py-1 text-base lg:text-lg'>See all services</div>
            </div>
        </div>
    </>
  )
}

export default Services
