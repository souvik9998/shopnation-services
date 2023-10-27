import React from 'react'

const Otherinfo = ({sellerInfo,setSellerInfo}) => {
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setSellerInfo({
      ...sellerInfo,
      shopAddress:{
        ...sellerInfo.shopAddress,
        [name] : value
      }
  })
}
  return (
    <>
     <div className="">
            <h2 className="text-center mb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Give your shop address
            </h2>
            </div>
              <div className="">
              <form action="" className="space-y-4">

                {/* name field */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                        Address line 1
                    </label>
                    <div className="mt-2">
                        <input type="text" name="addressLine1" value={sellerInfo.shopAddress.addressLine1} onChange={handleChange} placeholder="Address Line 1" 
                        className="outline-none block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                {/* email field */}
                <div>
                    <label  className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                        Address line 2
                    </label>
                    <div className="mt-2">
                    <input type="text" name="addressLine2" value={sellerInfo.shopAddress.addressLine2} onChange={handleChange} placeholder="Address Line 2" 
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>

                {/* mobile number field */}
                <div className='flex justify-between'>
                  <div>
                    <label  className="block text-sm font-medium leading-6 text-gray-900 pl-1">City</label>
                    <div className="mt-2">

                    <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className=" outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={sellerInfo.shopAddress.city}
                    onChange={handleChange}
                    />
                </div>
                </div>

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                    State
                    </label>
                    <div className="mt-2">
                    <input
                    type="text"
                    name="state"
                    placeholder="State"
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={sellerInfo.shopAddress.state}
                    onChange={handleChange}
                    />
                  </div>
                  </div>
                </div>
                

                {/* password field */}

                
                

                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                    Country
                    </label>
                    <div className="mt-2">
                    <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={sellerInfo.shopAddress.country}
                    onChange={handleChange}
                    />
                </div>
                </div>

                {/* confirm password field */}
                <div>
                    <label className="block text-sm px-1 font-medium leading-6 text-gray-900">
                    Postal code
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal code"
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={sellerInfo.shopAddress.postalCode}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                </form>
                </div>
    </>
  )
}

export default Otherinfo
