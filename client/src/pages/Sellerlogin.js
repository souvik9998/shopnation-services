import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from '../components/context';
import { motion } from 'framer-motion';
import { baseUrl } from '../config/config';
const Sellerlogin = () => {
  const navigate = useNavigate();
  const{setLoginStatus,setUserInfo} = useGlobalContext();
  const[user,setUser] = useState(
    {
      email:"",
      password:""
    }
  )
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setUser({
      ...user,
      [name] : value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    return await axios
      .post(`https://${baseUrl}/sellerapi/auth/login`, user)
      .then((response) => {
        console.log(response.data);
        // setUserInfo({
        //   userId : response.data.user.user_id,
        //   userName : response.data.user.user_name,
        //   email : response.data.user.email,
        //   accessToken : response.data.token

        // })
        window.localStorage.setItem("token",response.data.token);
        window.localStorage.setItem("sellerLoginStatus",true);
        window.localStorage.setItem("userInfo",JSON.stringify(response.data.user));
        navigate("/seller");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
    <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{ duration:0.4 ,type : ''}}
    className='w-fit h-fit border border-black lg:bg-white lg:py-8 px-4 lg:px-12 rounded-lg lg:w-[70%] flex flex-col lg:gap-6 gap-4'>
      <div className="flex flex-col gap-2">
      <div className="text-lg font-bold  text-gray-800/90">
          Log in as a seller
      </div>
      <div className='text-xs lg:text-sm text-gray-500 font-medium'>Create your virtual shops and services<br/>  through shopnation</div>
    </div>
      <div className="">
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4 lg:gap-6">
      <div>
          
          <div className="">
          <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Email" 
                     className="focus:ring-1 ring-buttonColor shadow-sm outline-none focus:outline-none appearance-none block w-full px-2 rounded-lg border lg:border-[1.5px] border-gray-400/80 py-1.5 text-gray-900  placeholder:text-gray-400 placeholder:text-sm"/>
              
              </div>
      </div>
      <div>
              <div className="flex items-center justify-between">
              </div>
              <div className="">
              <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange} 
                  placeholder="Password"
                  className="outline-none shadow-sm focus:ring-1 ring-buttonColor border lg:border-[1.5px] border-gray-400/80 focus:outline-none focus:placeholder:bg-inherit block w-full px-2 rounded-lg  py-1.5 text-gray-900  placeholder:text-gray-400 placeholder-text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-buttonColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
      </motion.div>
    </>
  );
};

export default Sellerlogin;
