import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileNavigation from './ProfileNavigation'
import { useGlobalContext } from '../../../components/context'
const ProfileLayout = () => {
  return (
    <>
      <div className='min-w-screen min-h-screen bg-cardColor flex gap-10 justify-center items-start p-10'>
        <div className='w-[20%] h- bg-white profileShadow'><ProfileNavigation/></div>
        <div className='w-7/12 h-fit bg-white profileShadow'><Outlet /></div>
      </div>
    </>
  )
}

export default ProfileLayout
