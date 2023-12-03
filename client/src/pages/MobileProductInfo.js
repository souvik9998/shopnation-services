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

import '../App.css';

import { Pagination} from "swiper";
const MobileProductInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {shopId,productId} = useParams();
    const [variantName,setVariantName] = useState('');
    const [variantId,setVariantId] = useState('');
    const [sizeName,setSizeName] = useState('');
    const [defualtProductId,setDefaultProductId] = useState('');
    const [item,setItem] = useState();
    const [variants,setVariants] = useState([])
    const [sizeArray,setSizeArray] = useState([]);
    const [defaultItem,setDefaultItem] = useState();
    const [mainImage,setMainImage] = useState('');
    const [productImages,setProductImages] = useState([]);
    const token = window.localStorage.getItem("token");
    const {calculateExpectedDelivery} = useGlobalContext();
    const {cartList,user,setCartList,getCartDetails,getCartProductInfo} = useGlobalContext();
    useEffect(()=>{
        const variant_name = window.localStorage.getItem("variant_name");
        const main_product = JSON.parse(window.localStorage.getItem("main_product"));
        if(variant_name){
          console.log(variant_name);
          setVariantName(variant_name);
          setDefaultItem(main_product.item);
          setAdditional(main_product);
          showProductInfo();
        }
        else showProductInfo();
  
    },[location.pathname,variantId,productId])
  
    const showProductInfo = async()=>{
      if(location.pathname === `/ShopProductPage/${shopId}/${productId}`){
        try{  
          const res =  await axios.get(`https://${baseUrl}/sellerapi/onboard/showProduct/${productId}`);
          console.log(res);
          setItem(res.data.item);
          // setDefaultProductId(productId);
          setAdditional(res.data);
        }
        catch(err){
          console.log(err);
        }
      }
      else{
          try{
              const res = await axios.get(`https://${baseUrl}/sellerapi/onboard/getProductVariantInfo/${productId}?variantName=${variantName}`);
              const newSizeArray = [];
              variants.forEach((v)=>{
              v.typeArray.forEach((i)=>{
                if(i.variantName === variantName){
                  i.variantArray.forEach((j)=>{
                    if(j.size !== res.data.item.size)newSizeArray.push(j.size);
                    
                  })
                  }
                })
              })
              if(res.data.item.size !== undefined){
                setSizeArray([res.data.item.size,...newSizeArray]);
              }
            
            console.log(res.data);
            setItem(res.data.item);
            setSizeName(res.data.item.size);
            setMainImage(res.data.item.mainImagePath);
            setProductImages(res.data.item.productImages);
            localStorage.setItem("variant_name",variantName);
            
          }
          catch(err){
            console.log(err);
          }
      }
    }
    const handleVariantClick = (variant) =>{
      if(variant.variantName === defaultItem.variantName){
        setVariantId(defaultItem.productId);
        setVariantName(defaultItem.variantName);
        navigate(`/ShopProductPage/${shopId}/${productId}`);
      }
      else{
        let id;
        variant.variantArray.forEach((v)=>{
          if(v.size === item.size){ 
            id = v.variantId;
          }
        })
        setVariantId(id);
        setVariantName(variant.variantName);
        navigate(`/ShopProductPage/${shopId}/${productId}/${id}`)
      }
      
    }
    const setAdditional =(data)=>{
        setDefaultItem(data.item);
        setVariantName(data.item.variantName);
        setMainImage(data.item.mainImagePath);
        setProductImages(data.item.productImages);
        setSizeName(data.item.size);
        window.localStorage.setItem("main_product",JSON.stringify(data));
        // setVariants(data.variantObject);
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
                    console.log(j);
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
        
        setVariants([...variantArray]);
    }
   
    // const handleClickSize = async(size,variantId)=>{
    //   console.log(variantId);
    //   if(variants.length === 0){
    //     setSizeName(size);
    //     setVariantId(variantId);
    //     if(size === defaultItem.size){
    //       navigate(`/ShopProductPage/${shopId}/${variantId}`);
    //     }
        
    //     else navigate(`/ShopProductPage/${shopId}/${productId}/${variantId}`);
    //   }
    //   else{
    //     if(size === defaultItem.size && variantName === defaultItem.variantName){
    //       setSizeName(size);
    //       setVariantId(defaultItem.productId);
    //       navigate(`/ShopProductPage/${shopId}/${productId}`);
    //     }
    //     else{
    //       let id;
    //       variants.forEach((i)=>{
    //         i.typeArray.forEach((j)=>{
    //           if(item.variantName === j.variantName){
    //             j.variantArray.forEach((k)=>{
    //             if(k.size === size){
    //               id = k.variantId;
    //             }
    //           })
    //           }
              
              
    //         })
    //       })
    //       setSizeName(size);
    //       setVariantId(id);
    //       navigate(`/ShopProductPage/${shopId}/${productId}/${id}`);
    //     }
    //   }
      
      
    // }
  
    const handleImageHover =(imagePath)=>{
      setMainImage(imagePath);
    }
    const handleAddtoCart = async() =>{
      try{
        const res1 =  await axios
        .post(`https://${baseUrl}/userapi/cart/addToCart`,{
          productId : item.productId,
          userId: user.userId,
          productName : item.productName,
          productAmount : item.productPrice,
          productType : item.productType,
          shopId : shopId,
          expectedDelivery:calculateExpectedDelivery(item.expectedDelivery),
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
      
  
    console.log(variants);
    console.log(sizeArray);
    console.log(item);
    console.log(sizeName);
  return (
    <>
    <div className='w-screen min-h-screen font-Inter '>
      <div className='lg:hidden flex flex-col min-h-screen py-2 px-2 rounded-md'>
        <div className='capitalize text-gray-800 font-bold text-lg'>{item.productName}</div>
        <div className='capitalize text-gray-500 font-semibold text-sm'>{item.productDescription}</div>
          <div className='w-full h-[60vh]'>
            <Swiper pagination={true} modules={[Pagination]} className="productImageSwiper h-full">
            {
                <SwiperSlide className={`w-full h-full rounded-sm`}>
                <img
                className='rounded-sm w-full h-full object-contain  overflow-hidden'
                src={item.mainImagePath.url}></img></SwiperSlide>
            }
            {
              (productImages)?
              productImages.map((image)=>{
              return <SwiperSlide
              className={`w-full h-full rounded-sm flex`}>
              <img
              className= ' object-contain w-full h-full overflow-hidden rounded-sm' src={image.url}></img>
              </SwiperSlide>
              
            }):''
            }
            </Swiper>
          </div>
          
        </div>
        </div>
    </>
  )
}

export default MobileProductInfo
