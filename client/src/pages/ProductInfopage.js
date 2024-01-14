import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalContext } from '../components/context';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config/config';
import MobileProductInfo from './MobileProductInfo';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import { Swiper, SwiperSlide } from "swiper/react";
import { StoreProvider, useStoreContext } from '../context/StoreContext';
import '../App.css';

import { Pagination} from "swiper";
const ProductInfopage = () => {
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
  const {cartList,user,setCartList,getCartDetails,getCartProductInfo} = useGlobalContext();
  const {variants,setVariants,defaultProduct,setDefaultProduct,currentProduct,setCurrentProduct} = useStoreContext();
  useEffect(()=>{
      // const variant_name = window.localStorage.getItem("variant_name");
      
      // if(variant_name){
      //   console.log(variant_name);
      //   setVariantName(variant_name);
      //   setDefaultItem(main_product.item);
      //   setAdditional(main_product);
      //   showProductInfo(variant_name);
      // }
      // else showProductInfo();
      
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
    }
    catch(err){
      console.log(err);
    }
    }
  return (
    <>
    {currentProduct? 
      <div className='w-screen min-h-screen font-Inter '>
        <div className='hidden lg:flex gap-10 h-fit w-full px-16 pt-16 py-10'>
          <div className='w-[45%] h-96 px-2 flex justify-center gap-2'>
          <div className='w-[25%] h-full px-4 flex flex-col gap-2 overflow-scroll'>
            {
                <div className={`w-full h-[25%] rounded-sm ${mainImage === currentProduct.mainImagePath? 'border-2 border-blue-500 ':''}`}>
                <img
                className='rounded-sm w-full h-full object-contain  overflow-hidden'
                onMouseEnter={()=>handleImageHover(currentProduct.mainImagePath)}  
                src={currentProduct.mainImagePath.url}></img></div>
            }
            {
              (productImages)?
              productImages.map((image)=>{
              return <div 
              className={`w-full h-[25%] rounded-sm  ${mainImage === image?'border-2 border-blue-500':'border'}`}>
              <img
              onMouseEnter={()=>handleImageHover(image)} 
              className='w-full h-full object-contain overflow-hidden rounded-sm' src={image.url}></img></div>
              
            }):''
            }
            </div>
            <div className='w-[75%] h-full flex shadow'><img className='w-full h-full object-contain' src={mainImage.url}></img></div>

          </div>
          <div className='w-fit max-w-96 flex flex-col h-fit gap-3'>
            <div className='bg-gray-100 text-green-600 font-semibold text-sm w-fit rounded-sm px-3 py-[0.8px]'>{
                (currentProduct.isAvailable)?'In Stock':'Out of stock'
            }</div>
            <div className='capitalize font-semibold text-2xl'>{currentProduct.productName} {currentProduct.productDescription}</div>
            <div className='flex gap-2 items-center '>
            <div className='flex gap-[2px] bg-green-600 text-white rounded-sm w-12 text-xs items-center justify-center'>
              <div className='py-1'>4.2</div>
              <div className='pt-[0.8px]'><ion-icon name="star"></ion-icon></div>
            </div>
            <div className='text-gray-500 font-semibold text-sm'>(1000 reviews)</div>
            </div>
            <div className='font-semibold text-3xl items-end flex gap-3 h-12'>
              <div>₹{currentProduct.productPrice}</div>
              <div className='relative'><div className='text-base text-gray-400'>₹3000</div>
              <div className='absolute inset-y-1/2 w-full h-[2px] rounded-lg bg-gray-600'></div>
              </div>
              <div className='font-smibold text-green-500 text-base'>(50% off)</div>
            </div>
            <div className='text-sm font-semibold text-gray-600'>Prices may vary in stores,app and online</div>
            <div className='flex gap-6 w-[80%] items-center justify-center py-6 font-medium text-lg'>
              <div className=' bg-white border-2 border-buttonColor text-buttonColor w-[50%] py-2 rounded-full text-center'>Buy Now</div>
              <div
              onClick={()=>handleAddtoCart()} 
              className='bg-buttonColor border-2 border-buttonColor text-white fle w-[50%] py-2 rounded-full text-center'>Add to cart</div>
            </div>
            {
              (sizeArray.length > 0) ? 
              <div className='flex gap-6 w-[85%] h-16  items-center'>
                <div className='text-sm font-semibold text-gray-700 uppercase'>size:</div>
                    {
                      sizeArray.map((size)=>{
                        return <div 
                        onClick={()=>setSizeName(size)}
                        className={`${(size === sizeName) ?'border-slate-600 text-slate-600':'border-slate-400 text-slate-400'} px-2 text-sm font-semibold py-1 border-2  rounded-md uppercase cursor-pointer`}>{size}</div>
                      })
                    }
              </div>
              :''
            }
            {
              variants.map((variant)=>{
                return <div className='flex flex-col gap-4 w-[85%] h-36 justify-center'>
                <div className='text-sm font-semibold text-gray-700 uppercase'>{variant.variantType}:<span className='pl-2 text-gray-600 font-medium'>{currentProduct.variantName}</span></div>
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

export default ProductInfopage
