import express from 'express';
import { instance } from '../server.js';
import crypto from 'crypto';

let order_id;
const router = express.Router();

router.post('/razorpayCheckout', async(req,res) =>{
    const {totalAmount} = req.body;
    // const items = cartList.map(item => {
    //     return {
    //       name: item.productName,
    //       quantity: item.quantity,
    //       amount: item.productAmount * 100, // Amount should be in paise (Indian currency)
    //       currency: 'INR',
    //       // You can also include other item details like image, SKU, etc. if needed
    //     };
    // })
    try{
       
        const options = {
            amount: totalAmount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11",
        };
        const order = await instance.orders.create(options)
        order_id = order.id;
        console.log(order);
        res.status(200).json({msg:'successfully created',order})
    }  
    catch(err){
        res.status(500).json({err: err.message});
    }
});

router.post("/paymentVerification" ,async(req,res) =>{
    console.log(req.body);
    const{razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;
    const body = order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.redirect(`http://localhost:3000/checkout-success?reference=${razorpay_payment_id}`)
    }
    else{
        res.status(400).json({msg:'payment failed'})
    }
})
export default router;