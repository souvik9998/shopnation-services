import React,{useContext, useEffect, useState} from "react";
import axios from 'axios';
import env from "react-dotenv";
import {baseUrl} from "../config/config.js";

const AppContext = React.createContext();
const AppProvider = ({children}) => {
    const token = window.localStorage.getItem("token");
    const[storeList,setStoreList] = useState([]);
    const[searchStoreList,setSearchStoreList] = useState([]);
    const[clickSearch,setClickSearch] = useState(false);
    const[searchQuery,setSearchQuery] = useState("");
    const[shopIdForProducts,setShopIdForProducts] = useState("");
    const[loginStatus,setLoginStatus] = useState(false);
    const[cartProductCounter,setCartProductCounter] = useState(0);
    const[cartTotalPrice,setCartTotalPrice] = useState(0);
    const[userAddress,setUserAddress] = useState([]);
    const[defaultAddress,setDefaultAddress] = useState("");
    const[cartList,setCartList] = useState([]);
    // const[orderList,setOrderList] = useState([]);
    const[authorizationMessage,setAuthorizationMessage] = useState('');
    const[isLoading,setIsLoading] = useState(false)
    const[cartLoading,setCartLoading] = useState(false);
    const [isFormClicked,setFormClicked] = useState(false);
    const [shippingAddress,setShippingAddress] = useState('');
    const[user,setUser] = useState({
        userId : '',
        userName : '',
        mobileNumber : '',
        email : ''
    })
    
    // const awsURL ='localhost:9000';
    // const localhostURL = 'localhost:9000';



    useEffect(()=>{
        // setIsLoading(true);
        getUserDetails();
      },[authorizationMessage])
      const getUserDetails = async() =>{
        try{
            const res2 = await getAll();
            let res1;
            if(authorizationMessage !== 'authorized'){
              res1 = await isAuthorized();
              console.log(res1);
            }
            console.log(authorizationMessage)
            if(authorizationMessage === 'authorized'){
              const userId = user.userId || res1.user_id
              const res3 = await getCartCount(userId);
              // console.log(res3);
              // const res5 = await getOrderDetails(res1.user_id);
              await getShippingAddress(userId);
            }
            // setIsLoading(false);
        }
        catch(err){
          // setIsLoading(false)
            console.log(err);
        }
    }
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
        return res.data.user;
      }
      catch(err){
        console.log(err);
      }
      }

      const getCartCount = async(userId) =>{
        try{
          const res = await axios.get(`http://localhost:9000/userapi/cart/getCartListCount/${userId}`,{
                  headers : {
                      "Authorization" : window.localStorage.getItem("token"), 
                    }
              })
          setCartProductCounter(res.data.cartCount)
        }
        catch(err){
          console.log(err);
        }
      }
      
      // const getCartDetails = async(userId) =>{
      //   return await axios
      //   .get(`https://${baseUrl}/userapi/cart/getCartDetails/${userId}`,{
      //       headers : {
      //           "Authorization" : window.localStorage.getItem("token"), 
      //         }
      //   })
      //   .then((res) =>{
      //       cartTotal(res.data);
      //       setCartList(res.data);
      //       console.log(res);
      //       return res.data
      //   })
      //   .catch((err) =>{
      //       console.log(err.msg);
      //   })
      //  }
      //  const cartTotal = (cartList) =>{
      //   let totalPrice = 0;
      //   let totalQuantity = 0;
      //   cartList.forEach((item) =>{
      //     totalPrice += item.product_amount * item.quantity;
      //     totalQuantity += item.quantity;
      //   })
      //   setCartProductCounter(totalQuantity);
      //   setCartTotalPrice(totalPrice);
      //  }
       const getAll = async() => {
        return await axios
          .get(`https://${baseUrl}/searchapi/getAll`)
          .then((response) => {
            setStoreList(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
        
      }
      // const getCartProductInfo = async(cartList) =>{
      //   try {
      //     const productInfoPromises = cartList.map(async (item) => {
      //       let response;
      //       if(item.product_type === "main"){
      //         response = await axios.get(`https://localhost:3002/onboard/getProductInfo/${item.product_id}`);
      //       }
      //       else response = await axios.get(`https://localhost:3002/onboard/getProductVariantInfo/${item.product_id}`);
      //       return {
      //         ...item,
      //         expectedDelivery: calculateExpectedDelivery(response.data.item.expectedDelivery),
      //       };
      //     });
      //     const updatedCartList = await Promise.all(productInfoPromises);
      
      //     return updatedCartList;
      //   }
      //   catch(err){
      //     console.log(err);
      //   }
      // }
      // const getOrderDetails = async(userId)=>{
      //   try{
      //     const res = await axios.get(`https://localhost:9000/order/getOrderDetails/${userId}`);
      //     console.log(res);
      //     if(res.data.orderItems){
      //       const res2 = await getOrderProductInfo(res.data.orderItems);
      //       setOrderList(res2);
      //       console.log(res2);
      //     }
      //     else{
      //       setOrderList([]);
      //     }
          
      //   }
      //   catch(err){
      //     console.log(err);
      //   }
      // }

      // const getOrderProductInfo = async(orderList)=>{
      //   try {
      //     const productInfoPromises = orderList.map(async (item) => {
      //       const res = await axios.get(`https://localhost:3002/onboard/getProductInfo/${item.product_id}`);
      //       return {
      //         ...item,
      //         productName: res.data.item.productName,
      //         shopName : res.data.item.shopName,
      //         mainImagePath : res.data.item.mainImagePath
      //       };
      //     });
      //     const updatedOrderList = await Promise.all(productInfoPromises);
      
      //     return updatedOrderList;
      //   }
      //   catch(err){
      //     console.log(err);
      //   }
      // }
      const getShippingAddress = async(userId) =>{
        try{
          const res = await axios.get(`https://${baseUrl}/userapi/address/getDefaultAddress/${userId}`);
          setShippingAddress(res.data.defaultAddress);
          console.log(res.data.defaultAddress);
        }
        catch(err){
          console.log(err);
        }
      }
      
       const calculateExpectedDelivery = (expectedDelivery) => {
        if (expectedDelivery) {
          const input = expectedDelivery.toLowerCase();
          const numericValue = parseInt(input);
          if (!isNaN(numericValue)) {
            if (input.includes('hour') || input.includes('hours')) {
              const deliveryDate = new Date();
              deliveryDate.setHours(deliveryDate.getHours() + numericValue);
              // Get the day of the month
              const dayOfMonth = deliveryDate.getDate();
              // Get the month name
              const monthName = deliveryDate.toLocaleString('en-US', { month: 'long' });
              // Create the formatted date string
              const formattedDate = `${dayOfMonth}${getDayOrdinalSuffix(dayOfMonth)} ${monthName}`;
              // Get the time part of the delivery date
              const time = deliveryDate.toLocaleTimeString('en-US', { timeStyle: 'short' });
              // Combine the formatted date and time
              const formattedDateTime = `${formattedDate}, ${time}`;
              return formattedDateTime;
            } else if (input.includes('day') || input.includes('days')) {
              const deliveryDate = new Date();
              deliveryDate.setDate(deliveryDate.getDate() + numericValue);
              // Get the day of the month
              const dayOfMonth = deliveryDate.getDate();
              // Get the month name
              const monthName = deliveryDate.toLocaleString('en-US', { month: 'long' });
              // Create the formatted date string
              const formattedDate = `${dayOfMonth}${getDayOrdinalSuffix(dayOfMonth)} ${monthName}`;
              // Get the time part of the delivery date
              const time = deliveryDate.toLocaleTimeString('en-US', { timeStyle: 'short' });
              // Combine the formatted date and time
              const formattedDateTime = `${formattedDate}, ${time}`;
              return formattedDateTime;
            }
          }
        }
        return '';
      };
      const getDayOrdinalSuffix = (day) => {
        if (day >= 11 && day <= 13) {
          return 'th';
        }
        switch (day % 10) {
          case 1:
            return 'st';
          case 2:
            return 'nd';
          case 3:
            return 'rd';
          default:
            return 'th';
        }
      };
    return <AppContext.Provider 
    value={{isAuthorized,user,setUser,authorizationMessage,setAuthorizationMessage,storeList,setStoreList,loginStatus,setLoginStatus,cartList,setCartList,searchQuery,setSearchQuery,searchStoreList,setSearchStoreList,cartProductCounter,setCartProductCounter,cartTotalPrice,setCartTotalPrice
    ,userAddress,setUserAddress,defaultAddress,setDefaultAddress,isLoading,setIsLoading
    ,calculateExpectedDelivery,cartLoading,setCartLoading,isFormClicked,setFormClicked,
    shippingAddress,setShippingAddress,getShippingAddress}}>
        {children}
    </AppContext.Provider>  
}

const useGlobalContext = () => {
    return useContext(AppContext);
};
export { AppContext,AppProvider,useGlobalContext};