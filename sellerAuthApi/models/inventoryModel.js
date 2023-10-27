const mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const schema =  new Schema({
    productId:{
        type:String,
        require:String
    },
    shopId:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    }

})

const inventoryModel =  mongoose.model("inventoryTable",schema);

module.exports =  inventoryModel;