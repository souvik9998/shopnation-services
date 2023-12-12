require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var multer = require("multer");
var path = require("path");
var authController = require("../controllers/authControllers");
const fs = require('fs');
const productModel = require("../models/product");
const variantModel = require("../models/variantModel");
const inventoryModel = require("../models/inventoryModel");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
// mongoose.connect(process.env.MONGO_URL,{useNewUrlParser :  true},mongoose.set('strictQuery',true)).then(()=>{
//     console.log("connected");}).catch((err)=>{console.log(err);})

//Image File Storage
// const Storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Retrieve the shopName from the request body
//     const shopId = req.body.shopId;

//     // Construct the destination path with the shopName
//     const destinationPath = `public/assets/${shopId}`;

//     // Create the folder if it doesn't exist
//     if (!fs.existsSync(destinationPath)) {
//       fs.mkdirSync(destinationPath);
//     }
//     cb(null, destinationPath);
//   },
// // productImages file is created
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); //stored in binary format
//   },
// });
const s3 = new S3Client({
  region: "ap-south-1" // this is the region that you select in AWS account
})

const s3Storage = multerS3({
s3: s3, // s3 instance
bucket: "shopnationbucket", // change it as per your project requirement
acl: "public-read", // storage access type
metadata: (req, file, cb) => {
    cb(null, {fieldname: file.fieldname})
},
key: (req, file, cb) => {
    const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
    cb(null, fileName);
}
});

const upload = multer({
  storage: s3Storage,
}).fields([
  {name: 'mainImage', maxCount: 1 },
  {name: 'productImages', maxCount:8},
]);

router.post('/storeProduct',(req,res)=>{
  //store data in the database
  upload(req,res,(err)=>{
    if(err){
      res.send(err);
    }
    else{
      const mainImage = req.files.mainImage[0]
        const mainImageData = {
          url: mainImage.location,
          contentType: mainImage.mimetype,
        };

        const productImages = req.files.productImages.map((file) => ({
          url: file.location,
          contentType: file.mimetype,
        }));


      const newProduct =  new productModel({
        shopId : req.body.shopId,
        shopName: req.body.shopName,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        expectedDelivery: req.body.expectedDelivery,
        brand: req.body.brand,
        gender: req.body.gender,
        mainImage: mainImageData,
        productImages: productImages,
        productPrice:req.body.productPrice,
        variantType:req.body.variantType,
        variantName: req.body.variantName,
        size:req.body.size
      });
      try {
          newProduct.save().then(async(savedProduct)=>{
          console.log("saved");
          const inventoryItem = new inventoryModel({
            productId: savedProduct._id,
            shopId: savedProduct.shopId,
            quantity: req.body.productAmount, // Set the initial quantity to 0 or an appropriate value
          });
          await inventoryItem.save();
          res.status(201).send({productId:savedProduct._id,msg:"successfully saved"});
        });
      } catch (error) {
        res.status(500).send({error:error.message});
      }
      
    }
  })
  
})

