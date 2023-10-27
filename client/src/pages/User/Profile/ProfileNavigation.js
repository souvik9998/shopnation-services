import React from 'react'
import { Link } from 'react-router-dom'
const ProfileNavigation = () => {
  return (
    <>
      <div className='font-Inter flex flex-col'>
        <div className='border-b border-slate-200 py-3 px-6 font-semibold text-xl'><div>Hello,</div><div>Customer</div></div>
        <div className='border-b border-slate-200 py-3'>
            <div className='flex gap-2 h-16 text-xl font-semibold text-slate-500 items-center px-6'>
                <div className=''><ion-icon style={{color: 'blue'}} name="person"></ion-icon></div>
                <div>Account Settings</div>
            </div>
            <div className='text-slate-700 text-base font-medium  flex flex-col
            '>
                <Link to='/user-profile'><div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Personal Info</div></Link>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>My orders</div>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Manage addresses</div>
            </div>
        </div>
        <div className='border-b border-slate-200 py-3'>
            <div className='flex gap-2 h-16 text-xl font-semibold text-slate-500 items-center px-6'>
                <div className='pt-1'><ion-icon style={{color: 'blue'}} name="save"></ion-icon></div>
                <div>Saved Info</div>
            </div>
            <div className='text-slate-700 text-base font-medium  flex flex-col
            '>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Saved shops</div>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Wishlist products</div>
            </div>
        </div>
        <div className='border-b border-slate-200 py-3'>
            <div className='flex gap-2 h-16 text-xl font-semibold text-slate-500 items-center px-6'>
                <div className='pt-1'><ion-icon style={{color: 'blue'}} name="wallet"></ion-icon></div>
                <div>Payment Info</div>
            </div>
            <div className='text-slate-700 text-base font-medium  flex flex-col
            '>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Saved cards</div>
                <div className='h-12 hover:bg-blue-200/20 px-[49px] hover:text-blue-600 flex items-center justify-start'>Gift cards</div>
            </div>
        </div>
        <div className='flex gap-2 h-16 text-xl font-semibold text-slate-500 items-center px-6'>
            <div className='pt-2'>
            <ion-icon style={{color: 'blue'}} name="power-sharp"></ion-icon>
            </div>
            <div>Logout</div>
        </div>
      </div>
    </>
  )
}

export default ProfileNavigation
