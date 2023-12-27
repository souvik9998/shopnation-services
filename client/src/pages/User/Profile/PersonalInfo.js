import React,{useState} from 'react'
import { useGlobalContext } from '../../../components/context'
import axios from 'axios';
import { baseUrl } from '../../../config/config';
import { useNavigate } from 'react-router-dom';
import profileImage from "../../../Images/836.jpg"
import cart from '../../../Images/cart.svg'
import wishlist from '../../../Images/wishlist.svg'
import order from '../../../Images/order.svg'
import payment from '../../../Images/payment.svg'
const PersonalInfo = () => {
  const {user,setUser,shippingAddress} = useGlobalContext();
  const [nameEditing,setNameEditing] = useState(false);
  const [emailEditing,setEmailEditing] = useState(false);
  const [numberEditing,setNumberEditing] = useState(false);
  const [currentName,setCurrentName] = useState(user.userName);
  const [currentEmail,setCurrentEmail] = useState(user.email);
  const [currentNumber,setCurrentNumber] = useState(user.mobileNumber)
  const navigate = useNavigate();
  const handleChange =(e) =>{
    const {name,value} = e.target;
    setUser({
        ...user,
        [name] :value
    })
  }
  const handleUpdate = async(name,value)=>{
    try{
        const res = await axios.put(`https://${baseUrl}/userapi/auth/updateUser/${user.userId}`,{
            [name] : value
        });
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
  }
  return (
      <>
        <div className='hidden lg:flex flex-col gap-10 p-10 select-none'>
            <div className='flex flex-col gap-6'>
                <div className='flex gap-10 items-center'>
                    <div className='text-xl font-semibold'>Personal Information</div>
                    <div className='text-blue-600 font-semibold'>
                        {
                        (!nameEditing)?
                        <div onClick={()=>setNameEditing(true)}>Edit</div>:
                        <div onClick={()=>{
                            setNameEditing(false);
                            setUser({
                                ...user,
                                userName : currentName
                            })
                        }}>Cancel</div>
                        }</div>
                </div>
                    <div className='flex items-center gap-10'>
                        {
                            (!nameEditing)?
                            <input
                                value={user.userName}
                                name='userName'
                                readOnly
                                disabled
                             className='select-none cursor-default border border-slate-300  w-60 h-12 flex items-center px-2 text-slate-700/70 font-medium text-sm'>
                                
                            </input>:
                            <input
                            name='userName' 
                            value={user.userName}
                            onChange={handleChange}
                            className=' border border-slate-500 focus:outline-none active:outline-none w-60 h-12 flex items-center px-2'>
                            </input>
                        }
                        {
                            (nameEditing)?
                            <button onClick={()=>{
                                handleUpdate('user_name',user.userName);
                                setCurrentName(user.userName)
                                setNameEditing(false);
                            }}
                            disabled = {currentName === user.userName}
                            className={`w-fit h-12 flex items-center px-8 tracking-wide text-lg font-medium rounded-sm text-white ${(currentName === user.userName)?`bg-gray-400` : `bg-buttonColor`}`}>
                                Save</button>:
                            ''
                        }
                    </div>
                    
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex gap-10 items-center'>
                    <div className='text-xl font-semibold'>Email Address</div>
                    <div className='text-blue-600 font-semibold'>
                        {
                        (!emailEditing)?
                        <div onClick={()=>setEmailEditing(true)}>Edit</div>:
                        <div onClick={()=>{
                            setEmailEditing(false);
                            setUser({
                                ...user,
                                email : currentEmail
                            })
                        }}>Cancel</div>
                        }</div>
                </div>
                    <div className='flex items-center gap-10'>
                        {
                            (!emailEditing)?
                            <input
                                value={user.email}
                                name='email'
                                readOnly
                                disabled
                                className='select-none cursor-default border border-slate-300  w-60 h-12 flex items-center px-2 text-slate-700/70 font-medium text-sm'>
                                
                            </input>:
                            <input
                            name='email' 
                            value={user.email}
                            onChange={handleChange}
                            className=' border border-slate-500 focus:outline-none active:outline-none w-60 h-12 flex items-center px-2'>
                            </input>
                        }
                        {
                            (emailEditing)?
                            <button 
                            onClick={()=>{
                                handleUpdate('email',user.email);
                                setCurrentEmail(user.email);
                                setNameEditing(false);
                            }}
                            disabled = {currentEmail === user.email}
                            className={`w-fit h-12 flex items-center px-8 tracking-wide text-lg font-medium rounded-sm text-white ${(currentEmail === user.email)?`bg-gray-400` : `bg-buttonColor`}`}>
                                Save</button>:
                            ''
                        }
                    </div>
                    
            </div>
            <div className='flex flex-col gap-6'>
                <div className='flex gap-10 items-center'>
                    <div className='text-xl font-semibold'>Mobile Number</div>
                    <div className='text-blue-600 font-semibold'>
                        {
                        (!numberEditing)?
                        <div onClick={()=>setNumberEditing(true)}>Edit</div>:
                        <div onClick={()=>{
                            setNumberEditing(false);
                            setUser({
                                ...user,
                                mobileNumber : currentNumber
                            })
                        }}>Cancel</div>
                        }</div>
                </div>
                    <div className='flex items-center gap-10'>
                        {
                            (!numberEditing)?
                            <input
                                value={user.mobileNumber}
                                name='mobileNumber'
                                readOnly
                                disabled
                                className='select-none cursor-default border border-slate-300  w-60 h-12 flex items-center px-2 text-slate-700/70 font-medium text-sm'>
                                
                            </input>:
                            <input
                            name='mobileNumber' 
                            value={user.mobileNumber}
                            onChange={handleChange}
                            className=' border border-slate-500 focus:outline-none active:outline-none w-60 h-12 flex items-center px-2'>
                            </input>
                        }
                        {
                            (numberEditing)?
                            <button 
                            onClick={()=>{
                                handleUpdate('mobile_number',user.mobileNumber);
                                setCurrentNumber(user.mobileNumber);
                                setNumberEditing(false);
                            }}
                            disabled = {currentNumber === user.mobileNumber}
                            className={`w-fit h-12 flex items-center px-8 tracking-wide text-lg font-medium rounded-sm text-white ${(currentNumber === user.mobileNumber)?`bg-gray-400` : `bg-buttonColor`}`}>
                                Save</button>
                                :''
                        }    
                    </div>
                    
            </div>
            <div className='text-sm text-gray-600 mt-4 flex flex-col gap-2'>
                {/* FAQ 1: How can I change my name? */}
                <div className='mt-2'>
                <div className='text-base font-semibold text-gray-800'>
                    How can I change my name?
                </div>
                <div className='text-sm text-gray-500 mt-1 font-medium'>
                    To change your name, simply edit the input field above and click the "Save" button. Your new name will be updated in our records.
                </div>
                <div className='text-base font-semibold text-gray-800'>
                    Can I cancel the name change?
                </div>
                <div className='text-sm text-gray-500 mt-1 font-medium'>
                    Yes, you can cancel the name change by clicking the "Cancel" button. Your name will remain unchanged.
                </div>
                <div className='text-base font-semibold text-gray-800'>
                    Can I cancel the name change?
                </div>
                <div className='text-sm text-gray-500 mt-1 font-medium'>
                    Yes, you can cancel the name change by clicking the "Cancel" button. Your name will remain unchanged.
                </div>
            </div>
            </div>
        </div>
        <div className='font-Inter min-h-screen lg:hidden flex flex-col pb-1 py-2 px-3 rounded-md'>
        <div className='flex justify-between mb-1'>
            <div 
            onClick={()=>navigate(-1)}
            className='bg-gray-200/50 px-2 py-2 shadow-sm rounded-xl flex items-center justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            </div>
            <div className='flex gap-4'>
              <div
              onClick={()=>navigate("/mobile-search")}
               className=' px-2 py-2 bg-inherit rounded-lg flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>

              </div>
              <div 
              onClick={()=>navigate(`/user-cart/${user.userId}`)}
              className='bg-gray-200/50 px-2 py-2 shadow-sm rounded-xl flex items-center justify-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#6c6c6c" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            <div className='rounded-xl mt-2 px-4 py-8 flex gap-8 bg-white drop-shadow'>
                <div className=' border-2 rounded-full p-1 border-gray-200 object-contain '><img className="w-full h-full rounded-full" src={profileImage}></img></div>
                <div className='flex flex-col justify-center'>
                    <div className='text-gray-700 font-extrabold text-xl'>{user.userName}</div>
                    <div className='text-gray-400 font-semibold text-medium'>{user.email}</div>
                    <div className='text-gray-500 py-1 w-fit px-4 font-semibold text-sm bg-gray-200 rounded-xl shadow mt-4'>Change personal data</div>
                </div>
            </div>
            <div className='rounded-xl px-4 py-6 flex gap-4 bg-white drop-shadow'>
                <div className='flex flex-col gap-2 items-center justify-center w-[25%] '>
                    <div className='w-10 h-10'>
                        <img src={cart}></img>
                    </div>
                    <div className='text-gray-600 font-semibold text-xs'>cart</div>
                </div>
                <div className='flex flex-col gap-2 items-center justify-center w-[25%]'>
                    <div className='w-10 h-10'>
                        <img src={order}></img>
                    </div>
                    <div className='text-gray-600 font-semibold text-xs'>My Orders</div>
                </div>
                <div className='flex flex-col gap-2 items-center justify-center w-[25%]'>
                    <div className='w-10 h-10'>
                        <img src={wishlist}></img>
                    </div>
                    <div className='text-gray-600 font-semibold text-xs'>Wishlist</div>
                </div>
                <div className='flex flex-col gap-2 items-center justify-center w-[25%] '>
                    <div className='w-10 h-10'>
                        <img src={payment}></img>
                    </div>
                    <div className='text-gray-600 font-semibold text-xs'>Payments</div>
                </div>
            </div>
            <div className='rounded-xl px-4 py-3 flex flex-col gap-2 bg-white drop-shadow'>
                <div className='flex justify-between'>
                <div className='text-gray-700 font-bold text-lg tracking-wide'>Mange Addresses</div>
                
                </div>
                <div className={`cursor-default focus:outline-none capitalize w-full h-fit gap-1 flex flex-col lg:justify-center`}>
                    <div className='flex flex-col items-start text-start lg:flex-row gap-1'>
                        <div className='text-gray-500 font-bold text-xs lg:text-lg lg:font-semibold'>{shippingAddress.full_name}, PIN CODE: {shippingAddress.postal_code}</div>
                        <div className='text-gray-500 font-medium text-xs lg:text-base'>{shippingAddress.address_line1}</div>
                    </div>
                    <div className='text-gray-500 flex flex-col lg:flex-row font-medium text-start items-start text-xs lg:text-base'>
                        <div>{shippingAddress.city},{shippingAddress.state},{shippingAddress.country},{shippingAddress.mobile_number}</div>
                    </div>
                    
                </div>
                <div className='flex gap-4 mt-2 items-center'>  
                    <div className='text-gray-700 py-1 px-2 rounded-lg bg-gray-200 font-semibold text-xs'>Edit shipping addresses</div>
                    <div 
                    className='flex'>
                    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue" className="w-4 h-4 pb-[2px]">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                    </svg>
                    </div>
                    <div className='text-xs text-blue-600 font-bold'>Use current location</div>
                </div>
                </div>
                </div>
                <div className='rounded-xl px-4 py-3 flex flex-col gap-2 bg-white drop-shadow'>
                    <div className='text-gray-700 font-bold text-lg tracking-wide'>Account settings</div>
                    <div className=''>
                    <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Edit profile</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                        <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Saved Cards & Wallet</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                        <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Addresses</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                        <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Select Language</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                        
                        <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Notifications settings</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                    </div>
                    
                </div>
                <div className='rounded-xl px-4 py-3 flex flex-col gap-2 bg-white drop-shadow'>
                    <div className='text-gray-700 font-bold text-lg tracking-wide'>Feedback & Information</div>
                    <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Terms,Policies & Licences</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                        <div className='flex items-center'>
                        <div className='flex gap-3 items-center py-2 w-full'>
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                            </svg>
                            </div>
                            <div className='text-gray-600 font-medium'>Browse FAQs</div>
                        </div>
                        <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="gray" class="w-3 h-3">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                        </div>
                        </div>
                    </div>
                <div className='text-blue-600 font-semibold w-full py-2 text-center bg-white border-[1px] border-gray-200 te'>Log Out</div>
          </div>
          
        </div>
      </>
  )
}

export default PersonalInfo
