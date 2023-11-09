import React from 'react'
import Searchbar from "../components/Searchbar";
import { Outlet } from 'react-router-dom';
import Storehub from '../components/Storehub';
import Introduction from '../components/Introduction';
import offer from '../Images/offer.jpg'
import Carthub from '../components/Carthub';
import StoreType from '../components/StoreType';
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
    <div className='w-[20%] hidden  lg:flex justify-center items-center border-black bg-slate-200/60'>
            <Carthub/>
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
