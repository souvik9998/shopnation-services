import React from 'react'
import Login from './Login'
import loginsvg from '../Images/login.svg'
import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
const Loginpage = () => {
  const location = useLocation();
  return (
    <>
      <div className='w-screen h-screen lg:h-[85vh] bg-gray-200/80 lg:bg-buttonColor flex justify-center items-center'>
        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:0.5, duration:0.6}}
         className='hidden w-6/12 h-full lg:flex justify-center items-center -mb-52 animate-bounceRoleSelect'><img src={loginsvg}></img>
         </motion.div>
        <div className='w-full lg:w-6/12 h-full flex justify-center items-center px-4'>
        <motion.div
    initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{ duration:0.4 ,type : ''}}
    className="h-fit w-full lg:w-[70%] py-6 px-4 lg:px-10 drop-shadow-lg rounded-lg">
      <Outlet/>
      </motion.div></div>
      </div>
    </>
  )
}

export default Loginpage
