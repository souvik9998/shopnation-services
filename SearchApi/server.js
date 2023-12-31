// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const cors = require('cors');

// var elasticRouter =  require('./routes/elasticAPI');

// var app = express();

// app.use(cors({ origin: '*' }));
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// app.use('/searchapi',elasticRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');

const elasticRouter = require('./routes/elasticAPI');

const app = express();


app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 4000;
app.set('port', port);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/searchapi', elasticRouter);
