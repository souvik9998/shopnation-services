import React from 'react'
import { useGlobalContext } from './context';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Carttotal = () => {
    // const{cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice} = useGlobalContext();
    const navigate = useNavigate();
    const location = useLocation();
    // const cartProductCounter = JSON.parse(localStorage.getItem('totalQuantity'));
    // const cartTotalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    const {cartList,defaultAddress,cartProductCounter,cartTotalPrice} = useGlobalContext();

    const showToast = () => {
      toast.error('Please add an default address', {
        position: "bottom-left",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    };
  
    const handleCheckout = () =>{
      if(location.pathname === '/checkout'){
        if(defaultAddress)navigate('/checkout/reviewpage')
        else{
          showToast();
        }
      }
      else{
        navigate('/checkout');
      }
      
    }
  return (
    <>
      <div className={`lg:h-fit pb-2 lg:pb-4 flex flex-col justify-around ${location.pathname === "/user-cart" ? '' : 'bg-white px-4 py-2'} lg:rounded-md lg:drop-shadow-lg`}>
        {/* ${(location.pathname === '/checkout' || location.pathname === '/checkout/reviewpage' || location.pathname === '/checkout/paymentpage') 
      ? 'px-2 py-1 lg:py-0 lg:px-0' : 
      'px-0'} */}
        
            <div className='hidden lg:block py-3 px-6 text-navColor text-xl lg:border-b lg:border-slate-300 font-semibold'>Price details</div>
            <div className='hidden font-medium px-6 py-8 lg:flex flex-col gap-3'>
              <div className='text-base flex justify-between'>
                <div>Total price{"("}{cartProductCounter}{" items)"} : </div>
                <div className='font-medium text-md '>₹{cartTotalPrice}</div> 
              </div>
              <div className='text-base flex justify-between'>
                <div>Discount :</div> 
                <div className='font-normal text-green-600 text-md'>-₹500</div>
                </div>
              <div className='text-base flex justify-between'>
                <div>Delivery charges : </div>
                <div className='font-medium text-green-600 text-md'>FREE</div>
              </div>
            </div>
            <div className='flex gap-2 lg:gap-0 items-center lg:justify-between pb-1 lg:py-3 lg:px-6 text-navColor text-xl lg:text-lg lg:border-y lg:border-slate-300 font-semibold lg:font-semibold'>
              <div className=''>Total price</div>
              <div className='font-medium text-md'>₹{cartTotalPrice-500}</div>
            </div>
            <div className='lg:px-6 font-medium text-green-600 text-sm lg:text-base mt-1 lg:mt-3'>You will save total ₹500 on this order</div>
            {
              (location.pathname === '/checkout')?
              <button onClick={()=>handleCheckout()}className='w-full lg:w-80 h-9 mt-3 lg:mt-6 rounded-md lg:rounded-md text-center font-medium text-lg lg:mx-auto bg-buttonColor text-white'>Use this address</button>:
              (location.pathname === '/checkout/reviewpage')?
              <button onClick={()=>navigate('/checkout/paymentpage')} className='w-full lg:w-80 h-9 mt-3 lg:mt-6 rounded-md lg:rounded-md text-center font-medium text-lg lg:mx-auto bg-buttonColor text-white'>Proceed to payment</button>:
              (location.pathname === '/checkout/paymentpage')?
              '':
              <button onClick={()=>handleCheckout()}className='w-full lg:w-80 h-9 mt-3 lg:mt-6 rounded-md lg:rounded-md text-center font-medium text-lg lg:mx-auto bg-buttonColor text-white'>Proceed to checkout</button>
            }
        </div>
    </>
  )
}

export default Carttotal
