import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import db from '../utils/SqlConnection.js';
import axios from 'axios';
dotenv.config();
const baseUrl = "shopnation.co.in"
const router = express.Router();
const stripe = new Stripe(process.env.SECRET_KEY)
const endpointSecret = "whsec_1b8b9984a1469b8f891adea098eacfcce4ab37161d4a37b227a2d35c8a1b3d3c";

router.post('/webhook', express.raw({type: 'application/json'}) , async(request, response) => {
  const payload = request.body;
  const payloadString = JSON.stringify(payload, null, 2);
  // console.log(payloadString);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });
  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
    console.log("webhook verified")
  } catch (err) {
    console.log(`webhook error ${err.message}`)
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      break;
      case 'checkout.session.completed': {
        const session = event.data.object;
        const customer = await stripe.customers.retrieve(session.customer);
        console.log(customer);
        // console.log(session);
        // Save an order in your database, marked as 'awaiting payment'
        // createOrder(session);
        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === 'paid') {
          fulfillOrder(session,customer);
        }
  
        break;
      }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.status(200).end();
});
router.post("/create-checkout-session", async(req, res) => {
  console.log(req.body.cartList);
  const shippingAddress = req.body.shippingAddress;
  const cartProduct = req.body.cartList.map((item) =>{
    return {
      productId : item.productId,
      productPrice : item.productAmount,
      productQuantity : item.quantity,
      expectedDelivery : item.expectedDelivery,
    }
  })
  const customer = await stripe.customers.create({
    metadata : { 
      userId : req.body.userId, 
      productList : JSON.stringify(cartProduct),

    }
  })
  const userId = req.body.userId;
  const line_items = req.body.cartList.map((item) =>{
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.productAmount * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer:customer.id,
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });
  console.log(session);
  createPaymentEvent(session.id,customer);
  res.send({session});
});

const createPaymentEvent = async(id,customer) =>{
    try{

      const query = 'INSERT INTO user_payment_event SET ?';
      const values = {
        checkout_id: id,
        user_id: customer.metadata.userId,
        provider: 'stripe',
        payment_status: 'not paid',
        created_at: new Date(), // Insert the current date and time
        modified_at: new Date() // Insert the current date and time
      };

      await db.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting payment event:', error);
          // Handle the error
        } else {
          console.log('Payment event inserted successfully:');
          // Handle the success
        }
      });
    }
    catch(err){
      console.log(err);
    }
} 
 
const fulfillOrder = (session, customer) => {
  return new Promise(async (resolve, reject) => {
    const createTime = new Date();
    const productList = JSON.parse(customer.metadata.productList);
    console.log(productList);

    try {
      const shippingAddress = session.shipping;
      await insertIntoPaymentDetails(session, createTime);
      await updateUserPaymentEvent(session, createTime);
      const orderTableValues = await insertIntoOrderDetails(session, customer, createTime);
      await updatePaymentDetails(session, orderTableValues);
      await deleteFromCart(customer.metadata.userId);
      await insertOrderItems(productList, orderTableValues.id, createTime);
      await updateInventoryOnInventoryServer(productList);
      await addOrder(productList,shippingAddress);
      console.log('payment order created');
      resolve(orderTableValues.id); // Resolve with the orderId
    } catch (err) {
      console.log(err);
      reject(err); // Reject with the error
    }
  });
};

const insertIntoPaymentDetails = async (session, createTime) => {
  await db.query('insert into payment_details set ?',
    {
      payment_id: session.payment_intent,
      total_price: session.amount_total / 100,
      currency: session.currency,
      checkout_id: session.id,
      payment_status: session.payment_status,
      payment_method: session.payment_method_types[0],
      created_at: createTime,
      modified_at: createTime
    });
};

const updateUserPaymentEvent = async (session, createTime) => {
  await db.query('update user_payment_event set payment_status = ?, modified_at = ? where checkout_id = ?',
    [session.payment_status, createTime, session.id]);
};

const insertIntoOrderDetails = async (session, customer, createTime) => {
  const orderTableValues = {
    id: uuidv4(),
    user_id: customer.metadata.userId,
    payment_id: session.payment_intent,
    total_price: session.amount_total / 100,
    created_at: createTime,
    modified_at: createTime
  };
  await db.query('insert into order_details set ?', orderTableValues);
  return orderTableValues;
};

const updatePaymentDetails = async (session, orderTableValues) => {
  await db.query('update payment_details set order_id = ? where checkout_id = ?',
    [orderTableValues.id, session.id]);
};

