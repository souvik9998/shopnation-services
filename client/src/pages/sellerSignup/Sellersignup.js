import React from 'react'
import Personalinfo from './Personalinfo';
import Shopinfo from './Shopinfo';
import Otherinfo from './Otherinfo';
import { useState,useEffect } from 'react';
import Shoptimings from './Shoptimings';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import animationData from '../../Images/GreenAnimation.json';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';

const Sellersignup = ({setSlideFull,slideFull}) => {
  const navigate = useNavigate();
  const [page,setPage] = useState(0);
  const[progressBar,setProgressbar] = useState(false);
  const currentPage = ['PersonalInfo','ShopInfo','Other','shopTimings'];  
  const [signUpSuccess,setSignUpSuccess] = useState(false);
  const [sellerInfo,setSellerInfo] = useState({
    name : "",
    email : "",
    mobileNumber : "",
    password : "",
    confirmPassword : "",
    shopName : "",
    shopType : "",
    shopImage : null,
    shopAddress : {
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      state : "",
      postalCode : ""
    },
    shopTimings:{
      openingTime: "",
      closingTime: "",
      openDays : "",
    }
  })

  const changePage = (page) =>{
    if(page === 0){
        return <Personalinfo sellerInfo={sellerInfo} setSellerInfo={setSellerInfo}/>
    }
    else if(page === 1){
        return <Shopinfo sellerInfo={sellerInfo} setSellerInfo={setSellerInfo}/>
    }
    else if(page === 2){
        return <Otherinfo sellerInfo={sellerInfo} setSellerInfo={setSellerInfo}/>
    }
    else if(page === 3){
      return <Shoptimings sellerInfo={sellerInfo} setSellerInfo={setSellerInfo}/>
  }
  }
  const showToast = () => {
    toast.success('Sign up successfull', {
      position: "bottom-left",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

    const signupdata = async(formData)=>{
      try{
        const res = await axios.post('http://localhost:3002/auth/signUp',formData);
        return res.data;
      }
      catch(err){
        console.log(err);
      } 
    } 
  // const registerShop = async(shopdata) =>{
  //   try{
  //     const res = await axios.post('http://localhost:4000/api/registerShop',shopdata);
  //     return res;
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  // }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    
    const formData = new FormData();

    formData.append("name", sellerInfo.name);
    formData.append("email", sellerInfo.email);
    formData.append("mobileNumber", sellerInfo.mobileNumber);
    formData.append("password", sellerInfo.password);
    formData.append("confirmPassword", sellerInfo.confirmPassword);
    formData.append("shopName", sellerInfo.shopName);
    formData.append("shopType", sellerInfo.shopType);
    formData.append('shopAddress', JSON.stringify(sellerInfo.shopAddress));
    formData.append('shopTimings', JSON.stringify(sellerInfo.shopTimings));
    formData.append('subcategories', JSON.stringify(sellerInfo.subcategories));


    // Append the image file
    formData.append("shopImage", sellerInfo.shopImage);
    try{
      const res1 = await signupdata(formData);
      console.log(res1);
      // const res2 = await registerShop(shopData);
      // console.log(res2);
      setSignUpSuccess(!signUpSuccess);
      // showToast();
      // await new Promise((resolve) => setTimeout(resolve, 4500))
      // navigate('/loginrole')
    }
    catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressbar(true);
    }, 300); // 1000ms = 1s, adjust the delay here as needed
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    <div className='w-[59vw]'>
        <div className="bg-gray-200 h-2.5">
            <div className={`bg-blue-600  transition-all ease-in-out duration-700 h-2.5 ${(progressBar === false) ? 'w-[0%]' : (page === 0) ?'w-[25%] rounded-r-lg' :(page === 1) ? 'w-[50%] rounded-r-lg' : (page === 2) ? 'w-[75%] rounded-r-lg':'w-[100%]'}`}></div>
        </div>
      <div className=" h-fit bg-cardColor w-7/12 mx-auto mt-20 drop-shadow-lg p-6 rounded-lg font-Inter">
        <div>{signUpSuccess ? <div className='flex flex-col gap-4 justify-center items-center'><div className='w-full h-full flex justify-center items-center'>
          <Lottie
          animationData={animationData}
          loop={false}
          /></div>
        <div className='text-xl font-medium text-green-500'>Sign up successfull</div>
        <div><Link to='/Loginrole'><div className='text-lg font-semibold text-white bg-buttonColor rounded-lg w-52 flex justify-center items-center h-12 mt-2'>Go to the loginpage</div></Link></div>
        </div> : changePage(page)
          }</div>
        <div className='flex mt-6 justify-between'>
            <div>
            {
                (page > 0 && !signUpSuccess)?<button onClick={()=>setPage((currPage) =>currPage-1)} className="">
                            <ion-icon name="arrow-back-circle" style={{color:'#516BFB', fontSize: '50px'}}></ion-icon>
                        </button>:
                        ''
            }
                    
            </div>
            {!signUpSuccess &&
            <div>
                {
                    (page < currentPage.length-1)?<button onClick={()=>setPage((currPage) =>currPage+1)}
                    className="flex w-24 justify-center items-center rounded-md bg-buttonColor px-2 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Next
                </button>:
                <div>
                <button
                    className="flex w-40 h-10 items-center justify-center rounded-md bg-buttonColor px-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                >
                Create your shop
                </button>
                </div>

                }
                    
            </div>
          }
        </div>
      </div>
      </div>
    </>
  )
}

export default Sellersignup
