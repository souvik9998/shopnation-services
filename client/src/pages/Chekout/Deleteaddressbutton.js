import React from 'react'
import { useGlobalContext } from '../../components/context'
import axios from 'axios';
import { baseUrl } from '../../config/config';
const Deleteaddressbutton = ({addressId,onClick,onFetch}) => {
    const{userAddress,setUserAddress,setDefaultAddress} = useGlobalContext();
    const handleClick = async(event)=>{
        event.stopPropagation();
        return await axios
        .delete(`https://${baseUrl}/userapi/address/deleteUserAddress/${addressId}`)
        .then((res)=>{
          console.log(res);
          const updatedUserAddress = userAddress.filter((curr) => curr.id !== addressId);
          setUserAddress(updatedUserAddress);
          if(updatedUserAddress.length === 0)setDefaultAddress(null);
          if(res.data.defaultAddressId)setDefaultAddress(res.data.defaultAddressId);
          console.log(updatedUserAddress);
        })
        .catch((err)=>{
          console.log(err);
        })
      }
  return (
    <>
      <button onClick={handleClick} className='bg-buttonColor text-white w-40 lg:w-44 font-normal text-sm lg:text-base rounded-sm lg:rounded-md lg:mt-2'>Delete this address</button>
    </>
  )
}

export default Deleteaddressbutton
