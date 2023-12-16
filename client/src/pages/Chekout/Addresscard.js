import axios from 'axios';
import React from 'react'
import { useGlobalContext } from '../../components/context';
import { useState } from 'react';
import Deleteaddressbutton from './Deleteaddressbutton';
import Loading from '../../Images/Rolling.svg';
import { baseUrl } from '../../config/config';
const Addresscard = (props) => {
    const {userName,addressLine1,state,country,city,postalCode,mobileNumber,addressId,isDefault} = props;
    const{userAddress,setUserAddress,defaultAddress,setDefaultAddress,setShippingAddress} = useGlobalContext();
    const [isLoading,setLoading] = useState(false);
    const handleDefault = async() =>{
      return await axios
      .put(`https://${baseUrl}/userapi/address/setDefaultAddress/${addressId}`,{
        isDefault : true
      })
      .then((res)=>{
        console.log(res);
        setDefaultAddress(addressId);
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  return (
    <>
    
      <button onClick={()=>handleDefault()} className={`cursor-default focus:outline-none capitalize rounded-sm shadow my-3 lg:my-5 w-full h-fit gap-1 flex flex-col px-5 pb-2 pt-1 lg:justify-center ${(addressId === defaultAddress) ?'bg-[#fafde7] border border-[#FFCF25]': 'border border-transparent bg-gray-100'}`}>
      <div className='flex flex-col items-start text-start lg:flex-row gap-1'>
        <div className='font-bold text-sm lg:text-lg lg:font-semibold'>{userName},</div>
        <div className='font-medium text-xs lg:text-base'>{addressLine1},PIN CODE: {postalCode}</div>
      </div>
      <div className='flex flex-col lg:flex-row font-medium text-start items-start text-xs lg:text-base'>
        <div>{city},{state},{country},{mobileNumber}</div>
      </div>
      <Deleteaddressbutton onClick={()=>setLoading(true)} onFetch={()=>setLoading(true)}  addressId = {addressId}/>
    </button>
      
    </>
  )
}

export default Addresscard
