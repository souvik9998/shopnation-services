import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/context';
import { baseUrl } from '../../config/config';
const Addressform = ({onClose}) => {
  // const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  
  const {userAddress,setUserAddress,user} = useGlobalContext();
  const userId = user.userId;
  const [formData, setFormData] = useState({
    userId : userId,
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobileNumber:'',
    isDefault : false
  });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    return await axios
    .post(`https://${baseUrl}/userapi/address/addAddress`,formData)
    .then((res) =>{
      console.log(res);
      const updatedUserAddress = [...userAddress,res.data.address];
      setUserAddress(updatedUserAddress);
      onClose();
    })
    .catch((err)=>{
      console.log(err);
    })
  };

  return (
    <div className="font-Inter w-full mx-auto">
      <h2 className="text-base font-semibold mb-3 lg:text-2xl lg:font-bold lg:mb-6">Shipping Address</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1 lg:mb-3">
          <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            className="appearance-none border rounded text-xs lg:text-base w-full h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-1 lg:mb-3">
          <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="addressLine1">
            Address Line 1
          </label>
          <input
            className="appearance-none border rounded text-xs lg:text-base w-full h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="addressLine1"
            name="addressLine1"
            type="text"
            value={formData.addressLine1}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-1 lg:mb-3">
          <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="addressLine2">
            Address Line 2
          </label>
          <input
            className="appearance-none border rounded text-xs lg:text-base w-full h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="addressLine2"
            name="addressLine2"
            type="text"
            value={formData.addressLine2}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-1 lg:mb-3">
          <div>
            <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="city">
              City
            </label>
            <input
              className="appearance-none border rounded w-full text-xs lg:text-base h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="state">
              State
            </label>
            <input
              className="appearance-none border rounded w-full text-xs lg:text-base h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-1 lg:mb-3">
          <div>
            <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              className="appearance-none border rounded w-full text-xs lg:text-base h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="country">
              Country
            </label>
            <input
              className="appearance-none border rounded w-full text-xs lg:text-base h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 lg:mb-3 col-span-2">
          <label className="block text-gray-700 font-medium text-sm lg:text-base mb-1 lg:font-bold lg:mb-2" htmlFor="mobileNumber">
            Mobile Number
          </label>
          <input
            className="appearance-none border rounded w-full text-xs lg:text-base h-6 lg:h-9 py-2 px-1 lg:px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="mobileNumber"
            name="mobileNumber"
            type="text"
            value={formData.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold lg:font-bold py-1 lg:py-2 px-2 text-sm lg:text-base lg:px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addressform;
