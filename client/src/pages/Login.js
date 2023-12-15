import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from '../components/context';
import { motion } from 'framer-motion'
import Introimage from '../Images/ecom.png';
import { baseUrl } from '../config/config';
const Login = () => {
  const navigate = useNavigate();
  const{setLoginStatus,user,setUser} = useGlobalContext();
  const{authorizationMessage,setAuthorizationMessage,getCartDetails,getOrderDetails} = useGlobalContext();
  const[userInfo,setUserInfo] = useState(
    {
      email:"",
      password:""
    }
  )
  const [errorMessage,setErrorMessage] = useState('');
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setUserInfo({
      ...userInfo,
      [name] : value
    })
  }
  const handleSubmit = async (event) => {
      event.preventDefault(); 
      try{
        const res1 = await login();
        if(res1){
          setAuthorizationMessage('authorized');
          navigate("/");
        }
      }
      catch(err){
        console.log(err);
      }
  }
  const login = async() =>{
    try{
      const res =  await axios.post(`https://${baseUrl}/userapi/auth/login`, userInfo);
      
        window.localStorage.setItem("token",res.data.token);
        setUser({
          userId : res.data.user.user_id,
          userName: res.data.user.user_name,
          mobileNumber: res.data.user.mobile_number,
          email: res.data.user.email,
        })
        return res.data.user;
      }
      catch(err){
        setErrorMessage(err.response.data.msg);
        console.log(err);
      } 
  }
  return (
    <>
    {(authorizationMessage === 'authorized')?
    <div className='w-96 h-28 mx-auto text-buttonColor rounded-lg bg-white font-semibold text-lg flex justify-center items-center'>You have already logged in...</div>:
    <div className='flex flex-col lg:gap-6 gap-4'>
      <div className="flex flex-col gap-2">
      <div className="text-lg font-bold  text-gray-800/90">
          Log in as a buyer
      </div>
      <div className='text-xs lg:text-sm text-gray-500 font-medium'>Get access of your nearest shop and services<br/>  through shopnation</div>
    </div>
      <div className="">
      {
        (errorMessage === "You havn't registered yet")?
        <div className='flex flex-col items-start gap-3 pl-10 h-fit rounded-lg border-2 mb-6 border-red-500 py-4'>
          <div className='text-red-500 font-medium  text-center text-lg'>{errorMessage}</div>
          <div className='bg-buttonColor rounded-md h-fit py-1 font-medium text-white w-4/12 text-center cursor-pointer'>Register</div>
      </div>:''
      }
      <form onSubmit={handleSubmit} action="" className="space-y-6">
      <div>
          
              <div>{
                (errorMessage === 'Invalid email format')?
                <span className='text-xs text-red-500 ml-5'>(Please give valid email address*)</span>:''
              }</div>
          <div className="mt-2">
              <input type="text" name="email" value={userInfo.email} onChange={handleChange} placeholder="Email" 
                     className="focus:ring-1 ring-buttonColor shadow-sm outline-none focus:outline-none appearance-none block w-full px-2 rounded-lg border border-gray-400/80 py-1.5 text-gray-900  placeholder:text-gray-400 "/>
              </div>
      </div>
      <div>
              
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={userInfo.password}
                  onChange={handleChange} 
                  placeholder="Password"
                  className="outline-none shadow-sm focus:ring-1 ring-buttonColor border border-gray-400/80 focus:outline-none focus:placeholder:bg-inherit block w-full px-2 rounded-lg  py-1.5 text-gray-900  placeholder:text-gray-400 "
                />
              </div>
              <div>
              {
                (errorMessage === 'Please give correct password')?
                <div className='text-sm text-red-500 font-medium mt-2'>*{errorMessage}</div>:''}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex drop-shadow w-full justify-center rounded-lg bg-buttonColor px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className='flex flex-col gap-2 mt-6'>
          <div className="flex items-center justify-between">
                
                <div className="text-sm">
                  <Link to='/loginpage/forgot-password'><div className="font-semibold text-buttonColor ">
                    Forgot password?
                  </div></Link>
                </div>
          </div>
          <p className="text-sm text-gray-500 font-medium">
            Don't have a account?{' '}
            <Link to='/Roleselect'><span className="font-semibold leading-6 text-buttonColor">
              Create account
            </span>
            </Link>
          </p>
          </div>
        </div>
        </div>
}
    </>
  );
};

export default Login;