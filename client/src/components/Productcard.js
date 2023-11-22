import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from './context';
import { baseUrl } from '../config/config';
const ProductCard = ({product}) => {
  // const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const token = window.localStorage.getItem("token");
  const {cartList,user,setCartList,getCartDetails,getCartProductInfo} = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [goToCart,setGoToCart] = useState(false);
  const isAvailable = product.isAvailable;
  const [errMsg,setErrMsg] = useState('');
  const navigate = useNavigate();
  useEffect(()=>{
    cartList.map((curr) =>{
      if(curr.productId === product.productId){
        setGoToCart(true);
      }
    })
},[cartList])
  const handleAddtocart = async() =>{
    setIsLoading(true);
    const res1 =  await axios
      .post(`http://${baseUrl}/userapi/cart/addToCart`,{
        productId : product.productId,
        userId: user.userId,
        productName : product.productName,
        productAmount : product.productPrice,
        shopId : product.shopId,
        productType: product.productType,
        quantity : 1
      },
      {
        headers : {
          "Authorization" : token, 
        }
      })
      .then((res)=>{
        console.log(res.data);
        // setCartList(res.data.cartList)
        setTimeout(()=>{
          setIsLoading(false)
          setIsAdded(true)
          setTimeout(()=>{
            setIsAdded(false)
          },1500)
        },1000)
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrMsg(err.response.data.error);
        setIsLoading(false);
      })
      const res2 = await getCartDetails(user.userId);
      setCartList(res2);
  }
  const navigateProductInfo = async()=>{
    try{
      navigate(`/ShopProductPage/${product.shopId}/${product.productId}`);
    }
    catch(err){
      console.log(err);
    }
    
  }
  return (
    <>
      <div className='h-fit w-full capitalize  rounded-md font-Inter bg-white gap-4 flex justify-around mb-3 shadow pr-4'>
        <div className='flex flex-col gap-2 w-[28%] rounded-l-md px-2 py-2 bg-gray-100'>
          <div className=' h-full flex justify-center items-center '><img className='w-full min-h-full max-h-44' src={product.mainImagePath}/></div>
          <div className='lg:hidden w-full flex flex-col gap-2 justify-center text-sm text-white font-semibold'>
              <div><button className='bg-buttonColor w-full h-8 rounded-md'>Buy Now</button></div>
              <div><button onClick={handleAddtocart} className='bg-white border-2 border-buttonColor text-black w-full h-8 rounded-md'>Add to cart</button></div>
          </div>
        </div>
        <div className='flex flex-col gap-2 w-[45%] justify-start items-start py-3'>
          <div 
          onClick={()=>navigateProductInfo()}
          className='cursor-pointer hover:underline focus:underline active:underline text-md font-semibold lg:text-lg lg:font-medium'>{product.productName}</div>
          {/* <div className='text-sm lg:text-md border border-black'>{product.productDescription}</div> */}
          <div className='text-md lg:text-base text-green-500 font-semibold'>{
          (isAvailable)?'In stock'
          :'Out of stock'
          }
          </div>
          <div className=''>
            <div className='text-lg font-semibold'>₹{product.productPrice}</div>
          </div>
          <div className='text-sm lg:text-sm'>FREE <span className='font-semibold'>delivery by {product.expectedDelivery}</span></div>
          <div className='text-sm lg:text-sm '>Rating</div>
        </div>
        <div className='w-[25%] hidden lg:flex flex-col gap-3 justify-center text-white font-semibold'>
            <div><button className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div>
            {
              (isLoading)?
              <div className='flex'>
                <button className='bg-white border-2 text-buttonColor border-buttonColor w-full h-10 rounded-md'>
              <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-buttonColor animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>Adding to cart...</button></div>
              : (isAdded)?
              
              <div>
              <button className='bg-white border-2 border-buttonColor text-buttonColor w-full h-10 rounded-md'>
              <span className='mr-2'>✔</span>Added to cart
              </button></div>:
               <div>
               
               {(goToCart)?
               <button onClick={()=>{
                navigate(`/user-cart/${user.user_id}`)
               }} className='bg-white border-2 text-buttonColor border-buttonColor w-full h-10 rounded-md'>Go to cart</button>:
               <button onClick={handleAddtocart} className='bg-white border-2 text-buttonColor border-buttonColor w-full h-10 rounded-md'>Add product</button>
               }</div>
              }
        </div>

      </div>
    </>
  )
}

export default ProductCard