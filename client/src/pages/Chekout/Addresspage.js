import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from './Modal';
import Addressform from './Adressform';
import axios from 'axios';
import { useGlobalContext } from '../../components/context';
import Addresscard from './Addresscard';
import { baseUrl } from '../../config/config';
const Addresspage = () => {
  const [isOpen,setIsOpen] = useState(false);
  // const[userAddress,setUserAddress] = useState([]);
  const {defaultAddress,setDefaultAddress,userAddress,setUserAddress} = useGlobalContext();
  const {user,setUser,setAuthorizationMessage,authorizationMessage} = useGlobalContext();
  // const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  useEffect(()=>{
    getUserAddress();
  },[])

  const isAuthorized = async()=>{
    try{
      const res = await axios.get(`https://${baseUrl}/userapi/auth/isUserAuth`,{
        headers : {
          "Authorization" : window.localStorage.getItem("token"),
        }
      })
      setAuthorizationMessage(res.data.msg);
      setUser({
        userId: res.data.user.user_id,
        userName: res.data.user.user_name,
        mobileNumber: res.data.user.mobile_number,
        email: res.data.user.email
      })
      return res.data.user.user_id;
    }
    catch(err){
      console.log(err);
    }
  }

  const getUserAddress = async() =>{
    try{
      let userId;
      if(authorizationMessage !== 'authorized')userId = await isAuthorized();
      else userId = user.userId;
      const res =  await axios.get(`https://${baseUrl}/userapi/address/getUserAddress/${userId}`)
      console.log(res.data);
      if(res.data.length === 1){
        setDefaultAddress(res.data[0].id)
      }
      res.data.map((curr)=>{
        if(curr.is_default)setDefaultAddress(curr.id);
      })
      setUserAddress(res.data);
    }
    catch(err){
      console.log(err);
    }
  }
  console.log(userAddress);
  return (
    <>
      <div className='font-Inter'>
        <button onClick={()=>setIsOpen(true)} className='cursor-default border-[2px] lg:border-[3px] rounded-lg border-dashed border-gray-600 text-gray-600 w-full h-10 lg:h-16 bg-white text-base lg:text-xl font-semibold flex items-center justify-center'>+ Use this address</button>
        <Modal open={isOpen} onClose={()=>setIsOpen(false)}>
          <Addressform onClose={()=>setIsOpen(false)}/>
        </Modal>
        <div className=''>
        {
          userAddress.map((curr) =>{
            return <Addresscard 
              userName = {curr.full_name}
              addressLine1 = {curr.address_line1}
              city = {curr.city}
              country = {curr.country}
              state = {curr.state}
              postalCode = {curr.postal_code}
              mobileNumber = {curr.mobile_number}
              addressId = {curr.id}
              isDefault = {curr.is_default}
            />
          })
        }
        </div>
      </div>
    </>
  )
}

export default Addresspage
