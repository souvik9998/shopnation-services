import React from 'react'
import Sellerlogin from './Sellerlogin'
import Sellerloginsvg from '../Images/Sellerlogin.svg'
import { motion } from 'framer-motion'
const Sellerloginpage = () => {
  return (
    <>
      <div className='w-screen h-screen lg:h-[85vh] bg-gray-200/70 lg:bg-buttonColor flex justify-center items-center'>
        <div 
        className='w-full lg:w-6/12 h-full flex justify-center items-center px-4'>
          <Sellerlogin /></div>
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{delay:0.4, duration:0.6}}
        className='w-6/12 h-full hidden lg:flex justify-center items-center -mb-44 animate-bounceRoleSelect'><img src={Sellerloginsvg}></img></motion.div>
      </div>
    </>
  )
}

export default Sellerloginpage
