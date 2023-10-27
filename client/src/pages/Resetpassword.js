import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
const Resetpassword = () => {
    const [password,setPassword] = useState({
        newPassword : '',
        confirmPassword : ''
    })
    const location = useLocation();
    const navigate = useNavigate();
    const {mobileNumber} = location.state;
    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const handleClick = async() =>{
        try{
            const res = await axios.post(`http://localhost:9000/auth/createNewPassword`,{mobileNumber,password});
            console.log(res);
            navigate('/loginpage');
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
        <div className='text-sm text-gray-800 font-medium'>New password</div>
            <input
            placeholder='New Password'
                  name="newPassword"
                  type="password"
                  value={password.newPassword}
                  onChange={handlePasswordChange}
            className="focus:outline-none block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        <div className='text-sm text-gray-800 font-medium'>Confirm password</div>
            <input
            placeholder='Confirm Password'
                  name="confirmPassword"
                  type="password"
                  value={password.confirmPassword}
                  onChange={handlePasswordChange}
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

export default Resetpassword
