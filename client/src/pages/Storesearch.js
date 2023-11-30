import React, { useEffect } from 'react'
import { useGlobalContext } from '../components/context'
import Searchstorecard from '../components/Searchstorecard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { baseUrl } from '../config/config';
const Storesearch = () => {
  const{searchStoreList,setSearchStoreList,searchQuery,setSearchQuery} = useGlobalContext();
  let [loading, setLoading] = useState(true);
  useEffect(()=>{
    const searchQuery = window.localStorage.getItem('searchQuery');
    setSearchQuery(searchQuery);
    handleSearch(searchQuery)
    if(searchStoreList.length > 0){
      setLoading(false);
    }
    else{
      setTimeout(()=>{
        setLoading(false);
      },1100)
    }
  },[])
  const handleSearch = async (searchQuery) => {
    return await axios
      .post(`https://${baseUrl}/searchapi/searchResult`, { query: searchQuery })
      .then((response) => {
        setSearchStoreList(response);
        console.log(response);
      })
      .catch((err) => console.log(err));
      
  }
  return (
    <>
      {
        loading ?
        <div className='w-screen h-screen'>
        <PuffLoader className='m-auto mt-60 'color="#0F5398" size={80} loading={loading}/>
        </div> 
        :
        <div className='flex m-4 gap-4 h-min-screen'>
          <div className='bg-mybg rounded-md w-2/12 h-screen font-Inter flex flex-col'>
            <div className='text-xl bg-buttonColor rounded-t-md text-white text-center h-12 py-2'>
              <div>Categories</div>
            </div>
            <div className='text-black'><div className='border-b-2 border-buttonColor px-2 py-1'>Hardware</div>
            <div className='border-b-2 border-buttonColor px-2 py-1'>Electronics</div>
            <div className='border-b-2 border-buttonColor px-2 py-1'>Snacks and beverages</div></div>
          </div>
          <div className='bg-mybg w-10/12 p-3 grid lg:grid-cols-4 grid-rows-3 gap-5 rounded-md'>{
            searchStoreList.length >=1 ? searchStoreList.filter((currStore,idx) => idx < 12).map((currStore) =>{
              return <Searchstorecard storeName = {currStore._source.storeName} shopId = {currStore._source.shopId}/>
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