router.post('/storeProductVariant',(req,res)=>{
  //store data in the database
  upload(req,res,(err)=>{
    if(err){
      res.send(err);
    }
    else{
      const mainImage = req.files.mainImage[0];
        const mainImageData = {
          url: mainImage.location,
          contentType: mainImage.mimetype,
        };

        const productImages = req.files.productImages.map((file) => ({
          url: file.location,
          contentType: file.mimetype,
        }));


      const newProduct =  new variantModel({
        shopId : req.body.shopId,
        shopName: req.body.shopName,
        variantName: req.body.variantName,
        variantType: req.body.variantType,
        productId: req.body.productId,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        expectedDelivery: req.body.expectedDelivery,
        brand: req.body.brand,
        gender: req.body.gender,
        productPrice:req.body.productPrice,
        mainImage: mainImageData,
        productImages: productImages,
        size: req.body.size
      });
      try {
        newProduct.save().then(async(savedProduct)=>{
          console.log("saved");
          const newVariant = {
            variantId: savedProduct._id,
            variantType: req.body.variantType,
            variantName: req.body.variantName,
            variantMainImage: savedProduct.mainImage,
            size : req.body.size
          };
          console.log(newVariant);
          await productModel.findByIdAndUpdate(
            savedProduct.productId, 
            { $push: { variant: newVariant } }
          );
          console.log("variant array updated");
          const inventoryItem = new inventoryModel({
            productId: savedProduct._id,
            shopId: savedProduct.shopId,
            quantity: req.body.productAmount, // Set the initial quantity to 0 or an appropriate value
          });
          await inventoryItem.save();
          res.status(201).send({msg:"successfully saved"});
        });
      } catch (error) {
        res.status(500).send({error:error.message});
      }
      
    }
  })
})
router.get("/getProduct/:shopId", async (req, res) => {
  // get data from shopId
  try {
    const shopId = req.params.shopId;
    const result = await productModel.find({ shopId: req.params.shopId });
    var productArray = [];
    result.forEach((element) => {
      // const productImages = element.productImages.map((image) => ({
      //   imagePath: path.join('..', 'assets', `${shopId}`, image.data.toString())
      // }));
      const items = {
        shopId : element.shopId,
        shopName : element.shopName,
        productId: element._id,
        productName: element.productName,
        productDescription: element.productDescription,
        productPrice: element.productPrice,
        productDescription: element.productDescription,
        expectedDelivery: element.expectedDelivery,
        brand: element.brand,
        size : element.size,
        gender: element.gender,
        productImages: element.productImages,
        isAvailable: element.isAvailable,
        productType:element.productType,
        mainImagePath : element.mainImage
      };
      productArray.push(items);
    });

    res.status(201).send(productArray);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/getProductInfo/:productId",async(req,res) =>{
  try{
    const productId = req.params.productId;
    let result;
    result = await productModel.findOne({_id:productId});
    if(!result){
      result  = await variantModel.findOne({_id:productId});
    }
    console.log(result);
    // const productImages = result.productImages.map((image) => ({
    //   imagePath: path.join('..', 'assets', `${result.shopId}`, image.data.toString())
    // }));
    const item = {
      shopId : result.shopId,
      shopName : result.shopName,
      productId: result._id,
      productName: result.productName,
      productDescription: result.productDescription,
      productPrice: result.productPrice,
      productDescription: result.productDescription,
      expectedDelivery: result.expectedDelivery,
      brand: result.brand,
      variantName: result.variantName,
      variantType : result.variantType,
      size : result.size,
      gender: result.gender,
      productImages: result.productImages,
      isAvailable: result.isAvailable,
      mainImagePath : result.mainImage
  }
  res.status(200).json({item})
}
  catch(err){
    res.status(500).json({err:err.message})
  }
})

router.get("/getVariantInfo/:variantId", async (req, res) => {
  try {
      const variantId = req.params.variantId;
      let result;
     
      result = await variantModel.findOne({ _id:variantId});

      if (result) {
          // const productImages = result.productImages.map((image) => ({
          //     imagePath: path.join('..', 'assets', result.shopId, image.data.toString())
          // }));
          const item = {
              shopId: result.shopId,
              shopName: result.shopName,
              productId: result._id,
              productName: result.productName,
              variantType: result.variantType,
              variantName: result.variantName,
              productDescription: result.productDescription,
              productPrice: result.productPrice,
              expectedDelivery: result.expectedDelivery,
              brand: result.brand,
              size: result.size,
              gender: result.gender,
              isAvailable: result.isAvailable,
              productImages: result.productImages,
              mainImagePath: result.mainImage
          };
          res.status(200).json({ item });
      } else {
          res.status(404).json({ message: 'No matching product found' });
      }
  } catch (err) {
      res.status(500).json({ err: err.message });
  }
});

router.get("/getProductVariantInfo/:productId", async (req, res) => {
  try {
      const productId = req.params.productId;
      const variantName = req.query.variantName;
      let result;
      result = await variantModel.findOne({ productId: productId, variantName: variantName });

      if (result) {
          // const productImages = result.productImages.map((image) => ({
          //     imagePath: path.join('..', 'assets', result.shopId, image.data.toString())
          // }));
          const item = {
              shopId: result.shopId,
              shopName: result.shopName,
              productId: result._id,
              productName: result.productName,
              variantType: result.variantType,
              variantName: result.variantName,
              productDescription: result.productDescription,
              productPrice: result.productPrice,
              expectedDelivery: result.expectedDelivery,
              brand: result.brand,
              size: result.size,
              gender: result.gender,
              isAvailable: result.isAvailable,
              productImages: result.productImages,
              productType: result.productType,
              mainImagePath: result.mainImage
          };
          res.status(200).json({ item });
      } else {
          res.status(404).json({ message: 'No matching product found' });
      }
  } catch (err) {
      res.status(500).json({ err: err.message });
      console.log(err);
  }
});

router.get("/showProduct/:productId",async(req,res)=>{
  try{
    const productId = req.params.productId;
    const productInfo = await productModel.findOne({_id:productId});
    console.log(productInfo);
    // const productImages = productInfo.productImages.map((image) => ({
    //   imagePath: path.join('..', 'assets', `${productInfo.shopId}`, image.data.toString())
    // }));
    const item = {
      shopId : productInfo.shopId,
      shopName : productInfo.shopName,
      productId: productInfo._id,
      productName: productInfo.productName,
      variantType : productInfo.variantType,
      variantName : productInfo.variantName,
      productDescription: productInfo.productDescription,
      productPrice: productInfo.productPrice,
      productDescription: productInfo.productDescription,
      expectedDelivery: productInfo.expectedDelivery,
      brand: productInfo.brand,
      size: productInfo.size,
      gender: productInfo.gender,
      productImages: productInfo.productImages,
      isAvailable: productInfo.isAvailable,
      mainImagePath : productInfo.mainImage
  }
    const variants = productInfo.variant;
    const variantMap = new Map();
    variants.forEach((element)=>{
      if(!variantMap.has(element.variantType)){
        variantMap.set(element.variantType,[]);
      }
      const variantArray = variantMap.get(element.variantType);
      const index = variantArray.findIndex((item) => item.variantName === element.variantName);
  
      if (index === -1) {
        variantArray.push({
          variantName: element.variantName,
          variantArray: [element],
        });
      } else {
        variantArray[index].variantArray.push(element);
      }
    })
    
  const variantObject = Object.fromEntries(variantMap);
    
    
    res.status(200).json({item,variantObject});
  }
  catch(err){
    console.log(err);
  }
})

router.get("/", (req, res) => {
  res.send("API is working");
});
module.exports = router;
// const variants = await variantModel.find({productId:productId});
//     const variantMap = new Map();
// variants.forEach((element) => {
//   const variant = {
//     shopId : element.shopId,
//     shopName : element.shopName,
//     productId: element._id,
//     productName: element.productName,
//     variantType:element.variantType,
//     variantName:element.variantName,
//     productDescription: element.productDescription,
//     productPrice: element.productPrice,
//     expectedDelivery: element.expectedDelivery,
//     brand: element.brand,
//     color: element.color,
//     size: element.size,
//     gender: element.gender,
//     isAvailable: element.isAvailable,
//     mainImagePath : path.join('..','assets',`${element.shopId}`,element.variantImage.data.toString()),
//   };
//   if(!variantMap.has(element.variantType)){
//     variantMap.set(element.variantType,[]);
//   }
//   const variantArray = variantMap.get(element.variantType);
//   const index = variantArray.findIndex((item) => item.variantName === element.variantName);

//   if (index === -1) {
//     variantArray.push({
//       variantName: element.variantName,
//       variantArray: [variant],
//     });
//   } else {
//     variantArray[index].variantArray.push(variant);
//   }
// });
// const variantObject = Object.fromEntries(variantMap);