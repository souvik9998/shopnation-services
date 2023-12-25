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
  const {user,setUser} = useGlobalContext();
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
        <div className='font-Inter w-full h-full lg:hidden flex flex-col min-h-screen pb-1 pt-2 px-3 rounded-md'>
        <div className='flex justify-between mb-6'>
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
          <div className='flex flex-col gap-6'>
            <div className='text-gray-700 font-extrabold text-2xl tracking-wide'>My Profile</div>
            <div className='rounded-xl px-4 py-8 flex gap-8 bg-white drop-shadow'>
                <div className=' border-2 rounded-full p-1 border-gray-200 object-contain '><img className="w-full h-full rounded-full" src={profileImage}></img></div>
                <div className='flex flex-col justify-center'>
                    <div className='text-gray-700 font-extrabold text-xl'>{user.userName}</div>
                    <div className='text-gray-400 font-semibold text-medium'>{user.email}</div>
                    <div className='text-gray-500/80 py-1 w-fit px-4 font-bold text-sm bg-gray-200 rounded-xl shadow mt-4'>Change personal data</div>
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
          </div>
        </div>
      </>
  )
}

export default PersonalInfo
