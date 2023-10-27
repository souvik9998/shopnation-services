var mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var orderSchema = new Schema({
    productId:{
        type:String,
        required : true,
    },
    shippingAddress:{
        addressLine1:{
            type:String,
            required:true,
        },
        addressLine2:{
            type:String,
        },
        postalCode:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        mobileNumber:{
            type:String,
            required:true
        },
        fullName:{
            type:String,
            required:true
        }
    },
    productQuantity:{
        type:String,
        required:true
    },
    expectedDelivery:{
        type:String,
        required:true
    }
})
var orderModel =  mongoose.model('orderModel',orderSchema);
module.exports = orderModel;