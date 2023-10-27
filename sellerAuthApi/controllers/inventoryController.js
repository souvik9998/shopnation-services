const InventoryModel =  require('../models/inventoryModel');
const AppError = require('../utils/appError');
// middlewares-
exports.getQuant = async (req,res,next)=>{
    try {
        const {productId} =  req.query;
        console.log(productId);
        const filter = {productId : productId};
        const result = await InventoryModel.findOne(filter);
        if(result)
            res.send(result);
        else
            throw new AppError('product does not exists',401);
    } catch (error) {
        next(error);
    }
}

exports.addItem = async (req,res,next)=>{
    try {
        const newInventoryItem = new InventoryModel({
          productId: req.body.productId,
          shopId: req.body.shopId,
          quantity: req.body.quantity,
        });
    
        await newInventoryItem.save();
    
        res.status(201).json({ message: 'Product data stored in inventory successfully' });
      } catch (error) {
        console.error('Error storing product data in inventory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.updateInventory = async (req, res, next) => {
    try {
      const productId = req.body.productId;
      const purchasedQuantity = req.body.productQuantity;

      const inventoryItem = await InventoryModel.findOne({ productId });
  
      if (!inventoryItem) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      inventoryItem.quantity -= purchasedQuantity;
  
      // Save the updated inventory item
      await inventoryItem.save();
  
      res.status(200).json({ message: 'Quantity updated successfully', updatedInventoryItem: inventoryItem });
    } catch (error) {
      next(error);
    }
  };


