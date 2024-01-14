import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalContext } from '../components/context';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config/config';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreProvider, useStoreContext } from '../context/StoreContext';
import '../App.css';
import { Pagination} from "swiper";
import animationData from '../Images/addTocart.json'
import celebrationData from '../Images/celebration.json'
import addToCart from '../Images/add-to-the-cart.svg'
import Lottie from 'lottie-react';
const MobileProductInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {shopId,productId,variantId} = useParams();
  const [variantName,setVariantName] = useState('');
  // const [variantId,setVariantId] = useState('');
  const [sizeName,setSizeName] = useState('');
  // const [item,setItem] = useState();
  const [sizeArray,setSizeArray] = useState([]);
  const [mainImage,setMainImage] = useState('');
  const [productImages,setProductImages] = useState([]);
  const token = window.localStorage.getItem("token");
  const {calculateExpectedDelivery} = useGlobalContext();
  const [loading,setLoading] = useState(false);
  const [celebration,setCelebration] = useState(false);
  const {cartList,user,setCartList,getCartDetails,getCartProductInfo,cartProductCounter} = useGlobalContext();
  const {variants,setVariants,defaultProduct,setDefaultProduct,currentProduct,setCurrentProduct} = useStoreContext();
  useEffect(()=>{
      let variantArray;
      if(!defaultProduct && location.pathname === `/ShopProductPage/${shopId}/${productId}/${variantId}`){
        let default_product = JSON.parse(window.localStorage.getItem("default_product"));
        variantArray = setAdditional(default_product);
        console.log(variantArray);
      }
      showProductInfo(variantArray);
  },[location.pathname,variantId,productId])

  const showProductInfo = async(variantArray)=>{
    if(location.pathname === `/ShopProductPage/${shopId}/${productId}`){
      if(!defaultProduct || defaultProduct.item.productId != productId){
        try{  
          const res =  await axios.get(`https://${baseUrl}/sellerapi/onboard/showProduct/${productId}`);
          console.log(res);
          setCurrentProduct(res.data.item);
          // setDefaultProductId(productId);
          setAdditional(res.data);
        }
        catch(err){
          console.log(err);
        }
      }
      else{
        setCurrentProduct(defaultProduct.item);
        setAdditional(defaultProduct);
      }
    }
    else{
        try{
            const res = await axios.get(`https://${baseUrl}/sellerapi/onboard/getVariantInfo/${variantId}`);
            const newSizeArray = [];
            console.log(variants);
            if(variants.length > 0){
              console.log("triggered");
              variantArray = [...variants];
            }
            console.log(variants);
            console.log(variantArray);
            variantArray.forEach((v)=>{
            v.typeArray.forEach((i)=>{
              if(i.variantName === res.data.item.variantName){
                i.variantArray.forEach((j)=>{
                  if(j.size !== res.data.item.size)newSizeArray.push(j.size);
                  
                })
                }
              })
            })
            if(res.data.item.size !== undefined){
              setSizeArray([res.data.item.size,...newSizeArray]);
            }
          setCurrentProduct(res.data.item);
          setSizeName(res.data.item.size);
          setMainImage(res.data.item.mainImagePath);
          setProductImages(res.data.item.productImages);
          
        }
        catch(err){
          console.log(err);
        }
    }
  }
  const setAdditional =(data)=>{
      setDefaultProduct(data);
      setVariantName(data.item.variantName);
      setMainImage(data.item.mainImagePath);
      setProductImages(data.item.productImages);
      setSizeName(data.item.size);
      window.localStorage.setItem("default_product",JSON.stringify(data));
      const newSizeArray = [];
      const variantArray = [];
      Object.entries(data.variantObject).forEach(([key,value])=>{
        if(key === data.item.variantType){
          if(key ==="size"){
            value.forEach((i)=>{
              newSizeArray.push(i.variantName);
            })
          }
          else{
            value.forEach((i)=>{
              if(i.variantName === data.item.variantName){
                i.variantArray.forEach((j)=>{
                  newSizeArray.push(j.size);
                })
              }
            })
            variantArray.push({variantType:key,typeArray:value});
          }
        }
        
      })
      if(data.item.size !== undefined){
        if(variantArray.length === 0){
          setSizeArray([data.item.size,...newSizeArray]);
        }
        else setSizeArray([data.item.size,...newSizeArray]);
      }
      
      setVariants([...variantArray])
      return variantArray;
  }
 const setVariantArray = () =>{
  
 }
  const handleVariantClick = (variant) =>{
    if(variant.variantName === defaultProduct.item.variantName){
      // setVariantId(defaultProduct.productId);
      setVariantName(defaultProduct.variantName);
      navigate(`/ShopProductPage/${shopId}/${productId}`);
    }
    else{
      let id;
      variant.variantArray.forEach((v)=>{
        if(v.size === currentProduct.size){ 
          id = v.variantId;
        }
      })
      // setVariantId(id);
      setVariantName(variant.variantName);
      navigate(`/ShopProductPage/${shopId}/${productId}/${id}`)
    }
    
  }



  const handleImageHover =(imagePath)=>{
    setMainImage(imagePath);
  }
  const handleAddtoCart = async() =>{
    try{
      setLoading(true);
      const res1 =  await axios
      .post(`https://${baseUrl}/userapi/cart/addToCart`,{
        productId : currentProduct.productId,
        userId: user.userId,
        productName : currentProduct.productName,
        productAmount : currentProduct.productPrice,
        productType : currentProduct.productType,
        shopId : shopId,
        expectedDelivery:calculateExpectedDelivery(currentProduct.expectedDelivery),
        quantity : 1
      },
      {
        headers : {
          "Authorization" : token, 
        }
      })
      console.log(res1);
      const res2 = await getCartDetails(user.userId);
      setCartList(res2);
      setCelebration(true);
    }
    catch(err){
      console.log(err);
    }
    }
  return (
    <>
    {
      currentProduct? 
    <div className='min-h-screen font-Inter overflow-x-hidden'>
    {celebration?
      <div className='absolute -bottom-2'>
      <Lottie
      animationData={celebrationData}
      loop={false}
      onComplete={()=>setCelebration(false)}
      />
    </div>:''
    }
    
    <div className='flex gap-[6px] z-10 h-fit w-full bg-gray-100 drop-shadow-lg py-2 px-2 fixed bottom-0'>
      <div
      onClick={handleAddtoCart} 
      className=' bg-white py-2 px-2 flex w-[18%] items-center justify-center border border-slate-300 rounded-lg'>
      
      {loading?
      <Lottie
          className='h-7 w-7'
          animationData={animationData}
          loop={false}
          onComplete={()=>setLoading(false)}
      />:<img  className='h-7 w-7' src={addToCart}></img>
      }
      </div>
      <div className=' bg-white py-2 px-2 w-[18%] flex items-center justify-center border border-slate-300 rounded-lg'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="#475569" class="w-7 h-7">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
      </div>
      <div className='bg-buttonColor  text-white font-medium flex justify-center items-center w-[64%] rounded-lg'>
        <div className='space-x-10'>Buy Now</div>
      </div>
    </div>
    <div className='  flex flex-col  pb-1 pt-2 px-3 rounded-md'>
      
          <div className='flex justify-between mb-3'>
            <div 
            onClick={()=>navigate(-1)}
            className='bg-gray-200/50 px-2 py-2 shadow-sm rounded-xl flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            </div>
            <div className='flex gap-4'>
              <div
              onClick={()=>navigate("/mobile-search")}
               className=' px-2 py-2 bg-inherit rounded-lg flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

              </div>
              <div 
              onClick={()=>navigate(`/user-cart/${user.userId}`)}
              className='relative bg-gray-200/50 px-2 py-2 shadow-sm rounded-xl flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartProductCounter !== 0 && <div className='absolute transition-all duration-300 bg-red-500 text-xs flex justify-center items-center p-[2px] text-white font-medium rounded-full w-4 h-4 top-[6px] right-[1px]'>{cartProductCounter}</div>}
            </div>
            </div>
            


          </div>
          <div>
          <div className='capitalize text-gray-800 font-bold text-lg'>{currentProduct.productName}</div>
          <div className='capitalize text-gray-500 font-semibold text'>{currentProduct.productDescription}</div>
          </div>
        
          <div className='w-full h-[52vh]'>
            <Swiper pagination={true} modules={[Pagination]} className="productImageSwiper h-full">
            {
                <SwiperSlide className={`w-full h-full rounded-sm`}>
                <img
                className='rounded-sm w-full h-[85%] object-contain  overflow-hidden'
                src={currentProduct.mainImagePath.url}></img></SwiperSlide>
            }
            {
              (productImages)?
              productImages.map((image)=>{
              return <SwiperSlide
              className={`w-full h-full rounded-sm flex`}>
              <img
              className= ' object-contain w-full h-[90%] overflow-hidden rounded-sm' src={image.url}></img>
              </SwiperSlide>
              
            }):''
            }
            </Swiper>
          </div>
          {
              variants.map((variant)=>{
                return <div className='flex flex-col gap-3 w-[85%] min-h-[112px] py-2 justify-center'>
                <div className='text-sm font-bold text-gray-600 uppercase'>Choose {variant.variantType} :</div>
                <div className='flex items-center gap-2'>
                {
                variant.typeArray.map((v) =>{
                  if(variant.variantType === "color"){
                    return <div 
                    onClick={()=>handleVariantClick(v)}
                    className={`${v.variantName === currentProduct.variantName ? 'border-gray-700' : 'border-gray-300'} border-2 rounded-md cursor-pointer`}>
                      <img className='h-20 w-24 object-contain' src={v.variantArray[0].variantMainImage.url}></img>
                    </div>
                  }
                  else{
                    return <div className='text-xs font-semibold text-gray-600 uppercase'>{v.variantName}</div>
                  }
                })
                }
              </div>
            </div>
            })
          }
          {
              (sizeArray.length > 0) ? 
              <div className='flex gap-3 w-full min-h-[80px] items-center'>
                <div className='text-sm font-semibold text-gray-700 uppercase'>size:</div>
                    {
                      sizeArray.map((size)=>{
                        return <div 
                        onClick={()=>setSizeName(size)}
                        className={`${(size === sizeName) ?'bg-slate-800 text-white border-2 border-transparent':'bg-white text-slate-800 border-2 border-gray-400'} py-[6px] px-2 text-xs font-semibold  border-2  rounded-md uppercase cursor-pointer`}>{size}</div>
                      })
                    }
              </div>
              :''
            }
            <div className='flex flex-col gap-2 py-4 pb-20'>
            <div className='flex gap-3 items-center'>
            <div className='text-slate-700'><ion-icon name="bicycle" style={{fontSize:'22px'}}></ion-icon></div>
            <div className='font-semibold text-slate-600 text-sm'>Expected delivery in <span className='text-black'>{calculateExpectedDelivery(currentProduct.expectedDelivery)}. </span><span className='underline'>Want it faster?</span></div>
            </div>
            <div className='flex gap-3 items-center'>
            <div className='text-slate-700'><ion-icon name="home" style={{fontSize:'22px'}}></ion-icon></div>
            <div className='font-semibold text-slate-600 text-sm'>Sold by <span className='text-black'>{currentProduct.shopName}. </span><span className='underline'>Contact shop.</span></div></div>
          
            <div className='flex gap-3 items-center'>
            <div className='text-slate-700'><ion-icon name="wallet" style={{fontSize:'22px'}}></ion-icon></div>
            <div className='font-semibold text-slate-600 text-sm'>FREE return by 30 days <span className='underline'>Details.</span></div></div>
            </div>
        </div>
        </div>
        :
      <div className='w-screen h-screen'>

      </div>
      }  
    </>
  )
}

export default MobileProductInfo
