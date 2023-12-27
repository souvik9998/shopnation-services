import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNavigation from './ProfileNavigation'
import { useGlobalContext } from '../../../components/context'
const ProfileLayout = () => {
  return (
    <>
      <div className='lg:min-w-screen h-fit lg:min-h-screen bg-gray-200/50 lg:bg-cardColor flex gap-10 justify-center items-start lg:p-10 overflow-auto'>
        <div className='lg:block hidden w-[20%] bg-white profileShadow'><ProfileNavigation/></div>
        <div className='w-full lg:w-7/12 h-fit lg:bg-white profileShadow overflow-auto'><Outlet /></div>
      </div>
    </>
  )
}

export default ProfileLayout
