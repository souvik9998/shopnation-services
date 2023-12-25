import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../components/context';
import { baseUrl } from '../../config/config';
const Addressform = ({onClose}) => {
  // const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
  const googleMapsApiKey = "AIzaSyA2MdzCX0FZ9mROKcw4Kw2n_I4XSm2hujU"
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
  const handleAddCurrentLocation = () => {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
            );

            if (response.data.results.length > 0) {
              const addressDetails = response.data.results[0].address_components;

              // Update form fields with obtained address details
              setFormData({
                ...formData,
                addressLine1: addressDetails[0]?.long_name || '',
                addressLine2: addressDetails[1]?.long_name || '',
                city: addressDetails[2]?.long_name || '',
                state: addressDetails[4]?.long_name || '',
                postalCode: addressDetails[6]?.long_name || '',
                country: addressDetails[5]?.long_name || '',
              });
            } else {
              console.error('No address details found');
            }
          } catch (error) {
            console.error('Error fetching address details:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
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
      
        <div className='flex justify-between items-center'>
        <div className="text-base font-semibold mb-5 lg:text-2xl lg:font-bold lg:mb-6">Shipping address</div>
        
        </div>
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
        <div className='flex justify-between items-center'>
          <div
          className="bg-buttonColor hover:bg-blue-700 text-white font-semibold lg:font-bold py-1 lg:py-2 px-2 text-sm lg:text-base lg:px-4 rounded"
          type="submit"
        >
          Submit
        </div>
        <div
        onClick={handleAddCurrentLocation} 
        className='flex gap-1 py-2 '>
          <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-4 h-4 pb-[2px]">
            <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
          </svg>
          </div>
          <div className='text-xs text-blue-600 font-bold'>Use current location</div>
        </div>
        </div>
        
      </form>
    </div>
  );
};

export default Addressform;
