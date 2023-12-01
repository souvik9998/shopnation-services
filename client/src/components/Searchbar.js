import React,{ useEffect, useState,useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from './context';
import Storesearch from '../pages/Storesearch';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config/config';
const Searchbar = () => {
  const{searchStoreList,searchQuery,setSearchQuery,setSearchStoreList,storeList} = useGlobalContext();
  const {isFormClicked,setFormClicked,setProductList} = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() =>{
    setFormClicked(false);
  },[location.pathname])
  useEffect(()=>{
    if(location.pathname === '/Storesearch'){
      const searchQuery = window.localStorage.getItem('searchQuery');
      setSearchQuery(searchQuery);
    }
    else{
      setSearchQuery('');
    }
  },[location.pathname]);
  useEffect(() => {
    const handleScroll = () => {
      // Calculate a threshold for scroll change
      const scrollThreshold = 0;

      if (window.scrollY > scrollThreshold) {
        setFormClicked(false); // Disable when scrolled
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleFormClicked = ()=>{
    setFormClicked(!isFormClicked);
    if (window.innerWidth < 1024) {
       navigate('/mobile-search');
    }
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    return await axios
      .post(`https://${baseUrl}/searchapi/searchResult`, { query: searchQuery })
      .then((response) => {
        setSearchStoreList(response.data);
        console.log(response.data);
        window.localStorage.setItem('searchQuery',searchQuery);
        setFormClicked(false);
        navigate('/Storesearch');   
      })
      .catch((err) => console.log(err));
  }

  // const handleProductPage = async(shopId) => {
  //   return await axios
  //     .get(`http://localhost:3002/onboard/getProduct/${shopId}`)
  //     .then((response) => {
  //       setProductList(response.data);
  //       console.log(response.data);
  //       navigate(`/ShopProductPage/${shopId}`)
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <>
    {/* <div className='flex justify-center gap-10 items-center '> */}
    {/* <div className='h-[60vh] md:block hidden w-40 rounded-lg bg-white'></div> */}
    {/* <div className='h-[60vh] w-11/12 md:w-9/12 py-7 px-6 rounded-lg border-black bg-white'> */}
    <div className='relative flex flex-col w-full'>
      <div
      onClick={()=>{
        if(!isFormClicked){
        handleFormClicked();
        }
      }}
      className={`${isFormClicked ? 'searchBoxShadow':''} relative font-Inter text-black flex justify-center items-center w-full h-7 lg:h-11 rounded-md`} >
        {/* <div className='pt-2 hidden sm:block md:text-xl'><ion-icon name="search"></ion-icon></div> */}
        <input 
          name='item' 
          method='post' 
          autocomplete='off'
          type="search" placeholder="Find your store.." 
          className={`${isFormClicked ? '' : '' } bg-white w-full lg:w-[85%] h-full focus:outline-none rounded-sm lg:rounded-l-md px-2 lg:px-5 text-sm lg:text-base lg:placeholder:text-base placeholder:text-xs`} 
          value={searchQuery} 
          onChange={(event) => setSearchQuery(event.target.value)}
          
        />
        <button onClick={handleSearch}
          className="w-3/12 lg:w-[15%] hover:bg-indigo-600 text-xs lg:text-base h-8 lg:h-full text-white bg-buttonColor hidden sm:flex justify-center items-center rounded-r-md">Search</button>
        {/* <button onClick={handleSearch} className="rounded-xl w-2/12 h-8 lg:h-9 text-white font-bold bg-buttonColor flex justify-center items-center sm:hidden"><ion-icon name="search"></ion-icon></button> */}
      </div>
      <div onClick={handleFormClicked} className={`${isFormClicked ? 'block': 'hidden'} fixed top-[5rem] left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-40`}>
      </div>
      <div className={`${isFormClicked ? 'flex flex-col font-semibold text-sm absolute top-[43px] z-40 w-full h-fit bg-white rounded-b-sm border-t border-slate-400 searchSuggestionShadow' :'hidden'} `}> 
          {
            (storeList.length > 0)?
            storeList.filter((item) =>{
              const searchTerm = searchQuery ? searchQuery.toLowerCase() : '';
              const fullname = item.storeName.toLowerCase();
              return fullname.startsWith(searchTerm)
            }).map((item,ind)=>{
              return ind<12 && <div onClick={()=>navigate(`/ShopProductPage/${item.shopId}`)} className='text-purple-900 hover:bg-blue-200/20 hover:text-buttonColor h-fit px-2 py-[6px]'>{item.storeName}</div>
            }):''
          }
      </div>
      </div>
    </>
  )
}
export default Searchbar;