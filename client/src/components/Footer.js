import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-navColor text-white font-Inter h-fit pt-6 lg:block hidden">
      <div className="flex justify-around">
        <div className="flex w-7/12 justify-around">
            <div className='flex flex-col gap-2'>
            <div className='text-xs text-slate-300'>About</div>
            <div className='text-sm flex flex-col gap-1'>
                <div>Contact us</div>
                <div>About us</div>
                <div>More information</div>
            </div>
            </div>
            <div className='flex flex-col gap-2'>
            <div className='text-xs text-slate-300'>Help</div>
            <div className='text-sm flex flex-col gap-1'>
                <div>Payment</div>
                <div>Shipping</div>
                <div>Cancellation & returns</div>
                <div>FAQ</div>
                <div>Report</div>    
            </div>
            </div>
            <div className='flex flex-col gap-2'>
            <div className='text-xs text-slate-300'>Social</div>
            <div className='text-sm flex flex-col gap-1'>
                <div>Facebook</div>
                <div>Twitter</div>
                <div>Instagram</div>
                <div>Linkedin</div>
            </div>
            </div>
        </div>
        <div className='w-[1px] bg-slate-400 h-32'></div>
        <div className="text-sm flex  flex-col gap-1">
            <p>Address:1234 Elm Street,</p>
            <p>Suite 567,Cityville,</p> 
            <p>Statehood,Countryland,78901</p>
          <p>Email: contact@example.com</p>
          <p>Phone: +917001090471</p>
        </div>
      </div>
      <div className="h-10 w-full border-t-[0.5px] mt-2 border-slate-300">
        <div className='flex justify-around pt-2 text-yellow-200 font-bold text-sm'>
            <div><Link to='/seller-signup'>Become a seller</Link></div>
            <div>Advertise</div>
            <div>@2023-2050 ecommerce.com</div>
            <div>Made by - Souvik & Kokonod</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;