const deleteFromCart = async (userId) => {
  await db.query('delete from cart where user_id = ?', userId);
};

const insertOrderItems = async (productList, orderId, createTime) => {
  for (const item of productList) {
    const orderItemValues = {
      id: uuidv4(),
      order_id: orderId,
      product_id: item.productId,
      quantity: item.productQuantity,
      price: item.productPrice,
      expected_delivery : item.expectedDelivery,
      created_at: createTime,
      modified_at: createTime
    };
    await db.query('insert into order_items set ?', orderItemValues);
    console.log('successfully added order items');
  }
};

router.post("/createCODorder",async(req,res)=>{
  try{
    const createTime = new Date();
    const userId = req.body.userId;
    const cartList = req.body.cartList;
    const shippingAddress = req.body.shippingAddress;
    const cartTotal = cartList.reduce((cartTotal,item) =>{
      return item.product_amount + cartTotal;
    })
    console.log(cartTotal);
    const productList = req.body.cartList.map((item) =>{
      return {
        productId : item.product_id,
        productPrice : item.product_amount,
        productQuantity : item.quantity,
        expectedDelivery : item.expected_delivery,
      }
    })
    await createCODsession(userId,createTime);
    const orderId = await insertCODOrderDetails(userId,createTime,cartTotal);
    await deleteFromCart(userId);
    await insertCODOrderItems(cartList,orderId,createTime);
    await updateInventoryOnInventoryServer(productList);
    await addCODOrder(productList,shippingAddress);
    res.status(200).json({msg:'order done'});
  }
  catch(err){
    res.status(500).json({msg:err.message});
  }
})

const createCODsession = async(userId,createTime) =>{
  try{

    const query = 'INSERT INTO user_payment_event SET ?';
    const values = {
      checkout_id: uuidv4(),
      user_id: userId,
      provider: 'COD',
      payment_status: 'not paid',
      created_at: createTime,
      modified_at: createTime 
    };

    await db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting payment event:', error);
      } else {
        console.log('Payment event inserted successfully:');
      }
    });
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:err.message});
  }
} 
const insertCODOrderDetails = async (userId, createTime,cartTotal) => {
  try{
      const orderTableValues = {
      id: uuidv4(),
      user_id: userId,
      payment_id: 'not-paid',
      total_price: cartTotal,
      created_at: createTime,
      modified_at: createTime
    };
    await db.query('insert into order_details set ?', orderTableValues,(err,res)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log('added order details');
      }
    });
    return orderTableValues.id;
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:err.message});
  }
};

const insertCODOrderItems = async (cartList, orderId, createTime) => {
  try {
    for (const item of cartList) {
      const orderItemValues = {
        id: uuidv4(),
        order_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_amount,
        expected_delivery: item.expected_delivery,
        created_at: createTime,
        modified_at: createTime,
      };
        await db.query('insert into order_items set ?', orderItemValues,(err,res)=>{
          if(err){
            console.log(err);
          }
          else{
            console.log('Successfully added order items');
          }
        });
    }
  } catch (err) {
    console.error('Error processing order items:', err);
    res.status(500).json({ msg: err.message });
  }
};


const updateInventoryOnInventoryServer = async(productList) => {
  try {
    const inventoryServerURL = `https://${baseUrl}/sellerapi/inventory/updateInventory`;
    const productPromises =  productList.map(async(item) => {
      try{
        const data = {
          productId : item.productId,
          productQuantity : item.productQuantity
        }
        const res = await axios.post(inventoryServerURL, data);
        return res;
      } 
      catch(err){
        console.log(err);
        throw err;
      }  

    })
    const res = await Promise.all(productPromises);
    console.log(res);
  } catch (error) {
    console.error('Error updating inventory:', error);
    throw error;
  }
};

const addCODOrder = async(productList,shippingAddress)=>{
  try{
    const res = await axios.post(`https://${baseUrl}/sellerapi/order/addOrder`,{productList,shippingAddress});
    console.log(res);
  }
  catch(err){
    console.log(err);
  }
}
const addOrder = async(productList,shippingAddress)=>{
  try{
    console.log(shippingAddress);
    const shippingAddress = {
      
    }
    const res = await axios.post(`https://${baseUrl}/sellerapi/order/addOrder`,{productList,shippingAddress});
    console.log(res);
  }
  catch(err){
    console.log(err);
  }
}
export default router;