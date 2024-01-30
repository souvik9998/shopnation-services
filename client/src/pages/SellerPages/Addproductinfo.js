import React, { useEffect, useRef } from 'react'
import Dropzone from '../../components/SellerComponents/Dropzone'
import Dropzonesecond from '../../components/SellerComponents/Maindropzone';
import { useState } from 'react';
import axios from 'axios';
// import { useSellerContext } from '../../components/Sellercontext';
import Successmessage from '../../components/Successmessage';
import { createPortal } from 'react-dom';
import Maindropzone from '../../components/SellerComponents/Maindropzone';
import VariantDropzone from '../../components/SellerComponents/VariantDropzone';
import ProductForm from './ProductForm';
import AddproductVariant from './AddproductVariant';
import { baseUrl } from '../../config/config';
const Addproductinfo = () => {
  // const {savedProduct,setSavedProduct} = useSellerContext();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  const id = userInfo.id;
  const token = window.localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const SellerInfo = {
    shopId: id,
    shopName: userInfo.shopName,
    productName: '',
    productDescription: '',
    variantType:'',
    variantName:'',
    productAmount:'',
    isAvailable: true,
    productPrice: '',
    expectedDelivery: '',
    discount: 0,
    dimension:{
      length: '',
      width: '',
      height: ''
    },
    brand:'',
    gender:'',
  }

  const [formData,setFormData] = useState(SellerInfo);
  const [productImages, setProductImages] = useState([]);
  const [mainImage,setMainImage] = useState(null);
  const [clearImages,setClearImages] = useState(false);
  const [variantArray,setVariantArray] = useState([]);
  const [sizeArray,setSizeArray] = useState([]);
  useEffect(()=>{
    const formData = JSON.parse(localStorage.getItem('SellerInfo'));
    const variantArray = JSON.parse(localStorage.getItem('variantArray'));
    if(formData && variantArray){
      setVariantArray(variantArray);
      setFormData(formData)
    }
    console.log(formData);
  },[])

  useEffect(()=>{
    localStorage.setItem('SellerInfo', JSON.stringify(formData));
    localStorage.setItem('variantArray', JSON.stringify(variantArray));
  }, [formData,variantArray]);


  const handleAddVariant = ()=>{
    // 
    const newVariant = {
      shopId: id,
      shopName: userInfo.shopName,
      variantType: '',
      variantName:'',
      productName: formData.productName,
      productDescription: formData.productDescription,
      productAmount: formData.productAmount,
      isAvailable: true,
      productPrice: formData.productPrice,
      expectedDelivery: formData.expectedDelivery,
      discount: formData.discount,
      dimension:{
        length: formData.dimension.length,
        width: formData.dimension.width,
        height: formData.dimension.height
      },
      brand:formData.brand,
      gender:formData.gender,
      mainImage: null,
      productImages:[],
      sizeArray: []
    }
    const variantInfo = {variant:newVariant,isAdded : false}
    setVariantArray(variantInfo)
    if(variantArray.length > 0){
      setVariantArray([...variantArray,variantInfo]);
    }
    else{
      setVariantArray([variantInfo]);
    }
  }
  
  const handleClick = async(e) =>{
    e.preventDefault();
    setIsLoading(true);
    let productId;
    const sizeArrayLength = sizeArray.length;
    if(sizeArrayLength> 0){
      productId = await addProduct(sizeArray[0]);
      sizeArray.shift();
      const res = await addSizeVariant(sizeArray,productId);
      console.log(res);
    }
    console.log(productId);
    if(variantArray.length > 0){
      const res2 = await addProductVariant(productId);
      console.log(res2);
    }
      setTimeout(()=>{
          setIsLoading(false)
          setIsAdded(true)
          setFormData(SellerInfo);
          setProductImages([]);
          setClearImages(true);
          setVariantArray([]);
          localStorage.removeItem('SellerInfo')
          setTimeout(()=>{
            setIsAdded(false)
          },1500)
        },2000)
    
  }
  const addProduct = async(size)=>{
    try{
      const headers = {
        Authorization : `Bearer ${token}`
      }
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if(key === "variantType" && value === ''){
            form.append("variantType","size");
          }
          else if(key === "variantName" && value === ''){
            form.append("variantName",size);
          }
          else form.append(key, value);
        });
        form.append('mainImage',mainImage);
        productImages.forEach((image) =>{
        form.append('productImages',image)
      })
        form.append('size',size);
        const res = await axios.post(`https://${baseUrl}/sellerapi/onboard/storeProduct`,form,{headers})
        console.log(res);
        return res.data.productId;
    }
    catch(err){
      console.log(err);
    }
  }
  const addProductVariant = async(productId) =>{
    try{
      const headers = {
        Authorization : `Bearer ${token}`
      }
      const productPromises = variantArray.map(async(item)=>{
        let sizePromises = [];
        console.log(item);
        if(item.variant.sizeArray && item.variant.sizeArray.length > 0){
          sizePromises = item.variant.sizeArray.map(async(size)=>{
            console.log(size);
            const form = new FormData();
            Object.entries(item.variant).forEach(([key, value]) => {
              if(key === 'mainImage'){
                form.append('mainImage',value);
              }
              else if(key === 'productImages'){
                value.forEach((image) =>{
                  form.append('productImages',image)
                })
              }
              else if(key !== 'sizeArray') form.append(key, value); 
            });
            form.append("size",size);
            form.append("productId",productId);
            await axios.post(`https://${baseUrl}/sellerapi/onboard/storeProductVariant`,form,{headers})
          })
          const res1 = Promise.all(sizePromises);
          console.log(res1);
        }
        else{
          const form = new FormData();
          Object.entries(item.variant).forEach(([key, value]) => {
          if(key === 'variantImage'){
            form.append('variantImage',value);
          }
          else if(key !== 'sizeArray') form.append(key, value); 

          });
          form.append("productId",productId);
          await axios.post(`https://${baseUrl}/sellerapi/onboard/storeProductVariant`,form,{headers})
        }
        
      })
      const res2 = await Promise.all(productPromises);
      return res2;
    }
    catch(err){
      console.log(err);
    }
  }
  const addSizeVariant = async(sizeArray,productId)=>{
    try{
      const headers = {
        Authorization : `Bearer ${token}`
      }
      if(sizeArray.length === 0)return; 
      const productPromises = sizeArray.map(async(size)=>{
        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if(key === "variantType" && value === ''){
            form.append("variantType","size");
          }
          else if(key === "variantName" && value === ''){
            form.append("variantName",size);
          }
          else form.append(key, value); 
        });
        form.append("productId",productId);
        form.append("size",size)
        form.append("mainImage",mainImage);
        productImages.forEach((image) =>{
          form.append('productImages',image);
        })
        
        const res1 = await axios.post(`https://${baseUrl}/sellerapi/onboard/storeProductVariant`,form,{headers})
      })
      const res2 = await Promise.all(productPromises);
      return res2;
    }
    catch(err){
      console.log(err);
    }
  }
  // const addMoreSize = async(sizeArray,productId)=>{
  //   try{
  //     const headers = {
  //       Authorization : `Bearer ${token}`
  //     }
  //     if(sizeArray.length === 0)return; 
  //     const productPromises = sizeArray.map(async(size)=>{
  //       const form = new FormData();
  //       Object.entries(formData).forEach(([key, value]) => {
  //         form.append(key, value); 
  //       });
  //       form.append("productId",productId);
  //       form.append("size",size)
  //       form.append("variantImage",mainImage);
  //       const res1 = await axios.post('https://localhost:3002/onboard/storeProductVariant',form,{headers})
  //     })
  //     const res2 = await Promise.all(productPromises);
  //     return res2;
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }
  return (
    <>
        {
          (isAdded)?
            createPortal(
              <div className='fixed top-0 right-0 mr-6 mt-10'>
              <Successmessage />
            </div>,document.body
            )
        :''
        }
        <div className='w-full h-full'><ProductForm SellerInfo={SellerInfo} formData={formData} setFormData={setFormData} 
        productImages={productImages} setProductImages={setProductImages}
        mainImage={mainImage} setMainImage={setMainImage}
        clearImages={clearImages} setClearImages={setClearImages}
        sizeArray={sizeArray} setSizeArray={setSizeArray}/></div>
        
        
        {
          (variantArray.length > 0)?
          variantArray.map((variant,ind)=>{
            return <div className='w-full h-full'>
              <div className='w-full h-[0.5px] bg-slate-400 mt-8'></div>
              <div className='w-full h-full'><AddproductVariant variantArray={variantArray} setVariantArray={setVariantArray} index={ind}/></div>
              </div>
            
          }):''
        }

        <div className=' flex justify-between items-center'>
        {(variantArray)?
            <div className='flex gap-1'><div className=''><ion-icon style={{color:'gray' ,fontSize:'18px'}} name="information-circle"></ion-icon></div>
                <div className='text-sm font-medium text-slate-500'>Add the variants before adding the whole product.</div>
            </div>:<div></div>}
            <div className='w-[55%] flex py-6 justify-between'>
          {(isLoading)?
            <div className='w-[30%] h-12  font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>Adding...</div>
            : (isAdded)?
            
            <div className='w-[30%] h-12 font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
            <span className='mr-2'>✔</span>Added</div>:
             <div onClick={handleClick} className='w-[30%] h-12 font-semibold text-base rounded-lg border-white bg-buttonColor border text-white flex justify-center items-center'>
             Add product</div>
}
            <div className='w-[30%] h-12 font-semibold text-base rounded-lg border-buttonColor bg-white border text-buttonColor flex justify-center items-center'>Save product</div>
            <div 
            onClick={()=>handleAddVariant()}
            className='w-[30%] h-12 font-semibold text-base rounded-lg border-buttonColor bg-white border text-buttonColor flex justify-center items-center'><span className='text-2xl font-normal pr-1 pb-[5px]'>+</span>Add more variant</div>
          </div>
        </div>
    </>
  )
}

export default Addproductinfo
