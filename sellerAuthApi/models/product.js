var mongoose =  require('mongoose');
const Schema = mongoose.Schema;
var productSchema = new Schema({
    shopId: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    mainImage:{
        url: String,
        contentType: String,
        // required:true
    },
    variantName:{
        type: String,
    },
    variantType:{
        type: String,
    },
    productImages:[{
        url: String,
        contentType: String,
    }],
    productDescription:{
        type : String,
        required:true
    },
    productAmount: {
        weight: {
            type: String, // in KG
        },
        amount: {
            type: String, // or in pieces
        }
    },
    productPrice: {
        type: String,
        required:true
    },
    expectedDelivery: {
        type: String,
    },
    discount: {
        type: Number 
    },
    brand: {
        type: String 
    },
    category: {
        type: String 
    },
    material: {
        type: String 
    },
    isAvailable: {
        type: Boolean, 
        default: true,
        // required: true
    },
    countryOfOrigin: {
        type: String 
    },
    dimensions: {
        length: {
            type: Number
        },
        width: {
            type: Number // Add product width field (e.g., for furniture, appliances, etc.)
        },
        height: {
            type: Number // Add product height field (e.g., for furniture, appliances, etc.)
        }
    },
    rating: {
        type: Number, // Add product rating field (e.g., for reviews)
        default: 0
    },
    gender:{
        type:String
    },
    productType:{
        type:String,
        default:'main'
    },
    size:{
        type:String,
    },
    variant:[{
        variantId:{
            type:String,
            required:true
        },
        variantType:{
            type:String,
        },
        variantName:{
            type:String,
        },
        variantImage:{
            url:String,
            contentType: String,
        },
        size:{
            type:String,
        }
    }]
});

var productModel =  mongoose.model('productModel',productSchema);
module.exports = productModel;