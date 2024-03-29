import React from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../components/context'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Productcard from '../components/Productcard';
import StoredetailsCard from '../components/StoredetailsCard';
import SkeletonshopdetailsCard from '../components/skeletonComponents/SkeletonshopdetailsCard';
import { baseUrl } from '../config/config';
import { StoreProvider, useStoreContext } from '../context/StoreContext';
const ShopProductPage = () => {
  const {shopId} = useParams();
  const {calculateExpectedDelivery} = useGlobalContext();
  const {shopInfo,setShopInfo,productList,setProductList,currentShopId,setCurrentShopId} = useStoreContext();
  
  // const [shopInfo,setShopInfo] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [searchQuery,setSearchQuery] = useState('');
  // const [productList,setProductList] = useState([]);
  
  useEffect(() =>{
    console.log(`shopid = ${shopId}`);
    console.log(`currentShopId = ${currentShopId}`);
    if(currentShopId !== shopId)getAllProducts();
  },[])
  const getAllProducts = async() => {
    try{
      const res1 = await axios.get(`https://${baseUrl}/sellerapi/auth/getSellerInfo/${shopId}`);
      console.log(res1);
      setShopInfo(res1.data.sellerInfo);
      setCurrentShopId(shopId);
      const res2 = await axios.get(`https://${baseUrl}/sellerapi/onboard/getProduct/${shopId}`);
      console.log(res2);
      setProductList(res2.data);
    } 
    catch(err){
      console.log(err);
    }
  }
  const handleClick = async(event)=>{
    event.preventDefault();
    try{
      const searchResult = await axios.post(`https://${baseUrl}/searchapi/searchProduct`, { query: searchQuery });
      console.log(searchResult);
      setProductList([]);
      const res = await getProductInfo(searchResult.data);
      console.log(res);
      setProductList(res);
    }
    catch(err){
      console.log(err);
    }
  }
  const getProductInfo = async(productList) =>{
    try{
      const promises = productList.map(async(item)=>{
        const product = await axios.get(`https://${baseUrl}/sellerapi/onboard/getProductInfo/${item._source.productId}`);
        return product.data.item;
      })

      const updatedProductList = await Promise.all(promises);

      return updatedProductList;
      
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <>
    
      <div className='font-Inter pt-2 lg:pt-10 flex px-1 lg:px-4 gap-8 bg-gray-200'>
        <div className='lg:flex flex-col gap-6 items-center hidden w-[23%] rounded-md bg-white h-fit py-6 shadow'>
          {
            (shopInfo && productList.length >=1)?
          <StoredetailsCard 
            shopInfo={shopInfo}
          />:<SkeletonshopdetailsCard/>
          }
        </div>
        {
            (shopInfo && productList.length >=1)? 
        <div className='w-full lg:w-7/12 mx-auto flex flex-col gap-4'>
          
          <div className='w-full '>
            <form 
            onSubmit={handleClick}
            className='w-full shadow h-10 rounded-lg bg-white flex items-center justify-center'>
              <input
              name='item' 
              method='post' 
              autocomplete='off'
              type="search" placeholder="Search for a product.." 
              value={searchQuery} 
              onChange={(event) => setSearchQuery(event.target.value)}
              className='w-[90%] lg:w-[95%] h-10 px-6 rounded-lg focus:outline-none '
              />
              <button
                className='pt-1 h-full w-[10%] lg:w-[5%]  bg-gray-300 rounded-r-md flex  justify-center items-center'><ion-icon name="search-sharp"></ion-icon></button>
            </form>
          </div>
          
          <div className='w-full'>{
          productList.map((currProduct) =>{
          const expectedDelivery = calculateExpectedDelivery(currProduct.expectedDelivery)
          return <Productcard product = {currProduct}/>
        })
      }
      </div>
      
      </div>
      :
      <div className='w-full lg:w-7/12 mx-auto flex flex-col gap-6'>
      <div className='h-10 w-full bg-white rounded-lg'></div>
      <div className='h-screen w-full bg-white rounded-sm flex flex-col p-4'>
        <div className='h-40 rounded-lg bg-gray-200 mb-2'></div>
        <div className='h-40 rounded-lg bg-gray-200 mb-2'></div>
        <div className='h-40 rounded-lg bg-gray-200 mb-2'></div>
      </div>
      </div>
      }
      <div className='hidden lg:block w-2/12 bg-white h-screen shadow rounded-md'>
          <h1 className='text-center'>Shop offers</h1>
      </div>
      </div>
    </>
  )
}

export default ShopProductPage
