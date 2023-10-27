import React, { useState } from 'react';
import Buyer from '../Images/Buyer.png'
import yes from '../Images/yes.png';
import { useNavigate } from 'react-router-dom';
import loginsvg from '../Images/loginsvg.svg'
import loginsvg2 from  '../Images/loginsvg2.svg';
import { motion } from 'framer-motion';
const Roleselect = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };
  const handleClick = () =>{
    if(selectedRole === 'buyer')navigate('/buyer-signup')
    if(selectedRole === 'seller')navigate('/seller-signup')
  }
  return (
    <div className="font-Inter h-screen flex items-center">
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{delay:0.5, duration:0.6}}
      className='w-6/12 h-full flex justify-center items-center'><img src={loginsvg2} className='animate-bounceRoleSelect'></img></motion.div>
      <div className='w-6/12 h-full flex justify-center items-center bg-[#516BFB]'>
      <motion.div 
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.4}}
      className="w-[67%] px-6 py-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Choose a Role</h2>
        <div className="flex justify-center mb-4">
          {/* Buyer Role Card */}
          <div
            className={`w-40 h-32 flex justify-center items-center border border-buttonColor rounded-lg p-6 mr-4 cursor-pointer transform transition ease-linear duration-300 ${
              selectedRole === 'buyer' ? 'bg-green-200/90 border-green-600 scale-105' : ''
            }`}
            onClick={() => handleRoleClick('buyer')}
          >
            {selectedRole === 'buyer' && (
              <img className="absolute top-2 right-2 w-6 h-6" src={yes}>
              </img>
            )}
            {/* <img src={Buyer} className=' w-[152px] h-28'></img> */}
            {/* <svg className="w-6 h-6 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9l4-4 4 4m-4-4v14"/>
            </svg> */}
            <div className="text-black text-xl font-bold text-center">Buyer</div>
          </div>

          {/* Seller Role Card */}
          <div
            className={`w-40 h-32 flex justify-center items-center border border-buttonColor rounded-lg p-6 cursor-pointer transform ease-linear transition duration-300 ${
              selectedRole === 'seller' ? 'bg-green-200/90 border-green-600 scale-105' : ''
            }`}
            onClick={() => handleRoleClick('seller')}
          >
            {selectedRole === 'seller' && (
              <img className="absolute top-2 right-2 w-6 h-6" src={yes}>
              </img>
            )}
            {/* <img src={Buyer} className='w-[152px] h-28'></img> */}
            <div className="text-black text-xl font-bold text-center">Seller</div>
          </div>
        </div>
          <button
            className="w-full py-2 mt-4 bg-buttonColor text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            onClick={handleClick}
          >
            Let's proceed
          </button>
      </motion.div>
      </div>
    </div>
  );
};



export default Roleselect
