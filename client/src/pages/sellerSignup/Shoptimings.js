import React from 'react'

const Shoptimings = ({sellerInfo,setSellerInfo}) => {
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setSellerInfo({
      ...sellerInfo,
      shopTimings:{
        ...sellerInfo.shopTimings,
        [name] : value
      }
  })
}
  return (
    <>
     <div className="">
            <h2 className="text-center mb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Give your shop hours
            </h2>
            </div>
              <div className="">
              <form action="" className="space-y-4">


                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                        Opening time
                    </label>
                    <div className="mt-2">
                        <input type="text" name="openingTime" value={sellerInfo.shopTimings.openingTime} onChange={handleChange} placeholder="Opening Time" 
                        className="outline-none block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                <div>
                    <label  className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                        Closing Time
                    </label>
                    <div className="mt-2">
                    <input type="text" name="closingTime" value={sellerInfo.shopTimings.closingTime} onChange={handleChange} placeholder="Closing Time" 
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>
                <div>
                    <label  className="block text-sm font-medium leading-6 text-gray-900 pl-1">
                        Opening Days
                    </label>
                    <div className="mt-2">
                    <input type="text" name="openDays" value={sellerInfo.shopTimings.openDays} onChange={handleChange} placeholder="Opening Days" 
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                </div>
                </div>
                </form>
                </div>
    </>
  )
}
export default Shoptimings
