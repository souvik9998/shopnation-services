import React,{useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/config";
const Buyerinfo = () => {
  const[user,setUser] = useState(
    {
      name:"",
      email:"",
      mobileNumber:"",
      password:"",
      confirmPassword:""
    }
  )
  const navigate = useNavigate();
  const handleChange = (e) =>{
    const { name,value} = e.target;
    setUser({
      ...user,
      [name] : value
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    return await axios
      .post(`https://${baseUrl}/userapi/auth/register`, user)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
    <div className="w-full h-full flex flex-col ">
      <div className="">
              <h2 className="lg:text-center mb-8 lg:mb-6 text-2xl lg:text-2xl font-semibold lg:font-bold leading-9 tracking-tight text-gray-700">
                  Create account
              </h2>
            </div>
            <div className="">
              <form action="" className="space-y-6">

                {/* name field */}

                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Name
                    </label>
                    <div className="mt-2">
                        <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" 
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"/>
                    </div>
                </div>

                {/* email field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                    </label>
                    <div className="mt-2">
                    <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" 
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
                    className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"
                    value={user.mobileNumber}
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
                    value={user.password}
                    onChange={handleChange}
                    />
                </div>
                </div>

                {/* confirm password field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm password
                    </label>
                    <div className="mt-2">
                        <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="outline-none block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400/80 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-buttonColor sm:text-sm sm:leading-6"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="flex py-2 px-4 items-center justify-center rounded-md bg-buttonColor text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    Sign up
                    </button>
                </div>
              </form>
              </div>
              </div>
    </>
  )
}

export default Buyerinfo
