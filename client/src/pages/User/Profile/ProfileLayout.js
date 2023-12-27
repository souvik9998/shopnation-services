import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNavigation from './ProfileNavigation'
import { useGlobalContext } from '../../../components/context'
const ProfileLayout = () => {
  return (
    <>
      <div className='min-w-screen min-h-screen bg-gray-200/50 lg:bg-cardColor flex gap-10 justify-center items-start lg:p-10'>
        <div className='lg:block hidden w-[20%] bg-white profileShadow'><ProfileNavigation/></div>
        <div className='w-full lg:w-7/12 min-h-screen lg:bg-white profileShadow'><Outlet /></div>
      </div>
    </>
  )
}

export default ProfileLayout
