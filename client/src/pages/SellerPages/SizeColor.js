import React from 'react'

const SizeColor = () => {
  return (
    <>
     <div>
        <div>add size color</div>
          <div className='flex'>
            <div className='flex flex-col gap-2'>
              <div>Size</div>
                <input
                  type='text'
                  name='size'
                  
                />
            </div>
            <div className='flex flex-col gap-2'>
              <div>Size</div>
                <input
                  type='text'
                  name='color'

                />

            </div>
            <div className='flex flex-col gap-2'>
              <div>Size</div>
              <div>
                <input
                  type='text'
                  name='productPrice'

                />
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Size</div>
              <div>
                <input
                  type='text'
                  name='size'

                />
              </div>
            </div>
            
          </div>
          

        </div> 
    </>
  )
}

export default SizeColor
