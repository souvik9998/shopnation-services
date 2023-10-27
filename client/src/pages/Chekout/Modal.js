import React from 'react'
import { createPortal } from 'react-dom'

const Modal = ({open,onClose,children}) => {
  if(!open) return null
  return (
    <>
    {createPortal(
      <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)] z-50'>
        <div className='w-9/12 lg:w-4/12 h-auto fixed top-1/2 left-1/2 bg-white transform translate-x-[-50%] translate-y-[-50%] px-3 lg:px-6 py-3 lg:py-6 rounded-md z-50'>
          <button className='absolute top-0 right-0 text-xl font-extrabold'onClick={onClose}><ion-icon name="close-circle-outline"></ion-icon></button>
          {children}
        </div>
      </div>,
      document.body
      )}
    </>
  )
}

export default Modal
