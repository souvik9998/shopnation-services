require('dotenv').config()
var express = require('express');
const path = require("path");
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
    

    //connect to client api
    const client = new Client({
        cloud: { id: 'cd5f26e82b874ce3a3f5a5c2f3657ba2:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDkzMTM1MzMzMGUxYzRlMmJiNmQ0Mzg0YjU2MjBjM2JiJGViMDMzY2JjMjczMDQ5NmU4ZWNlN2U2NmZlNWNhYzRl' },
        auth: { apiKey:  'RzBEdm5Jd0JJVEV0OGV0T1BzSlg6MzgtT2V6S3NRdUdabTh1dE1IN1BzZw=='}
      })
      async function run (req,res,next) {
        console.log(req.body);
        try{
          await client.index({
            index: 'shop-details',
            document: {
              shopId : req.body.shopId,
              storeName : req.body.shopName,
              type : req.body.shopType,
              shopImagePath: req.body.shopImagePath
            }
          })
          await client.indices.refresh({ index: 'shop-details' })
        res.status(201).json({msg:'registered'})
        }catch (error) {
        res.send(error);
        next();
    }
  }
  //     async function run () {
  //             await client.index({
  //               index: 'shop-details',
  //               document: {
  //                 shopId : '655ce265d4d02eda006568b7',
  //                 storeName : 'food shop',
  //                 type : 'food',
  //                 shopImagePath: 'https://shopnationbucket.s3.ap-south-1.amazonaws.com/1700586083720_shopImage_360_F_286178925_8zk89O9uC5JJVPvqhvBMUpaRxp8AFXzD.jpg'
  //               }
  //             })
  //             await client.index({
  //               index: 'shop-details',
  //               document: {
  //                 shopId : '655ce191d4d02eda006568b1',
  //                 storeName : 'mobile shop',
  //                 type : 'electronics',
  //                 shopImagePath: 'https://shopnationbucket.s3.ap-south-1.amazonaws.com/1700585872405_shopImage_futuristic-gadgets-showcase-lineup-sleek-modern-technological-devices_977107-682.avif'
  //               }
  //             })
  //             await client.index({
  //               index: 'shop-details',
  //               document: {
  //                 shopId : '655cdb5ed4d02eda006568af',
  //                 storeName : 'great shop',
  //                 type : 'shoes',
  //                 shopImagePath: 'https://shopnationbucket.s3.ap-south-1.amazonaws.com/1700584284158_shopImage_premium_photo-1682435561654-20d84cef00eb.avif'
  //               }
  //             })
  //            await client.index({
  //                 index: 'shop-details',
  //                 document: {
  //                   shopId : '655c7dccabd801febc9e30c4',
  //                   storeName : 'grocery shop',
  //                   type : 'grocery',
  //                   shopImagePath: 'https://shopnationbucket.s3.ap-south-1.amazonaws.com/1700560332218_shopImage_download%20%281%29.jfif'
  //                 }
  //               })
              
              
            

  //   await client.indices.refresh({ index: 'shop-details' })

  //   // Let's search!
  //   const result= await client.search({
  //     index: 'shop-details',
  //     query: {
  //       match_phrase_prefix: {
  //           storeName: 'Swarup Biriyani'
  //       }
  //     }
  //   })
  
  //   console.log(result.hits.hits)
  // }
  
  // run().catch(console.log)
