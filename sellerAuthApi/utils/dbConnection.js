const mongoose =  require('mongoose');
const connect = mongoose.connect(process.env.MONGO_URL,{useNewUrlParser :  true},mongoose.set('strictQuery',true)).then(()=>console.log("connected mongo")).catch(err=>console.log(err))
module.exports = connect;