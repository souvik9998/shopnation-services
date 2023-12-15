import React,{useState} from "react";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Personalinfo = ({sellerInfo,setSellerInfo}) => {
  const navigate = useNavigate();
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setSellerInfo({
      ...sellerInfo,
      [name] : value
    })
  }
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   return await axios
  //     .post('http://localhost:9000/auth/register', user)
  //     .then((response) => {
  //       console.log(response);
  //       navigate("/login");
  //     })
  //     .catch((err) => console.log(err));
  // }
  return (
    <>
        
            <div className="">
            <h2 className="lg:text-center mb-6 text-xl lg:text-2xl font-semibold lg:font-bold leading-9 tracking-tight text-gray-700">
                Give your personal info
            </h2>
            </div>
              <div className="">
              <form action="" className="space-y-4">

                {/* name field */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input type="text" name="name" value={sellerInfo.name} onChange={handleChange} placeholder="Name" 
                        className="outline-none block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-1 ring-gray-400/80 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                {/* email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                    <input type="email" name="email" value={sellerInfo.email} onChange={handleChange} placeholder="Email" 
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"/>
                </div>
                </div>

                {/* mobile number field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Mobile number</label>
                    <div className="mt-2">

                    <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    className=" outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"
                    value={sellerInfo.mobileNumber}
                    onChange={handleChange}
                    />
                </div>
                </div>

                {/* password field */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                    </label>
                    <div className="mt-2">
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"
                    value={sellerInfo.password}
                    onChange={handleChange}
                    />
                </div>
                </div>

                {/* confirm password field */}
                <div>
                    <label htmlFor="email" className="block text-sm px-1 font-medium leading-6 text-gray-900">
                    Confirm password
                    </label>
                    <div className="mt-2">
                        <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"
                        value={sellerInfo.confirmPassword}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                {/* <div>
                    <button
                        onClick={handleSubmit}
                        className="flex w-full justify-center rounded-md bg-buttonColor px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div> */}
              </form>
            </div>
    </>
  );
};


export default Personalinfo
