const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authController = require('../controllers/authControllers');

const protect =  authController.protectRoutes;
router.get('/getQuant',protect,inventoryController.getQuant);
router.post('/add',protect,inventoryController.addItem);
router.post('/updateInventory',inventoryController.updateInventory);


module.exports = router;