async function run1 (req,res,next) {

    //Let's search!
    try {
         // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
        await client.indices.refresh({ index: 'shop-details' })
        const searchQuery =  req.body.query;
        console.log(searchQuery)
        const result= await client.search({
          index: 'shop-details',
          body: {
            query: {
                bool: {
                  should: [
                    { "match_phrase_prefix": { "storeName": { "query": searchQuery+"*"} } },
                    { "match_phrase_prefix": { "type": {"query" : searchQuery+"*" } } },
                    { "fuzzy": { "storeName": { "value": searchQuery, "fuzziness": "auto" } } },
                    // { "match_phrase": { "type": {"query" : searchQuery } } }
                    { "match": { "type": { "query": searchQuery, "operator": "or" } } },
                    { "match": { "storeName": { "query": searchQuery, "operator": "or" } } },
                  ],
                  minimum_should_match: 1
                }
              }
            }
        })
        const hits = result.hits.hits;
        const storeArray = []
        hits.map(store => {
          const item = {
            shopId: store._source.shopId,
            shopImagePath: store._source.shopImagePath,
            storeName: store._source.storeName,
            type: store._source.type
          }
          storeArray.push(item);
        }
    );
      console.log(storeArray);  
      res.send(storeArray);
        next();
      
    } catch (error) {
        res.send(error);    
        next();
    }

 }
 async function run2 (req,res,next) {

  console.log('KJRiPJjvSs2OyxjK2LsBRw');
    //Let's search!
    try {
         // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
        await client.indices.refresh({ index: 'shop-details' })
        const result = await client.search({
          index: 'shop-details',
          body: {
              size : 20,
              query: {
                  match_all: {}
              }
          }
      });
      const hits = result.hits.hits;
      const storeArray = []
      hits.map(store => {
        const item = {
          shopId: store._source.shopId,
          shopImagePath: store._source.shopImagePath,
          storeName: store._source.storeName,
          type: store._source.type
        }
        storeArray.push(item);
      }
    );
      
        res.send(storeArray);
        next();
      
    } catch (error) {
        res.send(error);    
        next();
    }

 }


async function storeProducts (req,res,next) {
  console.log(req.body);
  try{
    await client.index({
      index: 'product-details',
      document: {
        productId : req.body.id,
        productName : req.body.productName,
        brand: req.body.brand,
        color: req.body.color,
      }
    })
    await client.indices.refresh({ index: 'shop-details' })
  res.status(201).json({msg:'registered'})
  }catch (error) {
  res.send(error);
  next();
}
}
// async function storeProducts () {
//       // 
//       await client.index({
//           index: 'product-details',
//           document: {
//             productId : '64d9cbbbda383a075bc36c58',
//             productName : "nike airmax",
//             brand : 'Nike',
//             color : 'red'
//           }
//         })
  
  
//       await client.index({
//         index: 'product-details',
//         document: {
//           productId : '64e89a982f2a038066801069',
//           productName : "nike bigtime ",
//           brand : 'nike',
//           color: 'red'
//         }
//       })

  


//   await client.indices.refresh({ index: 'product-details' })

//   // Let's search!
//   const result= await client.search({
//     index: 'product-details',
//     query: {
//       match_phrase_prefix: {
//           productName: 'nike airmax'
//       }
//     }
//   })

//   console.log(result.hits.hits)
// }

// storeProducts().catch(console.log)

 async function productSearch(req,res,next) {

  console.log('KJRiPJjvSs2OyxjK2LsBRw');
    //Let's search!
    try {
         // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
        await client.indices.refresh({ index: 'product-details' })
        const searchQuery =  req.body.query;
        console.log(searchQuery)
        const result= await client.search({
          index: 'product-details',
          body: {
            query: {
                bool: {
                  should: [
                    { "match_phrase_prefix": { "productName": { "query": searchQuery+"*"} } },
                    { "match_phrase_prefix": { "color": {"query" : searchQuery+"*" } } },
                    { "match_phrase_prefix": { "brand": {"query" : searchQuery+"*" } } },
                    { "fuzzy": { "productName": { "value": searchQuery, "fuzziness": "auto" } } },
                    { "match": { "color": { "query": searchQuery, "operator": "or" } } },
                    { "match": { "brand": { "query": searchQuery, "operator": "or" } } },
                    { "match": { "productName": { "query": searchQuery, "operator": "or" } } },
                  ],
                  minimum_should_match: 1
                }
              }
            }
        })
        console.log(result.hits.hits);
        res.send(result.hits.hits);
        
        next();
      
    } catch (error) {
        res.send(error);    
        next();
    }

 }



router.post('/searchResult',run1,(req, res) =>{
  console.log("response sent")
  
});
router.get('/getAll',run2,(req,res)=>{
    console.log("hello");
})
router.post('/searchProduct',productSearch,(req, res) =>{
  console.log("response sent")
  
});
router.post('/registerShop',run);
module.exports = router;
