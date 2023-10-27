import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from '../components/context';
import { motion } from 'framer-motion';
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
      .post('http://localhost:3002/auth/login', user)
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
    className="h-fit bg-white w-[70%] py-6 px-10 drop-shadow-lg rounded-lg">
      <div className="">
      <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Log in as a seller
      </h2>
    </div>
      <div className="mt-10">
      <form onSubmit={handleSubmit} action="" className="space-y-6">
      <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name
          </label>
          <div className="mt-2">
              <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="email" 
                     className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
      </div>
      <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <Link to><div className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </div></Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange} 
                  placeholder="password"
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

          <p className="mt-6 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link to='/Roleselect'><div className="font-semibold leading-6 text-buttonColor">
              Create account
            </div>
            </Link>
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default Sellerlogin;
