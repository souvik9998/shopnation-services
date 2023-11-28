import React from 'react'
import Searchbar from "../components/Searchbar";
import { Outlet } from 'react-router-dom';
import Storehub from '../components/Storehub';
import Introduction from '../components/Introduction';
import offer from '../Images/offer.jpg'
import Carthub from '../components/Carthub';
import StoreType from '../components/StoreType';
import maid from '../Images/maid.svg'
import plumber from '../Images/plumber.svg';
import carpenter from '../Images/carpenter.svg';
import teacher from '../Images/teacher.svg';
import milkman from '../Images/milkman.svg';
import homecleaner from '../Images/homecleaner.svg';
import newspaperseller from '../Images/newspaperseller.svg';
import cook from '../Images/cook.svg';
import barber from '../Images/barber.svg'
const Home = () => {
  return (
    <>
    <div className='flex flex-col'>
    <div className='hidden bg-white w-screen h-fit lg:flex justify-center items-center mb-4'>
      <div className='bg-slate-200/60 w-full h-full'>
        <StoreType />
      </div>
    </div>
    <div className='bg-white w-screen h-32 lg:h-60 flex justify-center items-center px-1 pt-1  lg:rounded-none lg:pt-0 lg:px-8'>
      <Introduction/>
    </div>
    
    <div className='bg-white lg:flex w-screen px-1 lg:px-8 py-2 lg:gap-4'>
    <div className=' bg-slate-200/60 border-black  flex flex-col w-full lg:w-[80%] h-64 md:h-[80vh] lg:px-6 lg:pb-4'>
      <div className='font-Inter text-sm md:text-2xl font-semibold text-black pl-2 h-[13%] flex items-center'>Top store picks for you</div>
      <div className='flex  w-full rounded-lg md:w-full border-black h-[87%]'>
        <Storehub/>
      </div>
    </div>
    <div className='w-[20%] hidden  lg:flex flex-col gap-4 pb-4 pt-4 bg-yellow-200/20 border-[1px] border-yellow-300/30 shadow'>
            <div className='font-semibold text-2xl px-4'>Access your nearest services</div>
            <div className='w-full h-full grid grid-rows-3 grid-cols-3 gap-2 px-2'>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={maid}></img>
                <div className='text-sm font-semibold text-center'>Maid service</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={cook}></img>
                <div className='text-sm font-semibold text-center'>Cook</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={plumber}></img>
                <div className='text-sm font-semibold text-center'>Plumber</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={carpenter}></img>
                <div className='text-sm font-semibold text-center'>Carpenter</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={teacher}></img>
                <div className='text-sm font-semibold text-center'>Teaching</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={milkman}></img>
                <div className='text-sm font-semibold text-center'>Milk seller</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={barber}></img>
                <div className='text-sm font-semibold text-center'>Barber</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={homecleaner}></img>
                <div className='text-sm font-semibold text-center'>Home cleaning</div>
              </div>
              <div className='flex flex-col items-center justify-around p-4 hover:shadow-md hover:border-[1px] hover:border-yellow-200/30 hover:bg-yellow-300/10 rounded-xl'>
                <img className='h-fit w-fit' src={newspaperseller}></img>
                <div className='text-sm font-semibold text-center'>Newspaper seller</div>
              </div>
            </div>
            <div className='flex justify-center items-center'>
              <div className='bg-navColor text-white w-fit px-8 rounded-xl py-1 text-lg'>See all services</div>
            </div>
        </div>
    </div>
    {/* <div className='bg-white h-screen'></div> */}
    
    </div>
    {/* <h1>hello</h1> */}
    {/* <div className='mx-auto my-16'>
      <Searchbar />
    </div> */}
      
    {/* <div>
      <h3 className='section-heading'>Search store near you</h3>
    </div>  */}
    {/* <SearchPage/> */}
    {/* </div> */}
    </>
      
  )
}

export default Home;
