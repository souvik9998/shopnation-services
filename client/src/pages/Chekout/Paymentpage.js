import React, { useState } from 'react';
import { useGlobalContext } from '../../components/context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Paymentpage = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const {user,cartList,cartTotalPrice,setCartList,setIsLoading,defaultAddress,shippingAddress} = useGlobalContext();
  const userId = user.userId;
  const navigate = useNavigate();
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    if (selectedOption === 'razorpayUPI') {
      try{
        const totalAmount = cartTotalPrice;
        const {data:{key}} = await axios.get('http://localhost:7000/getApiKey');
        const response = await axios.post("http://localhost:7000/razorpayCheckout",{
          totalAmount : totalAmount
        })
        var options = {
          key, // Enter the Key ID generated from the Dashboard
          amount: response.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://www.pngwing.com/en/search?q=razorpay",
          order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: "http://localhost:7000/paymentVerification",
          prefill: {
              name: "Gaurav Kumar",
              email: "gaurav.kumar@example.com",
              contact: "9000090000"
          },
          notes: {
              address: "Razorpay Corporate Office"
          },
          theme: {
              color: "#3399cc"
          }
      };
      const razor = new window.Razorpay(options);
      razor.open();
      }
      catch(err){
        console.log(err);
      }
    } 
    else if (selectedOption === 'stripe') {
      console.log(cartList);
        try{
          const res = await axios.post("http://localhost:7000/create-checkout-session",{
            cartList: cartList,
            userId : userId,
            shippingAddress:shippingAddress
          })
          if(res.data.session.url){
            window.location = res.data.session.url;
          }
          setCartList(null);
        }
        catch(err){
          console.log(err);
      }
      }
      else if(selectedOption === 'cashOnDelivery'){
        setIsLoading(true);
        try{
          const res = await axios.post("http://localhost:7000/createCODOrder",{
            cartList: cartList,
            userId:userId,
            shippingAddress:shippingAddress
          })
          console.log(res);
          setCartList([]);
          setTimeout(()=>{
            setIsLoading(false);
          },1000)
          navigate('/checkout-success');
        }
        catch(err){
          console.log(err);
        }
        
      }
  };
  return (
    <>
    <div className="font-Inter">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className={`flex items-center w-full lg:h-16 h-10 font-medium rounded-md  px-4 text-sm lg:text-base ${
              selectedOption === 'razorpayUPI' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-gray-200 bg-gray-50'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="razorpayUPI"
              checked={selectedOption === 'razorpayUPI'}
              onChange={handleOptionChange}
              className="mr-2 "
            />
            UPI/Credit/Debit/ATM(RAZORPAY)
          </label>
        </div>
        <div className="mb-4">
          <label className={`flex items-center w-full lg:h-16 h-10 font-medium rounded-md  px-4 text-sm lg:text-base ${
              selectedOption === 'stripe' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-gray-200 bg-gray-50'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="stripe"
              checked={selectedOption === 'stripe'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Credit/Debit/ATM card(Stripe)
          </label>
        </div>
        <div className="mb-4">
          <label className={`flex items-center w-full lg:h-16 h-10 font-medium rounded-md  px-4 text-sm lg:text-base ${
              selectedOption === 'cashOnDelivery' ? 'bg-[#E8EBFF] border border-buttonColor' : 'border border-gray-200 bg-gray-50'
            }`}>
            <input
              type="radio"
              name="paymentOption"
              value="cashOnDelivery"
              checked={selectedOption === 'cashOnDelivery'}
              onChange={handleOptionChange}
              className="mr-2"
            />
            Cash on delivery
          </label>
        </div>
        <div className='lg:flex lg:justify-center'>
          {(selectedOption === 'cashOnDelivery')?
          <button
          type="submit"
          className="bg-buttonColor hover:bg-blue-700 text-white  font-normal leading-4 lg:font-medium  py-2 mt-4 px-6 lg:px-10 lg:py-3 text-lg rounded"
        >
          CONFIRM ORDER
        </button>:
        (selectedOption === 'stripe' || selectedOption === 'razorpayUPI')?
          <button
            type="submit"
            className="bg-buttonColor hover:bg-blue-700 text-white lg:tracking-wide font-normal leading-5 lg:font-medium py-2 mt-4 px-6 lg:px-10 lg:py-3 text-lg rounded"
          >
            PAY ₹{cartTotalPrice}
          </button>:
          ''
          }
        </div>
      </form>
    </div>
    </>
  );
};

export default Paymentpage;
