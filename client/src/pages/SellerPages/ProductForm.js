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

const ProductForm = ({formData,setFormData,mainImage,setMainImage,productImages,setProductImages,clearImages,setClearImages,
  sizeArray,setSizeArray}) => {
    // const {savedProduct,setSavedProduct} = useSellerContext();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const id = userInfo.id;
    const token = window.localStorage.getItem("token")
    const [size,setSize] = useState('');
    const handleChange = (e) =>{
        const{name,value} = e.target;
        setFormData((prev)=>{
          return {
            ...prev,
            [name] : value
          }
        })
      }
      const handleDimensionChange = (e)=>{
        const{name,value} = e.target;
        setFormData({
          ...formData,
          dimension:{
            ...formData.dimension,
            [name] : value
          }
        })
      }
      
      const addSize = ()=>{
        if(sizeArray.length > 0){
          setSizeArray([...sizeArray,size]);
        }
        else setSizeArray([size]);
      }
  return (
    <>
      <div className='flex gap-10 w-full h-full '>
        
        <div className='pt-8 pb-10 flex flex-col gap-6 w-6/12'>
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product name</div>
                    <input type='text'
                    name='productName'
                    placeholder=''
                    value={formData.productName}
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
            <div>
                <div className='flex gap-6 w-full'>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Product price</div>
                        <input type='number'
                        name='productPrice'
                        value={formData.productPrice}
                        onChange={handleChange}
                        placeholder=''
                        className='border-[1.5px] border-zinc-300 h-10  rounded-md px-3'
                        ></input>
                    </div>
                    {/* <div className='flex flex-col gap-3 w-6/12'>
                        <div className='font-medium text-base'>Color</div>
                        <input type='text'
                        name='color'
                        value={formData.color}
                        onChange={handleChange}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                        ></input>
                    </div> */}
                </div>
            </div>
              <div className='flex gap-6'>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Brand</div>
                    <input type='text'
                    name='brand'
                    value={formData.brand}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Discount<span className='text-xs text-slate-400 pl-1'>(if applicable)</span></div>
                    <input type='mumber'
                    name='discount'
                    value={formData.discount}
                    placeholder=''
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                </div>
                
                <div className='flex flex-col gap-3 w-full'>
                    <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Delivery duration</div>
                    <input type='text'
                    name='expectedDelivery'
                    value={formData.expectedDelivery}
                    placeholder='e.g., 1 hour, 2 days'
                    pattern='^\d+\s(hour|hours|day|days)$'
                    onChange={handleChange}
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div>
                {/* <div className='flex flex-col gap-3 w-6/12'>
                    <div className='font-medium text-base'>Expected delivery</div>
                    <input type='text'
                    readOnly
                    value={calculateExpectedDelivery()}
                    placeholder='Expected Delivery Date'
                    className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                    ></input>
                </div> */}
                
            <div className='flex flex-col gap-3 w-full'>
                <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Description</div>
                    <textarea type='text'
                    name='productDescription'
                    value={formData.productDescription}
                    onChange={handleChange}
                    placeholder='' 
                    className='border-[1.5px] border-zinc-300 h-32 rounded-md p-3'
                    ></textarea>
            </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Dimension</div>
                    <div className='flex justify-between w-full gap-3'>
                        <input type='number'
                        name='length'
                        value={formData.dimension.length}
                        onChange={handleDimensionChange}
                        placeholder='Length'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='width'
                        value={formData.dimension.width}
                        onChange={handleDimensionChange}
                        placeholder='Width'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                      <input type='number'
                      name='height'
                        value={formData.dimension.height}
                        onChange={handleDimensionChange}
                        placeholder='Height'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-4/12'
                        ></input>
                    </div>
                </div>
                
            </div>
                
        <div className='w-6/12 pt-8 pb-10 px-4 flex flex-col justify-between '>
          <div className='flex flex-col gap-3'> 
            <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Upload product images</div>
            <div className='flex justify-between gap-2 w-full p-1 rounded-md h-[182px] border-[1.5px] border-zinc-300'>
              <Maindropzone mainImage={mainImage} setMainImage={setMainImage} clearImages={clearImages} setClearImages={setClearImages}/>
              <Dropzone productImages={productImages} setProductImages={setProductImages} clearImages={clearImages} setClearImages={setClearImages}/>
              
            </div>
            <div className='text-xs text-slate-400'>You need to add at least 3 images.Pay attention to the quality of the 
              pictures you add,comply with the background color standards.pictures must be in certain
              dimensions.
            </div>
          </div>
          <div className='w-full flex gap-4'>
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Size<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <div className='flex gap-1'>
                        <input
                        type="text"
                        name="size"
                        value={size}
                        onChange={(e)=>{setSize(e.target.value)}}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-[80%]'
                        ></input>
                        <div 
                        onClick={()=>addSize()}
                        className='bg-slate-800 text-white font-medium text-2xl pb-1 flex justify-center items-center rounded-lg w-[15%]'>+</div>
                      </div>
                      {
                        (sizeArray.length > 0)?
                        <div className='flex gap-2'>{
                        sizeArray.map((item)=>{
                          return <div className='py-2 px-2 bg-gray-200 text-black rounded-lg font-medium flex justify-center items-center'>
                            {item}
                          </div>
                        })
                        }</div>:''
                      }
            </div>
            
            <div className='flex flex-col gap-3 w-6/12'>
                      <div className='font-medium text-base'>Gender<span className='text-xs text-slate-400 pl-1'>(If applicable)</span></div>
                      <input
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                      ></input>
            </div>
          </div>
          <div className='flex flex-col gap-3 w-full'>
                    <div className='font-medium text-base'>Product Amount<span className='text-xs text-slate-400 pl-1'>(Fill which unit applicable)</span></div>
                    <div className='flex justify-between w-full gap-3'>
                      <input type='number'
                        name='productAmount'
                        value={formData.productAmount}
                        onChange={handleChange}
                        placeholder='amount'
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3 w-6/12'
                        ></input>
                    </div>
                  </div>
                  <div className='flex gap-6 w-full'>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className="font-medium text-base after:content-['*'] after:ml-0.5 after:text-red-500">Variant type
                        <span className='text-xs text-slate-400 pl-1'>(Fill if variant is added)</span></div>
                        <input type='text'
                        name='variantType'
                        value={formData.variantType}
                        onChange={handleChange}
                        placeholder=''
                        className='border-[1.5px] border-zinc-300 h-10  rounded-md px-3'
                        ></input>
                    </div>
                    <div className='flex flex-col gap-3 w-6/12'>
                        <div className='font-medium text-base'>Variant name
                        <span className='text-xs text-slate-400 pl-1'>(Fill if variant is added)</span></div>
                        <input type='text'
                        name='variantName'
                        value={formData.variantName}
                        onChange={handleChange}
                        className='border-[1.5px] border-zinc-300 h-10 rounded-md px-3'
                        ></input>
                    </div>
                </div>
        </div>
        </div>
        
    </>
  )
}

export default ProductForm
