import React from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalContext } from '../components/context';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../config/config';
const ProductInfopage = () => {
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
        const res =  await axios.get(`http://${baseUrl}/sellerapi/onboard/showProduct/${productId}`);
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
            const res = await axios.get(`http://${baseUrl}/sellerapi/onboard/getProductVariantInfo/${productId}?variantName=${variantName}`);
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
      .post(`http://${baseUrl}/userapi/cart/addToCart`,{
        productId : item.productId,
        userId: user.userId,
        productName : item.productName,
        productAmount : item.productPrice,
        productType : item.productType,
        shopId : shopId,
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
    {item? 
      <div className=' w-screen min-h-screen font-Inter '>
        <div className='flex gap-10 h-fit w-full px-16 pt-16 py-10'>
          <div className='w-[45%] h-96 px-2 flex justify-center gap-2'>
          <div className='w-[25%] h-full px-4 flex flex-col gap-2 overflow-scroll'>
            {
                <div className={`w-full h-[25%] rounded-sm ${mainImage === item.mainImagePath? 'border-2 border-blue-500 ':''}`}>
                <img
                className='rounded-sm w-full h-full object-contain  overflow-hidden'
                onMouseEnter={()=>handleImageHover(item.mainImagePath)}  
                src={item.mainImagePath.url}></img></div>
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
                (item.isAvailable)?'In Stock':'Out of stock'
            }</div>
            <div className='capitalize font-semibold text-2xl'>{item.productName} {item.productDescription}</div>
            <div className='flex gap-2 items-center '>
            <div className='flex gap-[2px] bg-green-600 text-white rounded-sm w-12 text-xs items-center justify-center'>
              <div className='py-1'>4.2</div>
              <div className='pt-[0.8px]'><ion-icon name="star"></ion-icon></div>
            </div>
            <div className='text-gray-500 font-semibold text-sm'>(1000 reviews)</div>
            </div>
            <div className='font-semibold text-3xl items-end flex gap-3 h-12'>
              <div>₹{item.productPrice}</div>
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
              <div className='flex gap-6 w-[85%] h-12 items-center'>
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
                return <div className='flex flex-col gap-5 w-[85%] h-28 justify-center'>
                <div className='text-sm font-semibold text-gray-700 uppercase'>{variant.variantType}:<span className='pl-2 text-gray-600 font-medium'>{item.variantName}</span></div>
                <div className='flex items-center gap-2'>
                {
                variant.typeArray.map((v) =>{
                  if(variant.variantType === "color"){
                    return <div 
                    onClick={()=>handleVariantClick(v)}
                    className='flex relative items-center justify-center '>
                    <div className={`${v.variantName === item.variantName ? 'border-gray-700' : 'border-gray-300'} w-8 h-8 border-2 rounded-full`}></div>
                    <div className={`w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer`} style={{backgroundColor:v.variantName}}></div>
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
            <div className='font-semibold text-slate-600 text-sm'>Expected delivery in <span className='text-black'>{calculateExpectedDelivery(item.expectedDelivery)}. </span><span className='underline'>Want it faster?</span></div>
            </div>
            <div className='flex gap-3 items-center'>
            <div className='text-slate-700'><ion-icon name="home" style={{fontSize:'22px'}}></ion-icon></div>
            <div className='font-semibold text-slate-600 text-sm'>Sold by <span className='text-black'>{item.shopName}. </span><span className='underline'>Contact shop.</span></div></div>
          
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
