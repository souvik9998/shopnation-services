import React, { useEffect, useState } from 'react'
import { useGlobalContext } from './context';
import axios from 'axios';
import Skeletoncard from './skeletonComponents/Skeletoncard';
import {baseUrl} from "../config/config.js";
const Cartproductcard = (props) => {
  const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice,calculateExpectedDelivery} = useGlobalContext();
  const{cartList,setCartList} = useGlobalContext();
  const{ productId,productName,productAmount,userId,quantity,productType,mainImagePath,expectedDelivery,shopName } = props;
  const {cartLoading,setCartLoading} = useGlobalContext();
  const[cartProductInfo,setCartProductInfo] = useState('');
  console.log(productId)
  const increaseCount = async()=>{
    if(quantity < 9){
      return await axios
      .put(`https://${baseUrl}/userapi/cart/updateCart`,{
        productId : productId,
        quantity : quantity+1
      })
      .then(res =>{
        console.log(res.data);
        const upDatedCartList = cartList.map((item) =>{
          if(item.product_id === productId){
            return {
              ...item,
              quantity : res.data.quantity
            }
          }
          return item;
        })
        setCartList(upDatedCartList);
        setCartProductCounter(cartProductCounter + 1);
        setCartTotalPrice(cartTotalPrice + productAmount);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  }
  const decreaseCount = async()=>{
    if(quantity > 1){
      return await axios
      .put(`https://${baseUrl}/userapi/cart/updateCart`,{
        productId : productId,
        quantity : quantity-1
      })
      .then(res =>{
        console.log(res.data);
        const upDatedCartList = cartList.map((item) =>{
          if(item.product_id === productId){
            return {
              ...item,
              quantity : res.data.quantity
            }
          }
          return item;
        })
        setCartList(upDatedCartList);
        setCartProductCounter(cartProductCounter - 1);
        setCartTotalPrice(cartTotalPrice - productAmount);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  }

  const deleteFromCart = async()=>{
    return await axios
    .post(`https://${baseUrl}/userapi/cart/deleteFromCart`,{
      productId : productId
    }
    )
    .then(async (res) =>{
        console.log(res);
        let upDatedCartList = cartList.filter((currItem) => currItem.product_id !== productId)
        setCartList(upDatedCartList);
        setCartProductInfo('')
        setCartProductCounter(cartProductCounter - quantity);
        setCartTotalPrice(cartTotalPrice - (productAmount*quantity));
    })
    .catch((err) =>{
        console.log(err.msg);
    })
  }
  return (
    <>{

  (cartLoading)?<Skeletoncard />:
    <div className='border-[0.5px] border-gray-200 min-h-48  m-auto font-Inter capitalize rounded-sm bg-white flex gap-1 flex-1 mb-2 lg:mb-4 '>
      <div className='flex flex-col border gap-4 w-5/12 lg:w-3/12 bg-gray-50 py-2 px-2'>
        <div className='h-full flex justify-center items-center'><img className='w-full min-h-full max-h-44 object-contain' src={mainImagePath}/></div>

        {/* mobile button */}

        <div className='lg:hidden flex gap-3 justify-center h-8 items-center'>
            <div className=''>
              <button onClick={()=>decreaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>-</button>
            </div>
            <div className='bg-white border border-slate-300 w-9 h-7 text-center pt-[2px]'>{quantity}</div>
            <div className=''><button onClick={()=>increaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>+</button></div>
              {/* <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div> */}
            
          </div>
          <div className='lg:hidden'><button onClick={deleteFromCart} className='bg-white border-2 focus:border-red-700 border-red-700 text-red-700 w-full text-sm font-medium lg:text-md lg:w-full h-7 lg:h-10 rounded-md'>Remove item</button></div>
        </div>
        <div className=' flex flex-col gap-2 w-7/12 lg:w-6/12  lg:py-2 lg:pl-4 p-1 justify-start items-start'>
          <div className='text-md lg:text-xl font-semibold'>{productName}</div>
          <div className='text-xs lg:text-sm font-medium bg-gray-200 w-fit px-2 py-1 lg:px-3 lg:py-2 h-fit flex items-center rounded-sm'>Delivery by - {shopName}</div>
          <div className='text-xs lg:text-base font-medium'>
            Free <span className='font-semibold '>delivery by {calculateExpectedDelivery(expectedDelivery)}</span>
          </div>
          <div className='text-green-500 text-sm font-semibold'>
            {
            (cartProductInfo.isAvailable)?
            'In stock':
            'Out of stock'
            }
          </div>
          <div className=''>
            <div className='text-xl font-semibold'>₹{productAmount}</div>
          </div>

          {/* mobile button */}

          
        </div>
        <div className='hidden lg:flex flex-col justify-center gap-4 items-center h-40 w-3/12 font-semibold'>
          <div className='flex gap-3 justify-center h-8 items-center'>
            <div className=''>
              <button onClick={()=>decreaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>-</button>
            </div>
            <div className='bg-white border border-slate-300 w-9 h-7 text-center pt-[2px]'>{quantity}</div>
            <div className=''><button onClick={()=>increaseCount()} className='bg-white border border-slate-300 w-6 rounded-lg'>+</button></div>
              {/* <div><button onClick={handleBuynow} className='bg-buttonColor w-full h-10 rounded-md'>Buy Now</button></div> */}
            
          </div>
          <div className='hidden lg:block'><button onClick={deleteFromCart} className='bg-white border-2 focus:border-red-700 border-red-700 text-red-700 w-48 h-10 rounded-md'>Remove from cart</button></div>
        </div>
        
        {/* <div className='flex w-'>
          <
        </div> */}
      </div>
  }
      </>
  )
}

export default Cartproductcard
