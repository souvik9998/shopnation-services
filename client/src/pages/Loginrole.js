import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../components/context';
const Loginrole = () => {
    const navigate = useNavigate();
    const{authorizationMessage,setAuthorizationMessage} = useGlobalContext();
  return (
    <>
        
        <div className='w-screen h-screen bg-buttonColor flex flex-col justify-center items-center gap-2 font-Inter'>
            <div><button className='w-72 h-10 font-semibold bg-white rounded-md text-buttonColor' onClick={()=>navigate('/loginpage')}>Login as a buyer</button></div>
            <div className='font-semibold text-white text-lg'>or</div>
            <div><button className='w-72 h-10 font-semibold bg-white rounded-md text-buttonColor' onClick={()=>navigate('/seller-loginpage')}>Login as a seller</button></div>
            <div className="mt-6 text-center text-sm text-white">
            Not a member?{' '}
            <Link to='/Roleselect'><div className="font-semibold leading-6 text-white ">
              Create account
            </div>
            </Link>
          </div>
        </div> 
    </>
  )
}

export default Loginrole;
