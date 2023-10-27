var express = require("express");
var logger = require("morgan");
var path = require("path");
var cookieParser = require("cookie-parser");
var AppError = require("./utils/appError");
var userRouter = require("./routes/userRouters");
var inventoryRouter = require("./routes/inventoryRouters");
var onboardRouter = require("./routes/onBoard");
var orderRouter = require("./routes/orderRouters")
var cors = require('cors');
var app = express();

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: '*' }));

app.use("/auth", userRouter);
app.use("/inventory", inventoryRouter);
app.use("/onboard", onboardRouter);
app.use("/order",orderRouter);
//Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the route ${req.url} on this server`, 404));
});

// error handler //When an error occurs in any middleware or route handler, the next function can be called with an error object to pass control to this error-handling middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    messageFromKoko: err.koko,
  });
});

module.exports = app;
