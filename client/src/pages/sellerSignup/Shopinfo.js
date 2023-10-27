import React from 'react'

const Shopinfo = ({sellerInfo,setSellerInfo}) => {
    const handleChange = (e) =>{
        const { name,value} = e.target;
        setSellerInfo({
          ...sellerInfo,
          [name] : value
        })
      }
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSellerInfo({
            ...sellerInfo,
            shopImage : file,
        })
      };
  return (
    <>
     <div className="">
            <h2 className="text-center mb-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Set up your shop
            </h2>
        </div>
              <div className="">
              <form action="" className="space-y-4">
                <div>
            <label htmlFor="email" className="block text-sm px-1 font-medium leading-6 text-gray-900">
                    Shop name
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="shopName"
                        placeholder="Shop name"
                        onChange={handleChange}
                        value={sellerInfo.shopName}
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm px-1 font-medium leading-6 text-gray-900">
                    Shop Type
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        name="shopType"
                        placeholder="Shop type"
                        onChange={handleChange}
                        value={sellerInfo.shopType}
                        
                        className=" outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        
                        />
                    </div>
                </div> 
                <div>
                    <label className="block text-sm px-1 font-medium leading-6 text-gray-900">
                    Upload your shop image
                    </label>
                    <div className="mt-2">
                        <input
                        type="file"
                        accept='image/*'
                        name="shopImage"
                        onChange={handleFileChange}
                        placeholder="Upload your shop image"
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        
                        />
                    </div>
                </div>
                </form>
            </div>
    </>
  )
}

export default Shopinfo
