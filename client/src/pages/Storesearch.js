import React, { useEffect } from 'react'
import { useGlobalContext } from '../components/context'
import Searchstorecard from '../components/Searchstorecard';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { baseUrl } from '../config/config';
import SkeletonStorecard from '../components/skeletonComponents/SkeletonStorecard';
const Storesearch = () => {
  const{searchStoreList,setSearchStoreList,searchQuery,setSearchQuery} = useGlobalContext();
  let [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(()=>{
    setLoading(true);
    const searchQuery = window.localStorage.getItem('searchQuery');
    setSearchQuery(searchQuery);
    handleSearch(searchQuery)
    // if(searchStoreList.length > 0){
    //   setLoading(false);
    // }
    // else{
    //   setTimeout(()=>{
    //     setLoading(false);
    //   },1100)
    // }
  },[])
  useEffect(()=>{
    setSearchStoreList([]);
  },[location.pathname])
  const handleSearch = async (searchQuery) => {
    return await axios
      .post(`https://${baseUrl}/searchapi/searchResult`, { query: searchQuery })
      .then((response) => {
        setSearchStoreList(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
      setLoading(false)
      
  }
  return (
    <>
      {
        loading ?
        <div className=' lg:flex pl-2 min-h-screen w-full'>
          <div className='lg:block hidden w-[18%] px-2 py-6'>
            <div className='bg-gray-200 rounded-2xl w-full h-full'></div>
          </div>
          <SkeletonStorecard/>
        </div> 
        :
        <div className=' lg:flex pl-2 min-h-screen w-full'>
          <div className='lg:block hidden w-[18%] px-2 py-6'>
            <div className='bg-gray-100 drop-shadow-lg border border-gray-200 rounded-2xl w-full h-full'>
              <div>
                <div></div>
                <div>Categories</div>
              </div>
              <div>
                <div></div>
                <div>Highest rated</div>
              </div>
              <div>
                <div></div>
                <div>Nearest</div>
              </div>
              <div>
                <div></div>
                <div>Sort by popularity</div>
              </div>
              <div>
                <div></div>
                <div>Sort by sales</div>
              </div>
            </div>
          </div>
         
          <div className='w-full lg:w-[82%] h-fit lg:px-10 px-2 py-4 lg:py-6 grid grid-cols-2 lg:grid-cols-4 grid-rows-3 gap-5 rounded-md'>{
            searchStoreList.length >=1 ? searchStoreList.filter((currStore,idx) => idx < 12).map((currStore) =>{
              return <Searchstorecard store={currStore}/>
            }): <div className='font-Inter text-3xl text-center'>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div>No result found...</div></div>
          }
          </div>
        </div>
      }
    </>
  )
}

export default Storesearch
