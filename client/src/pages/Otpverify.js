import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
const Otpverify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp,setOtp] = useState('');
    const {mobileNumber} = location.state;
    const handleClick = async() =>{
        try{
            const res = await axios.post(`http://localhost:9000/auth/verifyOTP`,{mobileNumber,otp});
            console.log(res);
            navigate('/loginpage/reset-password',{state:{mobileNumber}});
        }
        catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <motion.div
       initial={{opacity:0}}
       animate={{opacity:1}}
       transition={{delay:0.2, duration:0.2}}
      className='flex flex-col gap-6'>
        <div className="text-center text-2xl font-semibold leading-9 text-gray-900">Enter your OTP</div>
        
        <div className='flex flex-col gap-3'>
        <div className='text-sm text-gray-800 font-medium'>Enter your OTP number provided in your mobile number.Do not
        share with anyone</div>
            <input
            placeholder='Enter your OTP'
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e)=>{
                    setOtp(e.target.value)
                  }} 
            className="focus:outline-none block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            
        </div>
        <button 
        onClick={handleClick}
        className='bg-buttonColor font-medium text-center py-2 rounded-md text-white'>Continue</button>
      </motion.div>
    </>
  )
}

export default Otpverify
