import React,{useState} from 'react'
import { useGlobalContext } from '../../../components/context'
import axios from 'axios';
import { baseUrl } from '../../../config/config';
const PersonalInfo = () => {
  const {user,setUser} = useGlobalContext();
  const [nameEditing,setNameEditing] = useState(false);
  const [emailEditing,setEmailEditing] = useState(false);
  const [numberEditing,setNumberEditing] = useState(false);
  const [currentName,setCurrentName] = useState(user.userName);
  const [currentEmail,setCurrentEmail] = useState(user.email);
  const [currentNumber,setCurrentNumber] = useState(user.mobileNumber)
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
        <div className='flex flex-col gap-10 p-10 select-none'>
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
      </>
  )
}

export default PersonalInfo
