require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");
const orderModel = require("../models/orderModel");


router.post('/addOrder',async (req, res) => {
  try {
    const { productList, shippingAddress } = req.body;
    console.log(shippingAddress);
    const productPromises = productList.map(async (item) => {
      try {
        const newOrderItem = new orderModel({
          productId: item.productId,
          productQuantity: item.productQuantity,
          expectedDelivery: item.expectedDelivery,
          shippingAddress: {
            addressLine1: shippingAddress.address_line1,
            addressLine2: shippingAddress.address_line2,
            city: shippingAddress.city,
            country: shippingAddress.country,
            postalCode: shippingAddress.postal_code,
            mobileNumber: shippingAddress.mobile_number,
            fullName: shippingAddress.full_name,
            state : shippingAddress.state
          },
        });
        await newOrderItem.save();
      } catch (error) {
        console.error('Error saving order item:', error);
      }
    });

    await Promise.all(productPromises);

    res.status(201).json({ message: 'Product data stored in orderdata successfully' });
  } catch (error) {
    console.error('Error storing product data in order data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;