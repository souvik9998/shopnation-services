import React, { useEffect,useState } from 'react'
import { useGlobalContext } from '../../components/context'
import axios, { isAxiosError } from 'axios';
import Ordercard from './Ordercard';
import { baseUrl } from '../../config/config';
const Orderdetails = () => {
  const {user,setUser,setAuthorizationMessage,authorizationMessage} = useGlobalContext();
  const[orderList,setOrderList] = useState([]);
  useEffect(()=>{
    getOrderDetails();
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
  const getOrderDetails = async()=>{
    try{
      let userId;
      if(authorizationMessage !== 'authorized')userId = await isAuthorized();
      else userId = user.userId;
      
      const res = await getOrderList(userId);
      console.log(res);
      
    }
    catch(err){
      console.log(err);
    }
  }
  const getOrderList = async(userId)=>{
    try{
      console.log(userId);
      const res = await axios.get(`https://${baseUrl}/userapi/order/getOrderDetails/${userId}`);
      console.log(res);
      if(res.data.orderItems){
        const res2 = await getOrderProductInfo(res.data.orderItems);
        setOrderList(res2);
      }
      else{
        setOrderList([]);
      }
      return res;
    }
    catch(err){
      console.log(err);
    }
  }
  const getOrderProductInfo = async(orderList)=>{
    try {
      const productInfoPromises = orderList.map(async (item) => {
        const res = await axios.get(`https://${baseUrl}/sellerapi/onboard/getProductInfo/${item.product_id}`);
        return {
          ...item,
          productName: res.data.item.productName,
          shopName : res.data.item.shopName,
          mainImagePath : res.data.item.mainImagePath
        };
      });
      const updatedOrderList = await Promise.all(productInfoPromises);
  
      return updatedOrderList;
    }
    catch(err){
      console.log(err);
    }
  }

  if(orderList.length === 0){
    return(
      <>
      <div className='w-full h-screen pl-4'>
        <div>You haven't ordered any item yet...</div>
      </div>
        
      </>
    )
  }
  else{
    return (
    <>
      <div className='w-full flex flex-col gap-10'>
        {
          orderList.map((order) =>{
            return <Ordercard
              orderItem = {order}
            />
          })
        }
      </div>
    </>
  )
  }
  
}

export default Orderdetails

