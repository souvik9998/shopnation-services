import React from 'react'
import animationData from '../Images/GreenAnimation.json';
import Lottie from 'lottie-react';
const Animation = () => {
  return (
    <>
      <div className='w-52 h-52 bg-cardColor border border-black'><Lottie 
      loop = {false}
      animationData={animationData}/></div>
    </>
  )
}

export default Animation
