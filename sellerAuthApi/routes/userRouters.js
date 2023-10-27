const express = require("express");
const authController =  require('../controllers/authControllers');

const router =  express.Router();

router.post('/signUp',authController.signup);
router.post('/logIn',authController.login);
router.get('/getSellerInfo/:shopId',authController.getSellerInfo);
router.get('/protect',authController.protectRoutes);
module.exports =  router;