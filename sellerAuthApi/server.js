// var express = require("express");
// var logger = require("morgan");
// var path = require("path");
// require("dotenv").config();
// const mongoose = require("mongoose");
// var cookieParser = require("cookie-parser");
// var AppError = require("./utils/appError");
// var userRouter = require("./routes/userRouters");
// var inventoryRouter = require("./routes/inventoryRouters");
// var onboardRouter = require("./routes/onBoard");
// var orderRouter = require("./routes/orderRouters")
// var cors = require('cors');
// var app = express();

// //middleware
// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors({ origin: '*' }));

// app.use("/sellerapi/auth", userRouter);
// app.use("/sellerapi/inventory", inventoryRouter);
// app.use("/sellerapi/onboard", onboardRouter);
// app.use("/sellerapi/order",orderRouter);
//Error handling
// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find the route ${req.url} on this server`, 404));
// });

// // error handler //When an error occurs in any middleware or route handler, the next function can be called with an error object to pass control to this error-handling middleware
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     messageFromKoko: err.koko,
//   });
// });
// mongoose
//   .connect(
//     process.env.MONGO_URL,
//     { useNewUrlParser: true },
//     mongoose.set("strictQuery", true)
//   )
//   .then(() => console.log("connected mongo"))
//   .catch((err) => console.log(err));
// module.exports = app;
const express = require("express");
const logger = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const AppError = require("./utils/appError");

dotenv.config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*' }));

// Set up your routes
const userRouter = require("./routes/userRouters");
const inventoryRouter = require("./routes/inventoryRouters");
const onboardRouter = require("./routes/onBoard");
const orderRouter = require("./routes/orderRouters");

app.use("/sellerapi/auth", userRouter);
app.use("/sellerapi/inventory", inventoryRouter);
app.use("/sellerapi/onboard", onboardRouter);
app.use("/sellerapi/order", orderRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the route ${req.url} on this server`, 404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    messageFromKoko: err.koko,
  });
});

mongoose
  .connect("mongodb+srv://ecommerce:ecommerce9998@cluster0.hbwdzdi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  ,{ useNewUrlParser: true },mongoose.set('strictQuery',true))
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port = 3002;
app.set('port', port);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});