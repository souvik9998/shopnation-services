import React from 'react'
import { useGlobalContext } from '../../components/context'

const Reviewpage = () => {
    const{defaultAddress,userAddress,cartList} = useGlobalContext();
    // const[deliveryAddress,setDeliveryAddress];
  return (
    <>
      {
        cartList.map((curr)=>{
            return <div className=' min-h-28  m-auto font-Inter capitalize rounded-md bg-gray-100 flex  gap-2 pl-2 pr-1 lg:pr-4 mt-2 py-3 mb-4 shadow'>
              <div className='flex flex-col gap-2 w-5/12 lg:w-2/12 mr-3 lg:mr-0 '>
                <div className=' h-full flex justify-center items-center'><img className='w-full lg:w-11/12 min-h-full max-h-28' src={`http://localhost:3002/${curr.ImagePath}`}/></div>
                <div className='text-center block text-sm lg:hidden'>quantity : {curr.quantity}</div>
              </div>
              <div className='flex flex-col gap-2 w-6/12 justify-start items-start'>
                <div className='text-md lg:text-lg font-medium'>{curr.productName}</div>
                <div className='text-green-500 text-sm font-semibold'>
                  In stock
                </div>
                <div className=''>
                  <div className='text-lg lg:text-base font-semibold'>₹{curr.productAmount}</div>
                </div>
            </div>
            <div className='hidden  lg:text-base lg:flex items-center'>Quantity : {curr.quantity}</div>
        </div>
        })
    }
    </>
  )
}

export default Reviewpage
