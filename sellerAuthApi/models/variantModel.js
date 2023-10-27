var mongoose =  require('mongoose');
const Schema = mongoose.Schema;
const variantSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
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
    variantName:{
        type: String,
    },
    variantType:{
        type: String,
    },
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
        default:'variant'
    },
    mainImage:{
        data:Buffer,
        contentType:String,
    },
    productImages:[{
        data:Buffer,
        contentType:String
    }],
    size:{
        type:String
    }
})
var variantModel =  mongoose.model('variantModel',variantSchema);
module.exports = variantModel;