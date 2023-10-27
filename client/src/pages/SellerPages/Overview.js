import React, { useEffect } from 'react'
import { useSellerContext } from '../../components/Sellercontext'

const Overview = () => {
  const {savedProduct,setSavedProduct} = useSellerContext();
  console.log(savedProduct);
  return (
    <>
      <div className='py-8 '>
        {
          savedProduct.map((item) =>{
            console.log(item);
            return <div className='bg-gray-100 drop-shadow-sm w-full h-24 flex px-6 py-3'>
              <div></div>
              <div className='capitalize'>{item.formData.productName}</div>
              
            </div>
          })
        }
      </div>
    </>
  )
}

export default Overview
